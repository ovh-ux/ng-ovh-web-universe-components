import get from 'lodash/get';
import isString from 'lodash/isString';
import angular from 'angular';
import moment from 'moment';
import {
  DEFAULT_TARGET,
  RENEW_URL,
} from './service-status-action.constant';

export default class {
  /* @ngInject */
  constructor(constants, OvhApiMe) {
    this.constants = constants;
    this.OvhApiMe = OvhApiMe;
  }

  $onInit() {
    if (
      !angular.isObject(this.serviceInfos)
      || !isString(this.serviceName)
    ) {
      throw new Error('serviceExpirationDate: Missing parameter(s)');
    }

    this.loading = true;

    return this.getOrderUrl()
      .finally(() => {
        this.loading = false;
      });
  }

  getRenewUrl() {
    return this.constants.target === 'CA' ? this.getOrderUrl() : this.getAutoRenewUrl();
  }

  getOrderUrl() {
    return this.OvhApiMe.v6().get().$promise
      .then(({ ovhSubsidiary }) => {
        this.orderUrl = `${get(RENEW_URL, ovhSubsidiary, RENEW_URL[DEFAULT_TARGET])}${this.serviceInfos.domain}`;
      });
  }

  getAutoRenewUrl() {
    const url = `#/billing/autoRenew?searchText=${this.serviceName}`;
    if (isString(this.serviceType)) {
      return `${url}&selectedType=${this.serviceType}`;
    }
    return url;
  }

  getDate() {
    if (this.isInAutoRenew()) {
      return moment(this.serviceInfos.expiration).add(1, 'days').format();
    }
    return this.serviceInfos.expiration;
  }

  isInAutoRenew() {
    return get(this.serviceInfos, 'renew.automatic') || get(this.serviceInfos, 'renew.forced');
  }

  shouldDeleteAtExpiration() {
    return get(this.serviceInfos, 'renew.deleteAtExpiration');
  }

  isExpired() {
    const diff = moment(this.serviceInfos.expiration).diff(moment(), 'days');
    return this.serviceInfos.expiration && diff <= 0;
  }
}
