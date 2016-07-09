const test = require('tape')
const through = require('../')

test('transform', t => {
  t.plan(1)
  const stream = through((push, chunk, enc, cb) => {
    push('abc')
    cb()
  })
  stream.on('data', d => t.equal(String(d), 'abc'))
  stream.write('123')
  stream.end()
})

test('flush', t => {
  t.plan(1)
  const stream = through(null, null, (push, cb) => {
    push('abc')
    cb()
  })
  stream.on('data', d => t.equal(String(d), 'abc'))
  stream.end()
})

test('transform/flush', t => {
  t.plan(2)
  const stream = through(
    (push, chunk, enc, cb) => {
      cb(null, 'abc')
    },
    (push, cb) => {
      push('123')
      cb()
    }
  )
  const results = ['abc', '123']
  stream.on('data', d => {
    t.equal(String(d), results.shift())
  })
  stream.write('000')
  stream.end()
})

test('options', t => {
  t.plan(1)
  const stream = through(
    {objectMode: true},
    (push, chunk, enc, cb) => {
      cb(null, {abc: 123})
    }
  )
  stream.on('data', d => {
    t.deepEqual(d, {abc: 123})
  })
  stream.write('000')
  stream.end()
})

test('.obj', t => {
  t.plan(1)
  const stream = through.obj((push, chunk, enc, cb) => {
    cb(null, {abc: 123})
  })
  stream.on('data', d => {
    t.deepEqual(d, {abc: 123})
  })
  stream.write('000')
  stream.end()
})

test('.ctor', t => {
  t.plan(1)
  const Stream = through.ctor((push, chunk, enc, cb) => {
    push('abc')
    cb(null)
  })
  const stream = new Stream()
  stream.on('data', d => {
    t.equal(String(d), 'abc')
  })
  stream.write('000')
  stream.end()
})
