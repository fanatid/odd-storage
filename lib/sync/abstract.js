'use strict'

module.exports = require('../wrapper')(function (Promise) {
  var inherits = require('inherits')
  var extend = require('xtend/mutable')

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
  extend(AbstractSyncStorage, AbstractStorage)

  /**
   * @abstract
   * @param {string} key
   * @param {string} value
   * @return {Promise}
   */
  AbstractSyncStorage.prototype.set = function () {
    return Promise.reject(
      new errors.NotImplemented(this.constructor.name + '.set'))
  }

  /**
   * @abstract
   * @param {string} key
   * @return {Promise.<?string>}
   */
  AbstractSyncStorage.prototype.get = function () {
    return Promise.reject(
      new errors.NotImplemented(this.constructor.name + '.get'))
  }

  /**
   * @abstract
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
   * @abstract
   * @param {AbstractSyncStorage~iterateCallback} callback
   * @return {Promise}
   */
  AbstractSyncStorage.prototype.iterate = function () {
    return Promise.reject(
      new errors.NotImplemented(this.constructor.name + '.iterate'))
  }

  /**
   * @abstract
   * @return {Promise}
   */
  AbstractSyncStorage.prototype.clear = function () {
    return Promise.reject(
      new errors.NotImplemented(this.constructor.name + '.clear'))
  }

  return AbstractSyncStorage
})
