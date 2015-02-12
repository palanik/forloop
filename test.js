var assert = require('assert');
var blocked = require('blocked')
  , forloop = require('./index.js');
  
var count = 20000;

var blockingFunc = function(i, c) {
  var a = Array(1000).join(c);
}

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

  it('default value', function(done) {
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
