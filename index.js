// Copyright 2014 N. Palani Kumanan.  All rights reserved.

function forloop(start, end, inc, iterator, callback) {
  var idx = start;

  // exit condition checking
  var check = function() {
    return (idx >= end);
  };

  if (typeof(inc) == 'function') {
    // inc missing, shift args to right
    callback = iterator;
    iterator = inc;
    inc = 1;
  }

  // decrements
  if (inc < 0) {
    check = function() {
      return (idx <= end);
    }
  }

  // main function
  var looper = function() {
    // terminate?
    if (check()) {
      if (callback) {
        callback();
      }
    }
    else {
      iterator(idx);
      setImmediate(function() {
        idx += inc;
        looper();
      });
    }
  }

  // call it
  looper();
}

module.exports = forloop;
module.exports.version = '0.0.2';
