const csshook = require('css-modules-require-hook');
const scssParser = require('postcss-scss').parse;

exports.plugin = {
  name: 'cssHookPlugin',
  register: async function () {
    csshook({
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    });
    csshook({
      extensions: '.scss',
      processorOpts: {parser: scssParser}
    });

  }
};