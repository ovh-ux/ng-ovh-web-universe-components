import angular from 'angular';

import '@ovh-ux/ng-ovh-http';
import 'ovh-angular-swimming-poll';

import WucEmails from './email-domain.service';

const moduleName = 'wucEmailDomain';

angular
  .module(moduleName, [
    'ngOvhHttp',
    'ovh-angular-swimming-poll',
  ])
  .service('WucEmails', WucEmails);

export default moduleName;
