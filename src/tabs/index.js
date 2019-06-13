import angular from 'angular';
import translate from 'angular-translate';

import '@ovh-ux/ng-translate-async-loader';
import '@ovh-ux/ovh-utils-angular';
import 'angular-ui-bootstrap';
import 'df-tab-menu/build/df-tab-menu.min';

import wucOvhTabsDirective from './tabs.directive';

const moduleName = 'wucTabs';

angular
  .module(moduleName, [
    'digitalfondue.dftabmenu',
    'ngTranslateAsyncLoader',
    'ovh-utils-angular',
    translate,
    'ui.bootstrap',
  ])
  .directive('wucOvhTabs', wucOvhTabsDirective)
  .run(/* @ngTranslationsInject ./translations */);

export default moduleName;
