// Copyright 2014 N. Palani Kumanan.  All rights reserved.

function loop(check, iterator, done) {
  // main function
  var looper = function() {
    // terminate?
    if (check()) {
      if (done) {
        done();
      }
    }
    else {
      setImmediate(function() {
        iterator();
        looper();
      });
    }
  };

  // call it
  looper();
}

function forloop() {
  var arg0 = arguments[0];
  if (Array.isArray(arg0)) {
    return _forEach.apply(undefined, arguments);
  }
  return _forLoop.apply(this, arguments);
}

function _forLoop(start, end, inc, iterator, done) {
  var idx = start;

  // exit condition checking
  var check = function() {
    return (idx >= end);
  };

  if (typeof(inc) == 'function') {
    // inc missing, shift args to right
    done = iterator;
    iterator = inc;
    inc = 1;
  }

  // decrements
  if (inc < 0) {
    check = function() {
      return (idx <= end);
    };
  }

  var _it = function() {
    iterator(idx);
    idx += inc;
  };

  loop(check, _it, done);
}

function _forEach(obj, iterator, done) {
  done = done || function(o) {};
  if (Array.isArray(obj)) {
    _forLoop(0, obj.length, 1, 
            function(idx) {
              iterator(obj[idx], idx, obj);
            },
            function() {
              done(obj);
            }
            );
  }
}

/*
module.exports = {
    forLoop: forLoop,
    forEach: forEach,
    version: '0.0.2'
};
*/

module.exports = forloop;
module.exports.version = '0.0.2';
