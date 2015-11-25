import AbstractSyncStorage from './abstract'

/**
 * @class MemoryStorage
 * @extends AbstractSyncStorage
 */
export default class MemoryStorage extends AbstractSyncStorage {
  /**
   * @return {boolean}
   */
  static isAvailable () { return true }

  /**
   * @return {Promise}
   */
  async open () {
    this._data = {}
    this._ready(null)
  }

  /**
   * @param {string} key
   * @param {string} value
   * @return {Promise}
   */
  async set (key, value) {
    this._isOpenedCheck()
    this._data[key] = String(value)
  }

  /**
   * @param {string} key
   * @return {Promise.<?string>}
   */
  async get (key) {
    this._isOpenedCheck()
    return this._data.hasOwnProperty(key) ? this._data[key] : null
  }

  /**
   * @return {Promise.<Iterable.<{key: string, value: string}>>}
   */
  async entries () {
    this._isOpenedCheck()

    let keys = Object.keys(this._data)
    let rows = new Array(keys.length)
    for (let i = 0; i < rows.length; ++i) {
      rows[i] = {key: keys[i], value: this._data[keys[i]]}
    }

    return rows.values()
  }

  /**
   * @param {string} key
   * @return {Promise}
   */
  async remove (key) {
    this._isOpenedCheck()
    delete this._data[key]
  }

  /**
   * @return {Promise}
   */
  async clear () {
    this._isOpenedCheck()
    this._data = {}
  }
}
