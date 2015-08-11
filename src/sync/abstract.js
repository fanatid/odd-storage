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
    throw new errors.NotImplemented(this.constructor.name + '.set')
  }

  /**
   * @abstract
   * @param {string} key
   * @return {Promise.<?string>}
   */
  async get () {
    throw new errors.NotImplemented(this.constructor.name + '.get')
  }

  /**
   * @callback AbstractSyncStorage~iterateCallback
   * @param {string} key
   * @param {string} value
   */

  /**
   * @abstract
   * @param {AbstractSyncStorage~iterateCallback} callback
   * @return {Promise}
   */
  async iterate () {
    throw new errors.NotImplemented(this.constructor.name + '.iterate')
  }

  /**
   * @abstract
   * @param {string} key
   * @return {Promise}
   */
  async remove () {
    throw new errors.NotImplemented(this.constructor.name + '.remove')
  }

  /**
   * @abstract
   * @return {Promise}
   */
  async clear () {
    throw new errors.NotImplemented(this.constructor.name + '.clear')
  }
}
