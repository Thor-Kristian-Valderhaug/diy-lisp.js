var test = require('tape');
var lisp = require('../src/app.js');

test('parse single symbol', (t) => {
  t.plan(1);
  t.equal(lisp.parse('foo'), 'foo');
});

test('parse boolean', (t) => {
  t.plan(2);
  t.equal(lisp.parse('#t'), true);
  t.equal(lisp.parse('#f'), false);
});

test('parse integer', (t) => {
  t.plan(2);
  t.equal(lisp.parse('42'), 42);
  t.equal(lisp.parse('1337'), 1337);
});
