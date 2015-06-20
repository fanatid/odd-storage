'use strict'

module.exports = require('../wrapper')(function (Promise) {
  var inherits = require('inherits')
  var extend = require('xtend/mutable')

  var AbstractStorage = require('../abstract')(Promise)
  var errors = require('../errors')

  /**
   * @class AbstractSQLStorage
   * @extends AbstractStorage
   * @param {Object} [opts]
   */
  function AbstractSQLStorage () {
    AbstractStorage.call(this)
  }

  inherits(AbstractSQLStorage, AbstractStorage)
  extend(AbstractSQLStorage, AbstractStorage)

  /**
   * @abstract
   * @param {string} sql
   * @param {Array.<*>} args
   * @return {Promise.<Array>}
   */
  AbstractSQLStorage.prototype.executeSQL = function () {
    return Promise.reject(
      new errors.NotImplemented(this.constructor.name + '.executeSQL'))
  }

  return AbstractSQLStorage
})
