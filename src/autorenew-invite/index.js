import angular from 'angular';
import '@ovh-ux/ng-ovh-payment-method';
import 'ovh-angular-user-pref';
import 'ovh-api-services';
import 'ovh-ui-angular';
import 'angular-translate';
import '@ovh-ux/translate-async-loader';

import { SUBSIDIARIES_WITH_OPTIONAL_AUTORENEW } from './autorenew-invite.constant';
import WucAutorenewInvite from './autorenew-invite.component';

const moduleName = 'wucAutorenewInvite';

angular
  .module(moduleName, [
    'ngOvhPaymentMethod',
    'ovh-angular-user-pref',
    'ovh-api-services',
    'oui',
    'pascalprecht.translate',
    'translate-async-loader',
  ])
  .constant('WUC_SUBSIDIARIES_WITH_OPTIONAL_AUTORENEW', SUBSIDIARIES_WITH_OPTIONAL_AUTORENEW)
  .component('wucAutorenewInvite', WucAutorenewInvite)
  .run(/* @ngTranslationsInject ./translations */);

export default moduleName;
