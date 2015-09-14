/**
 * Error
 *  +-- OddStorageError
 *       +-- NotImplemented
 *       +-- UnopenedYet
 */

let spec = {
  name: 'OddStorageError',
  message: 'Internal Error',
  errors: [{
    name: 'NotImplemented',
    message: '{0}'
  }, {
    name: 'UnopenedYet',
    message: 'Call .open first'
  }]
}

require('error-system').extend(Error, spec)
module.exports = Error.OddStorageError
