import angular from 'angular';
import translate from 'angular-translate';
import translateAsyncLoader from '@ovh-ux/translate-async-loader';

import wucCronValidator from '../cron-validator';

import wucCronEditorCtrl from './cronEditor.controller';
import wucCronSimpleSummaryCtrl from './cronSimpleSummary.controller';
import wucCronEditorDirective from './cronEditor.directive';
import wucCronExpertHelpDirective from './cronExpertHelp.directive';
import wucCronSimpleSummaryDirective from './cronSimpleSummary.directive';

import templateSimple from './cronSimple.html';
import templateExpert from './cronExpert.html';

const moduleName = 'wucCron';

angular
  .module(moduleName, [
    translate,
    translateAsyncLoader,
    wucCronValidator,
  ])
  .controller('wucCronEditorCtrl', wucCronEditorCtrl)
  .controller('wucCronSimpleSummaryCtrl', wucCronSimpleSummaryCtrl)
  .directive('wucCronEditor', wucCronEditorDirective)
  .directive('wucCronExpertHelp', wucCronExpertHelpDirective)
  .directive('wucCronSimpleSummary', wucCronSimpleSummaryDirective)
  .run(/* @ngTranslationsInject ./translations */)
  .run(/* @ngInject */($templateCache) => {
    $templateCache.put('wucCron_cronSimple.html', templateSimple);
    $templateCache.put('wucCron_cronExpert.html', templateExpert);
  });

export default moduleName;
