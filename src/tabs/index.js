import angular from 'angular';
import translate from 'angular-translate';
import translateAsyncLoader from '@ovh-ux/translate-async-loader';

import '@ovh-ux/ovh-utils-angular';
import 'angular-ui-bootstrap';

/* eslint-disable import/no-webpack-loader-syntax, import/extensions */
import 'script-loader!df-tab-menu/build/df-tab-menu.min.js';
/* eslint-enable import/no-webpack-loader-syntax, import/extensions */

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
