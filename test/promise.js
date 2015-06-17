module.exports = (function () {
  if (global.Promise !== undefined) {
    return global.Promise
  }

  return require('bluebird')
})()
