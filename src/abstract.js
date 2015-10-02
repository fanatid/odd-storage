import makeConcurrent from 'make-concurrent'
import { mixin } from 'core-decorators'
import ReadyMixin from 'ready-mixin'

import errors from './errors'

/**
 * @class AbstractStorage
 * @mixes ReadyMixin
 */
@mixin(ReadyMixin)
export default class AbstractStorage {
  /**
   * @return {boolean}
   */
  static isAvailable () {
    return false
  }

  /**
   * @abstract
   * @return {Promise}
   */
  async open () {
    throw new errors.NotImplemented(this.constructor.name + '.open')
  }

  /**
   * @private
   */
  _isOpenedCheck () {
    if (!this.isReady()) {
      throw new errors.UnopenedYet()
    }
  }

  /**
   * @param {function} fn
   * @return {Promise}
   */
  @makeConcurrent({concurrency: 1})
  withLock (fn) {
    this._isOpenedCheck()
    return fn()
  }
}
