'use strict'

module.exports = function wrapper (initfn) {
  var instances = {}

  return function (Promise) {
    if (instances[Promise] === undefined) {
      instances[Promise] = initfn(Promise)
    }

    return instances[Promise]
  }
}
