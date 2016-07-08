# throo

[through2](https://www.npmjs.com/package/through2) for people that can't take `this` anymore.

The API is just like `through2`, but `push` is passed as an argument so you don't need to deal with function context.

## Install

```sh
npm install throo through2
```

## Usage

```js
const through = require('throo')

process.stdin
  .pipe(through(
    (push, chunk, enc, cb) => {
      stream.push(chunk)
      //etc
    },
    (push, cb) => {

    }
  ))
  .pipe(process.stdout)
```

## API

See [through2](https://www.npmjs.com/package/through2).
