# randombytes

[![Version](http://img.shields.io/npm/v/randombytes.svg)](https://www.npmjs.org/package/randombytes) [![Build Status](https://travis-ci.org/crypto-browserify/randombytes.svg?branch=master)](https://travis-ci.org/crypto-browserify/randombytes)

### Updated version of https://github.com/crypto-browserify/randombytes.

## Info
randombytes from node that works in the browser. In Node, you just get crypto.randomBytes, but in the browser it uses .crypto/msCrypto.getRandomValues

```js
const randomBytes = require('randombytes');
randomBytes(16); // Get 16 random bytes
randomBytes(16, function (err, resp) {
  // resp is 16 random bytes
});
```