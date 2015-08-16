import isFunction from 'lodash.isfunction'

import AbstractSyncStorage from './abstract'

// https://developer.mozilla.org/en-US/docs/Web/API/IDBFactory/open
var indexedDB = (global.indexedDB ||
                 global.mozIndexedDB ||
                 global.webkitIndexedDB ||
                 global.msIndexedDB)

/**
 * @class IndexedDBStorage
 * @extends AbstractSyncStorage
 */
export default class IndexedDBStorag extends AbstractSyncStorage {
  /**
   * @param {Object} [opts]
   * @param {string} [opts.dbName=odd-storage]
   */
  constructor (opts = {dbName: 'odd-storage'}) {
    super()
    this._dbName = opts.dbName
  }

  /**
   * @return {boolean}
   */
  static isAvailable () {
    return (typeof indexedDB === 'object' && isFunction(indexedDB.open))
  }

  /**
   * @return {Promise}
   */
  open () {
    return new Promise((resolve, reject) => {
      let req = indexedDB.open(this._dbName, 1)

      req.onerror = () => {
        reject(req.error)
      }

      req.onupgradeneeded = () => {
        req.result.createObjectStore(this._dbName)
      }

      req.onsuccess = () => {
        this._db = req.result
        resolve()
      }
    })
    .then(() => { this._ready() }, (err) => {
      this._ready(err)
      throw err
    })
  }

  /**
   * @param {string} key
   * @param {string} value
   * @return {Promise}
   */
  async set (key, value) {
    this._isOpenedCheck()

    await new Promise((resolve, reject) => {
      let tx = this._db.transaction(this._dbName, 'readwrite')
      let req = tx.objectStore(this._dbName).put(String(value), String(key))

      tx.oncomplete = resolve

      tx.onabort = tx.onerror = () => {
        let err = req.error ? req.error : req.transaction.error
        reject(err)
      }
    })
  }

  /**
   * @param {string} key
   * @return {Promise.<?string>}
   */
  async get (key) {
    this._isOpenedCheck()

    return await new Promise((resolve, reject) => {
      let tx = this._db.transaction(this._dbName, 'readonly')
      let req = tx.objectStore(this._dbName).get(String(key))

      req.onsuccess = () => {
        resolve(req.result === undefined ? null : req.result)
      }

      req.onerror = () => {
        reject(req.error)
      }
    })
  }

  /**
   * @param {string} key
   * @return {Promise}
   */
  async remove (key) {
    this._isOpenedCheck()

    await new Promise((resolve, reject) => {
      let tx = this._db.transaction(this._dbName, 'readwrite')
      let req = tx.objectStore(this._dbName).delete(String(key))

      tx.oncomplete = () => {
        resolve()
      }

      tx.onabort = tx.onerror = () => {
        let err = req.error ? req.error : req.transaction.error
        reject(err)
      }
    })
  }

  /**
   * @return {Promise.<Object>}
   */
  async entries () {
    this._isOpenedCheck()

    let rows = await new Promise((resolve, reject) => {
      let tx = this._db.transaction(this._dbName, 'readonly')
      let req = tx.objectStore(this._dbName).openCursor()

      let rows = []
      req.onsuccess = () => {
        let cursor = req.result

        if (cursor === null) {
          return resolve(rows)
        }

        rows.push({key: cursor.key, value: cursor.value})
        cursor.continue()
      }

      req.onerror = () => {
        reject(req.error)
      }
    })

    return (function *() {
      for (let row of rows) {
        yield [row.key, row.value]
      }
    })()
  }

  /**
   * @return {Promise}
   */
  async clear () {
    this._isOpenedCheck()

    await new Promise((resolve, reject) => {
      let tx = this._db.transaction(this._dbName, 'readwrite')
      let req = tx.objectStore(this._dbName).clear()

      tx.oncomplete = resolve

      tx.onabort = tx.onerror = function () {
        let err = req.error ? req.error : req.transaction.error
        reject(err)
      }
    })
  }
}
