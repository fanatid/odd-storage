import sqlite3 from 'sqlite3'

import AbstractSQLStorage from './abstract'

/**
 * @class SQLiteStorage
 * @extends AbstractSQLStorage
 */
export default class SQLiteStorage extends AbstractSQLStorage {
  /**
   * @param {Object} [opts]
   * @param {string} [opts.filename=odd-storage.sqlite]
   */
  constructor (opts = {filename: 'odd-storage.sqlite'}) {
    super()
    this._filename = opts.filename
  }

  /**
   * @return {boolean}
   */
  static isAvailable () { return true }

  /**
   * @return {Promise}
   */
  open () {
    return new Promise((resolve, reject) => {
      this._db = new sqlite3.Database(this._filename, (err) => {
        if (err !== null) {
          return reject(err)
        }

        resolve()
      })
    })
    .then(() => { this._ready(null) }, (err) => {
      this._ready(err)
      throw err
    })
  }

  /**
   * @param {string} sql
   * @param {Array.<*>} args
   * @return {Promise.<Array>}
   */
  executeSQL (sql, args) {
    return new Promise((resolve, reject) => {
      this._isOpenedCheck()

      this._db.all(sql, args, (err, rows) => {
        if (err !== null) {
          return reject(err)
        }

        resolve(rows || [])
      })
    })
  }
}
