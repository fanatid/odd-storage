'use strict'

module.exports = require('../wrapper')(function (Promise) {
  var assign = require('lodash.assign')
  var inherits = require('inherits')

  var AbstractStorage = require('../abstract')(Promise)
  var errors = require('../errors')

  /**
   * @class AbstractSqlStorage
   * @extends AbstractStorage
   * @param {Object} [opts]
   */
  function AbstractSqlStorage () {
    AbstractStorage.call(this)
  }

  inherits(AbstractSqlStorage, AbstractStorage)
  assign(AbstractSqlStorage, AbstractStorage)

  /**
   * @param {string} sql
   * @param {Array.<*>} args
   * @return {Promise.<Array>}
   */
  AbstractSqlStorage.prototype.executeSql = function () {
    return Promise.reject(
      new errors.NotImplemented(this.constructor.name + '.executeSql'))
  }

  return AbstractSqlStorage
})
