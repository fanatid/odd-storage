import AbstractSyncStorage from './abstract'

/**
 * @class LocalStorage
 * @extends AbstractSyncStorage
 */
export default class LocalStorage extends AbstractSyncStorage {
  /**
   * @param {Object} [opts]
   * @param {string} [opts.prefix=odd-storage]
   */
  constructor (opts = {prefix: 'odd-storage'}) {
    super()
    this._prefix = opts.storage + '/'
  }

  /**
   * @return {boolean}
   */
  static isAvailable () {
    return (typeof global.localStorage === 'object' &&
            typeof global.localStorage.getItem === 'function' &&
            typeof global.localStorage.setItem === 'function' &&
            typeof global.localStorage.clear === 'function')
  }

  /**
   * @return {Promise}
   */
  open () {
    return Promise.resolve()
      .then(() => {
        global.localStorage.setItem('odd-storage-test', 'yes')
        global.localStorage.removeItem('odd-storage-test')
      })
      .then(() => { this._ready(null) }, (err) => {
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
    global.localStorage.setItem(this._prefix + key, String(value))
  }

  /**
   * @param {string} key
   * @return {Promise.<?string>}
   */
  async get (key) {
    this._isOpenedCheck()
    return global.localStorage.getItem(this._prefix + key)
  }

  /**
   * @return {Promise.<Iterable.<{key: string, value: string}>>}
   */
  async entries () {
    this._isOpenedCheck()

    let prefixLength = this._prefix.length
    let rows = []
    for (let i = 0; i < global.localStorage.length; ++i) {
      let key = global.localStorage.key(i)
      if (key.substring(0, prefixLength) === this._prefix) {
        let value = global.localStorage.getItem(key)
        if (value !== null) {
          rows.push({key: key.substring(prefixLength), value: value})
        }
      }
    }

    return rows.values()
  }

  /**
   * @param {string} key
   * @return {Promise}
   */
  async remove (key) {
    this._isOpenedCheck()
    global.localStorage.removeItem(this._prefix + key)
  }

  /**
   * @return {Promise}
   */
  async clear () {
    this._isOpenedCheck()

    let prefixLength = this._prefix.length

    for (let i = 0; i < global.localStorage.length; i += 1) {
      let key = global.localStorage.key(i)
      if (key !== null && key.substring(0, prefixLength) === this._prefix) {
        global.localStorage.removeItem(key)
        i -= 1
      }
    }
  }
}
