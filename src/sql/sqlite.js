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
  static isAvailable () {
    try {
      require('sqlite3')
      return true
    } catch (err) {
      return false
    }
  }

  /**
   * @return {Promise}
   */
  open () {
    return new Promise((resolve, reject) => {
      let sqlite3 = require('sqlite3')
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
