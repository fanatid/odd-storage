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
    this._ready()
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
   * @param {AbstractSyncStorage~iterateCallback} callback
   * @return {Promise}
   */
  async iterate (callback) {
    this._isOpenedCheck()
    for (let key of Object.keys(this._data)) {
      await callback(key, this._data[key])
    }
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
