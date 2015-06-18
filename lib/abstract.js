'use strict'

module.exports = require('./wrapper')(function (Promise) {
  var ReadyMixin = require('ready-mixin')(Promise)
  var makeConcurrent = require('make-concurrent')(Promise)

  var errors = require('./errors')

  /**
   * @class AbstractStorage
   * @mixes ReadyMixin
   * @param {Object} [opts]
   */
  function AbstractStorage () {}

  ReadyMixin(AbstractStorage.prototype)

  /**
   * @return {boolean}
   */
  AbstractStorage.isAvailable = function () { return false }

  /**
   * @return {Promise}
   */
  AbstractStorage.prototype.open = function () {
    return Promise.reject(
      new errors.NotImplemented(this.constructor.name + '.open'))
  }

  /**
   */
  AbstractStorage.prototype._isOpenedCheckPromise = function () {
    if (!this.isReady()) {
      return Promise.reject(new errors.UnopenedYet())
    }

    return Promise.resolve()
  }

  /**
   * @callback AbstractStorage~withLockCallback
   * @return {Promise}
   */

  /**
   * @param {AbstractStorage~withLockCallback} fn
   * @return {Promise}
   */
  AbstractStorage.prototype.withLock = makeConcurrent(function (fn) {
    return this._isOpenedCheckPromise().then(fn)
  }, {concurrency: 1})

  /**
   * @return {Promise}
   */
  AbstractStorage.prototype.clear = function () {
    return Promise.reject(
      new errors.NotImplemented(this.constructor.name + '.clear'))
  }

  return AbstractStorage
})
