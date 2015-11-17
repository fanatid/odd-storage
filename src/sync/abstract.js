import AbstractStorage from '../abstract'
import errors from '../errors'

/**
 * @class AbstractSyncStorage
 */
export default class AbstractSyncStorage extends AbstractStorage {
  /**
   * @abstract
   * @param {string} key
   * @param {string} value
   * @return {Promise}
   */
  async set () {
    throw new errors.NotImplemented(`${this.constructor.name}.set`)
  }

  /**
   * @abstract
   * @param {string} key
   * @return {Promise.<?string>}
   */
  async get () {
    throw new errors.NotImplemented(`${this.constructor.name}.get`)
  }

  /**
   * @return {Promise.<Generator>}
   */
  async keys () {
    throw new errors.NotImplemented(`${this.constructor.name}.keys`)
  }

  /**
   * @return {Promise.<Generator>}
   */
  async entries () {
    throw new errors.NotImplemented(`${this.constructor.name}.entries`)
  }

  /**
   * @abstract
   * @param {string} key
   * @return {Promise}
   */
  async remove () {
    throw new errors.NotImplemented(`${this.constructor.name}.remove`)
  }

  /**
   * @abstract
   * @return {Promise}
   */
  async clear () {
    throw new errors.NotImplemented(`${this.constructor.name}.clear`)
  }
}
