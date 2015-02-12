forloop
=======

Node.js non-blocking [for ( ; ; ) loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) for long running tasks.

  [![NPM version](https://img.shields.io/npm/v/forloop.svg?style=flat)](https://www.npmjs.org/package/forloop)
  [![Build Status](https://img.shields.io/travis/palanik/forloop.svg?style=flat)](https://travis-ci.org/palanik/forloop)

## Introduction
Node.js is an asynchronous event driven framework for the V8 JavaScript engine. CPU-intensive task in your code will block the current thread of execution, including the event loop. Blocking the event loop can have catastrophic effects on the Node application.

### What is wrong with vanilla for loop?
Nothing. 

This library tackles the use case where CPU-intensive code block is executed repetitively inside a loop.

## Installation
```
$ npm install forloop
```

## Usage

###forloop(initialization, limit, increment, iterationCallback, finalCallback)

__Arguments__

* `initialization` - Initial value for the counter variable.
* `limit` - The final value of the counter to break the loop.
* `increment` - The value to increment the counter variable.
* `iterationCallback(i)` - A function to call on each itertation of the loop.
  The current value of the counter variable is passed as the argument.
* `finalCallback()` - A function, which is called when the loop exits.

## Example
Calculating [Golden Ratio](http://demonstrations.wolfram.com/NestedSquareRootRepresentationOfTheGoldenRatio/)

### Bad
```js
var count = 10000000;
var φ = 0;

for (var i = 0; i < count; i++) {
    φ = Math.sqrt(φ + Math.sqrt(1));
}

console.log("φ ≈ %d", φ);
```

### Good
```js
var forloop = require('forloop');
var count = 10000000;
var φ = 0;

forloop(0, count, 1,
        function(i) {
            φ = Math.sqrt(φ + Math.sqrt(1));
        },
        function() {
            console.log("φ ≈ %d", φ);
        }
);
```

## Test

    $ npm test

## License

  [MIT](LICENSE)
