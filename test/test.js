var test = require('tape');
var lisp = require('../src/app.js');

test('foo', function(t) {
  t.plan(1);
  t.equal(lisp.parse('foo'), 'foo');
});