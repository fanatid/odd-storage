'use strict'

module.exports = require('../wrapper')(function (Promise) {
  var assign = require('lodash.assign')
  var inherits = require('inherits')

  var AbstractSyncStorage = require('./abstract')(Promise)
  var util = require('../util')

  /**
   * @class LocalStorage
   * @extends AbstractSyncStorage
   * @param {Object} [opts]
   * @param {string} [opts.prefix=odd-storage]
   */
  function LocalStorage (opts) {
    AbstractSyncStorage.call(this)

    var prefix = String(opts).prefix
    this._prefix = (prefix === undefined ? 'odd-storage' : prefix) + '/'
  }

  inherits(LocalStorage, AbstractSyncStorage)
  assign(LocalStorage, AbstractSyncStorage)

  /**
   * @return {boolean}
   */
  LocalStorage.isAvailable = function () {
    return (typeof global.localStorage === 'object' &&
            util.toString(global.localStorage.getItem) === 'Function' &&
            util.toString(global.localStorage.setItem) === 'Function' &&
            util.toString(global.localStorage.clear) === 'Function')
  }

  /**
   * @return {Promise}
   */
  LocalStorage.prototype.open = function () {
    var self = this
    return Promise.resolve()
      .then(function () {
        global.localStorage.setItem('odd-storage-test', 'yes')
        global.localStorage.removeItem('odd-storage-test')
      })
      .then(function () { self._ready() }, function (err) {
        self._ready(err)
        throw err
      })
  }

  /**
   * @param {string} key
   * @param {string} value
   * @return {Promise}
   */
  LocalStorage.prototype.set = function (key, value) {
    var self = this
    return self._isOpenedCheckPromise()
      .then(function () {
        global.localStorage.setItem(self._prefix + key, String(value))
      })
  }

  /**
   * @param {string} key
   * @return {Promise.<?string>}
   */
  LocalStorage.prototype.get = function (key) {
    var self = this
    return self._isOpenedCheckPromise()
      .then(function () {
        return global.localStorage.getItem(self._prefix + key)
      })
  }

  /**
   * @param {string} key
   * @return {Promise}
   */
  LocalStorage.prototype.remove = function (key) {
    var self = this
    return self._isOpenedCheckPromise()
      .then(function () {
        global.localStorage.removeItem(self._prefix + key)
      })
  }

  /**
   * @param {AbstractSyncStorage~iterateCallback} callback
   * @return {Promise}
   */
  LocalStorage.prototype.iterate = function (callback) {
    var self = this
    return self._isOpenedCheckPromise()
      .then(function () {
        return new Promise(function (resolve, reject) {
          var prefixLength = self._prefix.length

          function next (index) {
            if (index >= global.localStorage.length) {
              return resolve()
            }

            Promise.resolve()
              .then(function () {
                var skey = global.localStorage.key(index)
                if (skey === null) {
                  return
                }

                if (skey.substring(0, prefixLength) !== self._prefix) {
                  return
                }

                var key = skey.substring(prefixLength)
                var val = global.localStorage.getItem(skey)
                return callback(key, val)
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
  LocalStorage.prototype.clear = function () {
    var self = this
    return self._isOpenedCheckPromise()
      .then(function () {
        var keys = []
        return self.iterate(function (key) { keys.push(key) })
          .then(function () {
            for (var i = 0; i < keys.length; ++i) {
              global.localStorage.removeItem(self._prefix + keys[i])
            }
          })
      })
  }

  return LocalStorage
})

