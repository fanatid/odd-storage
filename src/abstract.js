import initMakeConcurrent from 'make-concurrent'
import initReadyMixin from 'ready-mixin'

import errors from './errors'

var makeConcurrent = initMakeConcurrent(Promise)
var ReadyMixin = initReadyMixin(Promise)

/**
 * @class AbstractStorage
 * @mixes ReadyMixin
 */
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
  withLock = makeConcurrent((fn) => {
    this._isOpenedCheck()
    return fn()
  }, {concurrency: 1})
}

ReadyMixin(AbstractStorage.prototype)
