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

test('parse list of symbols', (t) => {
  t.plan(2);
  t.deepEqual(lisp.parse('()'), []);
  t.deepEqual(lisp.parse('(foo bar baz)'), ['foo', 'bar', 'baz']);
});

test('parse list of mixed types', (t) => {
  t.plan(1);
  t.deepEqual(lisp.parse('(foo #t 123)'), ['foo', true, 123]);
});

test('parse on nested list', (t) => {
  t.plan(1);
  var program = '(foo (bar ((#t)) x) (baz y))';
  var ast = ['foo', ['bar', [[true]], 'x'], ['baz', 'y']];
  t.deepEqual(lisp.parse(program, ast));
});
