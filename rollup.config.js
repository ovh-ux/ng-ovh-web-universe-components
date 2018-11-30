import configGenerator from '@ovh-ux/component-rollup-config';

const config = configGenerator({
  input: './src/index.js',
});

export default [
  config.cjs(),
  config.umd({
    globals: {
      '@uirouter/angularjs': 'uiRouter',
      angular: 'angular',
      'angular-translate': 'pascalprecht.translate',
      'ipaddr.js': 'ipaddr',
      jquery: '$',
      lodash: '_',
      moment: 'moment',
      punycode: 'punycode',
      URIjs: 'URI',
    },
  }),
];
