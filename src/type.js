function typeOf (value) {
  return Object
    .prototype
    .toString
    .call(value)
    .match(/\[object (.*)\]/)[1]
    .toLowerCase()
}

export function isObject (value) {
  return typeOf(value) === 'object'
}

export function isString (value) {
  return typeOf(value) === 'string'
}

export function isHtmlElement (value) {
  return value instanceof HTMLElement
}
