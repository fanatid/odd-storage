'use strict'

module.exports = require('../wrapper')(function (Promise) {
  var assign = require('lodash.assign')
  var inherits = require('inherits')

  var AbstractSyncStorage = require('./abstract')(Promise)

  /**
   * @class MemoryStorage
   * @extends AbstractSyncStorage
   * @param {Object} [opts]
   */
  function MemoryStorage () {
    AbstractSyncStorage.call(this)
    this._data = {}
  }

  inherits(MemoryStorage, AbstractSyncStorage)
  assign(MemoryStorage, AbstractSyncStorage)

  /**
   * @return {boolean}
   */
  MemoryStorage.isAvailable = function () { return true }

  /**
   * @return {Promise}
   */
  MemoryStorage.prototype.open = function () {
    this._ready()
    return Promise.resolve()
  }

  /**
   * @param {string} key
   * @param {string} value
   * @return {Promise}
   */
  MemoryStorage.prototype.set = function (key, value) {
    var self = this
    return self._isOpenedCheckPromise()
      .then(function () {
        self._data[key] = String(value)
      })
  }

  /**
   * @param {string} key
   * @return {Promise.<?string>}
   */
  MemoryStorage.prototype.get = function (key) {
    var self = this
    return self._isOpenedCheckPromise()
      .then(function () {
        var value = self._data[key]
        return value === undefined ? null : value
      })
  }

  /**
   * @param {string} key
   * @return {Promise}
   */
  MemoryStorage.prototype.remove = function (key) {
    var self = this
    return self._isOpenedCheckPromise()
      .then(function () {
        delete self._data[key]
      })
  }

  /**
   * @param {AbstractSyncStorage~iterateCallback} callback
   * @return {Promise}
   */
  MemoryStorage.prototype.iterate = function (callback) {
    var self = this
    return self._isOpenedCheckPromise()
      .then(function () {
        return new Promise(function (resolve, reject) {
          var keys = Object.keys(self._data)

          function next (index) {
            if (index === keys.length) {
              return resolve()
            }

            Promise.resolve()
              .then(function () {
                var key = keys[index]
                return callback(key, self._data[key])
              })
              .then(function () { next(index + 1) }, reject)
          }

          next(0)
        })
      })
  }

  /**
   * @return {Promise}
   */
  MemoryStorage.prototype.clear = function () {
    var self = this
    return self._isOpenedCheckPromise()
      .then(function () {
        self._data = {}
      })
  }

  return MemoryStorage
})
