import pg from 'pg'

import AbstractSQLStorage from './abstract'

/**
 * @class PostgreSQLStorage
 * @extends AbstractSQLStorage
 */
export default class PostgreSQLStorage extends AbstractSQLStorage {
  /**
   * @param {Object} opts
   * @param {string} opts.url
   * @param {string} [opts.native=false]
   */
  constructor (opts) {
    super()

    this._url = Object(opts).url
    this._pg = Object(opts).native === true ? pg.native : pg
  }

  /**
   * @return {boolean}
   */
  static isAvailable () { return true }

  /**
   * @param {string} sql
   * @param {Array.<*>} args
   * @return {Promise.<Array>}
   */
  _query (sql, args) {
    return new Promise((resolve, reject) => {
      this._pg.connect(this._url, (err, client, done) => {
        if (err !== null) {
          return reject(err)
        }

        client.query(sql, args, (err, ret) => {
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
  open () {
    return this._query('SELECT * FROM information_schema.tables')
      .then(() => { this._ready() }, (err) => {
        this._ready(err)
        throw err
      })
  }

  /**
   * @param {string} sql
   * @param {Array.<*>} args
   * @return {Promise.<Array>}
   */
  async executeSQL (sql, args) {
    this._isOpenedCheck()
    return this._query(sql, args)
  }
}
