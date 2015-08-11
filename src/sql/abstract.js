import AbstractStorage from '../abstract'
import errors from '../errors'

/**
 * @class AbstractSQLStorage
 * @extends AbstractStorage
 */
export default class AbstractSQLStorage extends AbstractStorage {
  /**
   * @abstract
   * @param {string} sql
   * @param {Array.<*>} args
   * @return {Promise.<Array>}
   */
  async executeSQL () {
    throw new errors.NotImplemented(this.constructor.name + '.executeSQL')
  }
}
