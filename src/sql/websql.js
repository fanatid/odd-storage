import AbstractSQLStorage from './abstract'

/**
 * @class WebSQLStorage
 * @extends AbstractSQLStorage
 */
export default class WebSQLStorage extends AbstractSQLStorage {
  /**
   * @param {Object} [opts]
   * @param {string} [opts.dbName=odd-storage]
   * @param {number} [opts.dbSize=5] Size in megabytes
   */
  constructor (opts) {
    super()

    let dbName = Object(opts).dbName
    this._dbName = dbName === undefined ? 'odd-storage' : dbName

    let dbSize = Object(opts).dbSize
    this._dbSize = (dbSize === undefined ? 5 : dbSize) * 1000 * 1000
  }

  /**
   * @return {boolean}
   */
  static isAvailable () { return global.openDatabase === 'function' }

  /**
   * @return {Promise}
   */
  open () {
    return Promise.resolve()
      .then(() => {
        this._db = global.openDatabase(
          this._dbName, '1.0', this._dbName, this._dbSize)
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

      this._db.transaction((tx) => {
        function onResolve (t, result) {
          let rows = []
          for (let i = 0, len = result.rows.length; i < len; ++i) {
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
  }
}
