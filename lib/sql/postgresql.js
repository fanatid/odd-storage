'use strict'

module.exports = require('../wrapper')(function (Promise) {
  var inherits = require('inherits')
  var extend = require('xtend/mutable')
  var pg = require('pg')

  var AbstractSQLStorage = require('./abstract')(Promise)

  /**
   * @class PostgreSQLStorage
   * @extends AbstractStorage
   * @param {Object} opts
   * @param {string} opts.url
   * @param {string} [opts.native=false]
   */
  function PostgreSQLStorage (opts) {
    AbstractSQLStorage.call(this)

    this._url = Object(opts).url
    this._pg = Object(opts).native === true ? pg.native : pg
  }

  inherits(PostgreSQLStorage, AbstractSQLStorage)
  extend(PostgreSQLStorage, AbstractSQLStorage)

  /**
   * @return {boolean}
   */
  PostgreSQLStorage.isAvailable = function () { return true }

  /**
   * @param {string} sql
   * @param {Array.<*>} args
   * @return {Promise.<Array>}
   */
  PostgreSQLStorage.prototype._query = function (sql, args) {
    var self = this
    return new Promise(function (resolve, reject) {
      self._pg.connect(self._url, function (err, client, done) {
        if (err !== null) {
          return reject(err)
        }

        client.query(sql, args, function (err, ret) {
          if (err !== null) {
            client.end()
            return reject(err)
          }

          done()
          resolve(ret.rows)
        })
      })
    })
  }

  /**
   * @return {Promise}
   */
  PostgreSQLStorage.prototype.open = function () {
    var self = this
    return self._query('SELECT * FROM information_schema.tables')
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
  PostgreSQLStorage.prototype.executeSQL = function (sql, args) {
    var self = this
    return self._isOpenedCheckPromise()
      .then(function () {
        return self._query(sql, args)
      })
  }

  return PostgreSQLStorage
})
