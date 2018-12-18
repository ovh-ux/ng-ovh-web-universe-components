import angular from 'angular';
import translate from 'angular-translate';
import translateAsyncLoader from '@ovh-ux/translate-async-loader';

import '@ovh-ux/ovh-utils-angular';
import 'angular-ui-bootstrap';
import 'df-tab-menu';

import wucOvhTabsDirective from './tabs.directive';

const moduleName = 'wucTabs';

angular
  .module(moduleName, [
    'digitalfondue.dftabmenu',
    'ovh-utils-angular',
    translate,
    translateAsyncLoader,
    'ui.bootstrap',
  ])
  .directive('wucOvhTabs', wucOvhTabsDirective)
  .run(/* @ngTranslationsInject ./translations */);

export default moduleName;
