/**
 * @param {*} obj
 * @return {boolean}
 */
export function isFunction (obj) {
  let tag = Object.prototype.toString.call(obj)
  return tag === '[object Function]' || tag === '[object GeneratorFunction]'
}
