module.exports = function (config) {
  config.set({
    frameworks: ['browserify', 'detectBrowsers', 'mocha'],
    files: [
      'node_modules/babel-core/browser-polyfill.js',
      'test/*.js',
      'test/sql/*.js',
      'test/sync/*.js'
    ],
    preprocessors: {
      'test/*.js': ['browserify'],
      'test/sql/*.js': ['browserify'],
      'test/sync/*.js': ['browserify']
    },
    singleRun: true,
    plugins: [
      'karma-browserify',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-detect-browsers',
      'karma-mocha'
    ],
    browserify: {
      debug: true,
      transform: [
        ['babelify']
      ]
    },
    detectBrowsers: {
      enabled: true,
      usePhantomJS: false,
      postDetection: function (availableBrowser) {
        if (process.env.TRAVIS) {
          return ['Firefox']
        }

        var browsers = ['Chrome', 'Firefox']
        return browsers.filter(function (browser) {
          return availableBrowser.indexOf(browser) !== -1
        })
      }
    }
  })
}
