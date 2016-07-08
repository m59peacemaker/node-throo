const through = require('through2')

function wrapFn (fn) {
  return function (...args) {
    return fn(this.push.bind(this), ...args)
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

Object.keys(through)
  .filter(key => typeof key !== 'function')
  .forEach(key => {
    throo[key] = function (...args) {
      return through[key](...wrapArgs(args))
    }
  })

module.exports = throo
