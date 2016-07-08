const through = require('through2')

function wrapFn (fn) {
  return function (...args) {
    return fn(this, ...args)
  }
}

function wrapArgs (args) {
  return args.map(arg => {
    if (typeof arg === 'function') {
      return wrapFn(arg)
    }
    return arg
  })
}

function throo (...args) {
  return through(...wrapArgs(args))
}

['obj', 'ctor'].forEach(prop => {
  throo[prop] = function (...args) {
    return through[prop](...wrapArgs(args))
  }
})

module.exports = throo
