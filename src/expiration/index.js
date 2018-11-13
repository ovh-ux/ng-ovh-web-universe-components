import angular from 'angular';
import translate from 'angular-translate';
import translateAsyncLoader from '@ovh-ux/translate-async-loader';

import WucServiceExpirationDateComponentCtrl from './service-expiration-date.component.controller';
import wucServiceExpirationDate from './service-expiration-date.component';

import './service-expiration-date.component.less';

const moduleName = 'wucExpiration';

angular
  .module(moduleName, [
    translate,
    translateAsyncLoader,
  ])
  .component('wucServiceExpirationDate', wucServiceExpirationDate)
  .controller('WucServiceExpirationDateComponentCtrl', WucServiceExpirationDateComponentCtrl)
  .run(/* @ngTranslationsInject ./translations */);

export default moduleName;
