'use strict';

// Limit of Crypto.getRandomValues()
// https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
const MAX_BYTES = 65536;

// Node supports requesting up to this number of bytes
// https://github.com/nodejs/node/blob/master/lib/internal/crypto/random.js#L48
const MAX_UINT32 = 4294967295;

function oldBrowser() {
	throw new Error('Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11');
}

const Buffer = require('safe-buffer').Buffer;
const crypto = global.crypto || global.msCrypto;

if (crypto && crypto.getRandomValues) {
	module.exports = randomBytes;
} else {
	module.exports = oldBrowser;
}

function randomBytes(size, cb) {
	// phantomjs needs to throw
	if (size > MAX_UINT32) throw new RangeError('requested too many random bytes');

	const bytes = Buffer.allocUnsafe(size);

	// getRandomValues fails on IE if size == 0
	if (size > 0) {
		// This is the max bytes crypto.getRandomValues
		if (size > MAX_BYTES) {
			// Can do at once see https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues
			for (let generated = 0; generated < size; generated += MAX_BYTES) {
				// buffer.slice automatically checks if the end is past the end of
				// The buffer, so we don't have to here
				crypto.getRandomValues(bytes.slice(generated, generated + MAX_BYTES));
			}
		} else {
			crypto.getRandomValues(bytes);
		}
	}

	if (typeof cb === 'function') {
		return process.nextTick(function() {
			cb(null, bytes);
		});
	}

	return bytes;
}
