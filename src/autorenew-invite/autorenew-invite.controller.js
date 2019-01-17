import _ from 'lodash';
import moment from 'moment';

export default class {
  /* @ngInject */
  constructor(
    $q,
    OvhApiMe,
    ovhPaymentMethod,
    ovhUserPref,
    WUC_SUBSIDIARIES_WITH_OPTIONAL_AUTORENEW,
  ) {
    this.$q = $q;
    this.OvhApiMe = OvhApiMe;
    this.ovhPaymentMethod = ovhPaymentMethod;
    this.ovhUserPref = ovhUserPref;

    this.WUC_SUBSIDIARIES_WITH_OPTIONAL_AUTORENEW = WUC_SUBSIDIARIES_WITH_OPTIONAL_AUTORENEW;
  }

  $onInit() {
    if (_.isEmpty(this.productType)) {
      throw new Error('Autorenew invite: Product type is not valid');
    }

    this.loading = true;
    this.preferenceKey = `${this.productType.toUpperCase()}_AUTORENEW_STOP_BOTHER`;

    return this.isAutorenewAllowed()
      .then(() => (this.isAutorenewAllowed ? this.getDisplayConditions() : this.$q.when()))
      .finally(() => {
        this.loading = false;
      });
  }

  getDisplayConditions() {
    return this.getProductAutorenewPreferences()
      .then(() => this.hasPaymentMean());
  }

  hasPaymentMean() {
    return this.ovhPaymentMethod.getAllPaymentMethods()
      .then((paymentMethods) => {
        this.hasPaymentMean = _.isArray(paymentMethods) && !_.isEmpty(paymentMethods);
        return this.hasPaymentMean;
      });
  }

  isAutorenewAllowed() {
    return this.OvhApiMe.v6().get().$promise
      .then(({ ovhSubsidiary }) => {
        this.isAutorenewAllowed = _.includes(
          this.WUC_SUBSIDIARIES_WITH_OPTIONAL_AUTORENEW,
          ovhSubsidiary,
        );
      })
      .catch(() => {
        this.isAutorenewAllowed = false;
      });
  }

  getProductAutorenewPreferences() {
    return this.ovhUserPref.getValue(this.preferenceKey)
      .then((productAutorenewPreferences) => {
        this.productAutorenewPreferences = productAutorenewPreferences;
      })
      .catch(() => {
        this.productAutorenewPreferences = [];
      });
  }

  shouldAskAboutAutorenewSubscription() {
    return !_.includes(this.productAutorenewPreferences, this.serviceInfos.domain);
  }

  isInAutorenew() {
    return _.get(this.serviceInfos, 'renew.automatic') || _.get(this.serviceInfos, 'renew.forced');
  }

  isExpired() {
    return moment().isAfter(moment(this.serviceInfos.expiration)) || this.serviceInfos.status === 'expired';
  }

  stopBotheringWithAutorenew() {
    return this.ovhUserPref
      .assign(
        this.preferenceKey,
        this.productAutorenewPreferences.concat(this.serviceInfos.domain),
      );
  }
}
