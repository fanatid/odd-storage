'use strict'

module.exports = require('../wrapper')(function (Promise) {
  var assign = require('lodash.assign')
  var inherits = require('inherits')

  var AbstractSQLStorage = require('./abstract')(Promise)
  var util = require('../util')

  /**
   * @class WebSQLStorage
   * @extends AbstractStorage
   * @param {Object} [opts]
   * @param {string} [opts.dbName=odd-storage]
   * @param {number} [opts.dbSize=5] Size in megabytes
   */
  function WebSQLStorage (opts) {
    AbstractSQLStorage.call(this)

    var dbName = Object(opts).dbName
    this._dbName = dbName === undefined ? 'odd-storage' : dbName

    var dbSize = Object(opts).dbSize
    this._dbSize = (dbSize === undefined ? 5 : dbSize) * 1000 * 1000
  }

  inherits(WebSQLStorage, AbstractSQLStorage)
  assign(WebSQLStorage, AbstractSQLStorage)

  /**
   * @return {boolean}
   */
  WebSQLStorage.isAvailable = function () {
    return util.toString(global.openDatabase) === 'Function'
  }

  /**
   * @return {Promise}
   */
  WebSQLStorage.prototype.open = function () {
    var self = this
    return Promise.resolve()
      .then(function () {
        self._db = global.openDatabase(
          self._dbName, '1.0', self._dbName, self._dbSize)
      })
      .then(function () { self._ready() }, function (err) {
        self._ready(err)
        throw err
      })
  }

  /**
   * @param {string} sql
   * @param {Array.<*>} args
   * @return {Promise.<Array>}
   */
  WebSQLStorage.prototype.executeSQL = function (sql, args) {
    var self = this
    return new Promise(function (resolve, reject) {
      self._isOpenedCheckPromise()
        .then(function () {
          self._db.transaction(function (tx) {
            function onResolve (t, result) {
              var rows = []
              for (var i = 0, len = result.rows.length; i < len; ++i) {
                rows.push(result.rows.item(i))
              }

              resolve(rows)
            }

            function onReject (t, err) {
              reject(new Error(err.message))
            }

            tx.executeSql(sql, args, onResolve, onReject)
          })
        })
        .catch(reject)
    })
  }

  return WebSQLStorage
})
