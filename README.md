# throo

Just like [through2](https://www.npmjs.com/package/through2), but without `this`. Instead, use the first argument `stream`.

## Install

```sh
npm install throo
```

## Usage

```js
const through = require('throo')
process.stdin
  .pipe(through(
    (stream, chunk, enc, cb) => {
      stream.push(chunk)
      //etc
    },
    (stream, cb) => {

    }
  ))
  .pipe(process.stdout)
```

## API

See [through2](https://www.npmjs.com/package/through2).
