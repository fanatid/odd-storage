'use strict'

module.exports = require('../wrapper')(function (Promise) {
  var assign = require('lodash.assign')
  var inherits = require('inherits')
  var sqlite3 = require('sqlite3')

  var AbstractSQLStorage = require('./abstract')(Promise)

  /**
   * @class SQLiteStorage
   * @extends AbstractStorage
   * @param {Object} [opts]
   * @param {string} [opts.filename=odd-storage.sqlite]
   */
  function SQLiteStorage (opts) {
    AbstractSQLStorage.call(this)

    var filename = Object(opts).filename
    this._filename = filename === undefined ? 'odd-storage.sqlite' : filename
  }

  inherits(SQLiteStorage, AbstractSQLStorage)
  assign(SQLiteStorage, AbstractSQLStorage)

  /**
   * @return {boolean}
   */
  SQLiteStorage.isAvailable = function () { return true }

  /**
   * @return {Promise}
   */
  SQLiteStorage.prototype.open = function () {
    var self = this
    return new Promise(function (resolve, reject) {
      Promise.resolve()
        .then(function () {
          self._db = new sqlite3.Database(self._filename, function (err) {
            if (err !== null) {
              return reject(err)
            }

            resolve()
          })
        })
        .catch(reject)
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
  SQLiteStorage.prototype.executeSQL = function (sql, args) {
    var self = this
    return new Promise(function (resolve, reject) {
      self._isOpenedCheckPromise()
        .then(function () {
          self._db.all(sql, args, function (err, rows) {
            if (err !== null) {
              return reject(err)
            }

            resolve(rows || [])
          })
        })
        .catch(reject)
    })
  }

  return SQLiteStorage
})
