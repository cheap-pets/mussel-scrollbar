function typeOf (value) {
  return Object
    .prototype
    .toString
    .call(value)
    .match(/\[object (.*)\]/)[1]
    .toLowerCase()
}

function isObject (value) {
  return typeOf(value) === 'object'
}

function isString (value) {
  return typeOf(value) === 'string'
}

function isHtmlElement (value) {
  return value instanceof HTMLElement
}

function parseSelector (selector) {
  if (/[()[\]><>:*\s]/.test(selector)) {
    throw new Error('Invalid selector characters.')
  }

  let id = null
  let tagName = 'div'

  const classList = []

  selector
    .split('.')
    .forEach((s, i) => {
      s
        .split('#')
        .forEach((t, j) => {
          if (t) {
            if (i === 0 && j === 0) tagName = t
            else if (j === 0) classList.push(t)
            else id = t
          }
        })
    })

  return {
    id,
    tagName,
    className: classList.join(' ')
  }
}

function setAttributes (el, attributes) {
  if (isString(attributes)) {
    el.appendChild(document.createTextNode(attributes))
  } else if (isObject(attributes)) {
    Object
      .entries(attributes)
      .forEach(([key, value]) => {
        if (key === 'class') {
          value.split(',').forEach(cls => el.classList.add(cls.trim()))
        } else if (key === 'style' && isObject(value)) {
          Object.assign(el.style, value)
        } else if (value != null) {
          el.setAttribute(key, value)
        }
      })
  }
}

export function h (selector, attributes, children) {
  if (!children && Array.isArray(attributes)) {
    children = attributes
    attributes = null
  }

  const {
    id,
    tagName,
    className
  } = isString(selector) && parseSelector(selector)

  const element = isHtmlElement(selector)
    ? selector
    : document.createElement(tagName)

  if (id) element.setAttribute('id', id)
  if (className) element.className = className
  if (attributes) setAttributes(element, attributes)
  if (Array.isArray(children)) children.forEach(el => element.appendChild(el))

  return element
}
