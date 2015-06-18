'use strict'

module.exports = require('../wrapper')(function (Promise) {
  var assign = require('lodash.assign')
  var inherits = require('inherits')

  var AbstractStorage = require('../abstract')(Promise)
  var errors = require('../errors')

  /**
   * @class AbstractSyncStorage
   * @extends AbstractStorage
   * @param {Object} [opts]
   */
  function AbstractSyncStorage () {
    AbstractStorage.call(this)
  }

  inherits(AbstractSyncStorage, AbstractStorage)
  assign(AbstractSyncStorage, AbstractStorage)

  /**
   * @param {string} key
   * @param {string} value
   * @return {Promise}
   */
  AbstractSyncStorage.prototype.set = function () {
    return Promise.reject(
      new errors.NotImplemented(this.constructor.name + '.set'))
  }

  /**
   * @param {string} key
   * @return {Promise.<?string>}
   */
  AbstractSyncStorage.prototype.get = function () {
    return Promise.reject(
      new errors.NotImplemented(this.constructor.name + '.get'))
  }

  /**
   * @param {string} key
   * @return {Promise}
   */
  AbstractSyncStorage.prototype.remove = function () {
    return Promise.reject(
      new errors.NotImplemented(this.constructor.name + '.remove'))
  }

  /**
   * @callback AbstractSyncStorage~iterateCallback
   * @param {string} key
   * @param {string} value
   */

  /**
   * @param {AbstractSyncStorage~iterateCallback} callback
   * @return {Promise}
   */
  AbstractSyncStorage.prototype.iterate = function () {
    return Promise.reject(
      new errors.NotImplemented(this.constructor.name + '.iterate'))
  }

  return AbstractSyncStorage
})
