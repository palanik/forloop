var assert = require('assert');
var blocked = require('blocked')
  , forloop = require('./index.js');
  
var count = 20000;

var blockingFunc = function(i, c) {
  var a = Array(1000).join(c);
};

describe('blocking', function() {
  it('for loop', function(done) {
    var blockErr = null;

    blocked(function(ms){
        blockErr = new Error("Blocked " + ms + "ms");
      done();
    });
    setTimeout(function() {
      for (var i = 0; i < count; i++) {
        blockingFunc(i, 'b');
      }
      setTimeout(function() {
        if (!blockErr) {
          done("Did not block");
        }
      }, 100);
    }, 100);
  });
});

describe('non-blocking', function() {
  it('forloop', function(done) {
    var blockErr = null;

    blocked(function(ms){
        blockErr = new Error("Blocked " + ms + "ms");
      done(blockErr);
    });

    forloop(0,
      count,
      1,
      function(i) {
        blockingFunc(i, 'n');
      },
      function() {
        if (!blockErr) {
          done();
        }
      }
          );
  });
});


describe('increment', function() {
  it('by 1', function(done) {
    var sum = (count * (count + 1)) / 2;
    forloop(0, count, 1,
      function(i) {
        sum -= (i + 1);
      },
      function() {
        assert.equal(sum, 0);
        done();
      }
          );
  });

  it('by -1', function(done) {
    var sum = (count * (count + 1)) / 2;
    forloop(count, 0, -1,
      function(i) {
        sum -= i;
      },
      function() {
        assert.equal(sum, 0);
        done();
      }
          );
  });

  it('by 10', function(done) {
    var sum = count / 10;
    var tally = 0;
    forloop(0, count, 10,
      function(i) {
        tally++;
      },
      function() {
        assert.equal(sum, tally);
        done();
      }
          );
  });

  it('default increment', function(done) {
    var sum = (count * (count + 1)) / 2;
    forloop(0, count,
      function(i) {
        sum -= (i + 1);
      },
      function() {
        assert.equal(sum, 0);
        done();
      }
          );
  });
});

var golden = function(φ) {
  return Math.sqrt(φ + Math.sqrt(1));
};

describe('forEach', function() {
  it('array non-blocking', function(done) {
    var blockErr = null;

    blocked(function(ms){
        blockErr = new Error("Blocked " + ms + "ms");
      done(blockErr);
    });

    var a = Array(count);
    var φ = 0;
    forloop(a,
      function(e, i) {
        φ = golden(φ);
        a[i] = φ;
      },
      function() {
        if (!blockErr) {
          done();
        }
      }
          );
  });

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }


  it('array prime numbers', function(done) {

    function isPrime(n) {
      var i = 2;
      while (i <= Math.sqrt(n)) {
        if (n % i++ < 1) {
          return false;
        }
      }
      return n > 1;
    }

    function eratosthenes(arr, cb) {
      arr[0] = arr[1] = true;
      forloop(arr,
              function(e, i, a) {
                if (e === undefined) {
                  forloop(i + i, a.length, i,
                          function(j) {
                            a[j] = false;
                          });
                  a[i] = true;
                }
              },
              cb);
    }

    var validate = function(arr) {
      forloop(arr,
              function(e, i, a) {
                if (i > 1) {
                  assert.strictEqual(e, isPrime(i));
                }
              },
              function(a) {
                done();
              });
    };

    eratosthenes(Array(count), validate);
  });

  it('array linear search', function(done) {

    var find = function(arr, val, cb) {
      var found = -1;

      forloop(arr,
        function(e, i) {
          if (e == val) {
            found = i;
          }
        },
        function() {
          cb(found);
        }
            );

    };


    var a = Array(count);

    forloop(a,
        // fill random values
        function(e, i, arr) {
          arr[i] = getRandomInt(0, arr.length);
        },
        function(arr) {
          // Set array.length at a random location
          var idx = getRandomInt(0, arr.length);
          arr[idx] = arr.length;

          // Find array.length at the specific location
          find(arr, 
                arr.length, 
                function(found) {
                  assert.equal(found, idx);
                  done();
                }
              );
        }
            );

  });
});
