import _ from 'lodash';
import angular from 'angular';
import moment from 'moment';

import {
  DEFAULT_TARGET,
  RENEW_URL,
  TERMINATION_URL,
} from './service-expiration-date.component.constant';

export default class {
  /* @ngInject */
  constructor($scope, $rootScope, OvhApiMe) {
    $scope.tr = $rootScope.tr;
    this.OvhApiMe = OvhApiMe;
  }

  $onInit() {
    if (
      !angular.isObject(this.serviceInfos)
      || !_.isString(this.serviceName)
    ) {
      throw new Error('serviceExpirationDate: Missing parameter(s)');
    }

    this.loading = true;
    this.subsidiary = null;

    return this.OvhApiMe.v6().get().$promise
      .then(({ ovhSubsidiary }) => {
        this.subsidiary = ovhSubsidiary;
        this.orderUrl = `${_.get(RENEW_URL, ovhSubsidiary, RENEW_URL[DEFAULT_TARGET])}${this.serviceInfos.domain}`;
      })
      .finally(() => {
        this.loading = false;
      });
  }

  getCancelTerminationUrl() {
    const url = `${_.get(TERMINATION_URL, this.subsidiary, TERMINATION_URL[DEFAULT_TARGET])}?searchText=${this.serviceName}`;
    if (_.isString(this.serviceType)) {
      return `${url}&selectedType=${this.serviceType}`;
    }
    return url;
  }

  getOrderUrl() {
    return this.orderUrl;
  }

  getExpirationClass() {
    if (this.isExpired()) {
      return 'expired';
    }

    if (this.isAutoRenew()) {
      return '';
    }

    const diff = moment(this.serviceInfos.expiration).diff(moment(), 'days');

    if (diff >= 7 && diff <= 15) {
      return 'expired15';
    }
    if (diff >= 1 && diff < 7) {
      return 'expired7';
    }
    if (diff <= 0) {
      return 'expired';
    }
    return '';
  }

  isInAutoRenew() {
    return _.get(this.serviceInfos, 'renew.automatic') || _.get(this.serviceInfos, 'renew.forced');
  }

  shouldDeleteAtExpiration() {
    return _.get(this.serviceInfos, 'renew.deleteAtExpiration');
  }

  isExpired() {
    const diff = moment(this.serviceInfos.expiration).diff(moment(), 'days');
    return (
      this.serviceInfos.expiration
      && (diff <= 0 || this.serviceInfos.status === 'expired')
    );
  }
}
