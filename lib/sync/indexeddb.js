'use strict'

module.exports = require('../wrapper')(function (Promise) {
  var assign = require('lodash.assign')
  var inherits = require('inherits')

  var AbstractSyncStorage = require('./abstract')(Promise)
  var util = require('../util')

  // https://developer.mozilla.org/en-US/docs/Web/API/IDBFactory/open
  var indexedDB = (global.indexedDB ||
                   global.mozIndexedDB ||
                   global.webkitIndexedDB ||
                   global.msIndexedDB)

  /**
   * @class IndexedDBStorage
   * @extends AbstractSyncStorage
   * @param {Object} [opts]
   * @param {string} [opts.dbName=odd-storage]
   */
  function IndexedDBStorage (opts) {
    AbstractSyncStorage.call(this)

    var dbName = Object(opts).dbName
    this._dbName = dbName === undefined ? 'odd-storage' : dbName
  }

  inherits(IndexedDBStorage, AbstractSyncStorage)
  assign(IndexedDBStorage, AbstractSyncStorage)

  /**
   * @return {boolean}
   */
  IndexedDBStorage.isAvailable = function () {
    return (typeof indexedDB === 'object' &&
            util.toString(indexedDB.open) === 'Function')
  }

  /**
   * @return {Promise}
   */
  IndexedDBStorage.prototype.open = function () {
    var self = this
    return new Promise(function (resolve, reject) {
      var req = indexedDB.open(self._dbName, 1)

      req.onerror = function () {
        reject(req.error)
      }

      req.onupgradeneeded = function () {
        req.result.createObjectStore(self._dbName)
      }

      req.onsuccess = function () {
        self._db = req.result
        resolve()
      }
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
  IndexedDBStorage.prototype.set = function (key, value) {
    var self = this
    return new Promise(function (resolve, reject) {
      self._isOpenedCheckPromise()
        .then(function () {
          var tx = self._db.transaction(self._dbName, 'readwrite')
          var req = tx.objectStore(self._dbName).put(String(value), String(key))

          tx.oncomplete = function () {
            resolve()
          }

          tx.onabort = tx.onerror = function () {
            var err = req.error ? req.error : req.transaction.error
            reject(err)
          }
        })
        .catch(reject)
    })
  }

  /**
   * @param {string} key
   * @return {Promise.<?string>}
   */
  IndexedDBStorage.prototype.get = function (key) {
    var self = this
    return new Promise(function (resolve, reject) {
      self._isOpenedCheckPromise()
        .then(function () {
          var tx = self._db.transaction(self._dbName, 'readonly')
          var req = tx.objectStore(self._dbName).get(String(key))

          req.onsuccess = function () {
            resolve(req.result === undefined ? null : req.result)
          }

          req.onerror = function () {
            reject(req.error)
          }
        })
        .catch(reject)
    })
  }

  /**
   * @param {string} key
   * @return {Promise}
   */
  IndexedDBStorage.prototype.remove = function (key) {
    var self = this
    return new Promise(function (resolve, reject) {
      self._isOpenedCheckPromise()
        .then(function () {
          var tx = self._db.transaction(self._dbName, 'readwrite')
          var req = tx.objectStore(self._dbName).delete(String(key))

          tx.oncomplete = function () {
            resolve()
          }

          tx.onabort = tx.onerror = function () {
            var err = req.error ? req.error : req.transaction.error
            reject(err)
          }
        })
        .catch(reject)
    })
  }

  /**
   * @param {AbstractSyncStorage~iterateCallback} callback
   * @return {Promise}
   */
  IndexedDBStorage.prototype.iterate = function (callback) {
    var self = this
    return new Promise(function (resolve, reject) {
      self._isOpenedCheckPromise()
        .then(function () {
          var tx = self._db.transaction(self._dbName, 'readonly')
          var req = tx.objectStore(self._dbName).openCursor()

          var rows = []
          req.onsuccess = function () {
            var cursor = req.result

            if (cursor === null) {
              return resolve(rows)
            }

            rows.push([cursor.key, cursor.value])
            cursor.continue()
          }

          req.onerror = function () {
            reject(req.error)
          }
        })
        .catch(reject)
    })
    .then(function (rows) {
      return new Promise(function (resolve, reject) {
        function next (index) {
          if (index === rows.length) {
            return resolve()
          }

          Promise.resolve()
            .then(function () {
              var row = rows[index]
              return callback(row[0], row[1])
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
  IndexedDBStorage.prototype.clear = function () {
    var self = this
    return new Promise(function (resolve, reject) {
      self._isOpenedCheckPromise()
        .then(function () {
          var tx = self._db.transaction(self._dbName, 'readwrite')
          var req = tx.objectStore(self._dbName).clear()

          tx.oncomplete = function () {
            resolve()
          }

          tx.onabort = tx.onerror = function () {
            var err = req.error ? req.error : req.transaction.error
            reject(err)
          }
        })
        .catch(reject)
    })
  }

  return IndexedDBStorage
})
