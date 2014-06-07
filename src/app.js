function findMatchingParen(source, start = 0) {
  if (source.charAt(start) !== '(')
    throw Error('First character is not \'(\')');

  var i = start;
  var openBrackets = 1;

  while (openBrackets > 0) {
    i += 1;

    if (source.length === i)
      throw Error('Incomplete expression: ' + source);

    switch (source[i]) {
      case '(':
        openBrackets += 1;
        break;
      case ')':
        openBrackets -= 1;
        break;
    }
  }

  return i;
}

function splitExps(source) {
  var rest = source.trim();
  var exps = [];

  while (rest) {
    var result = firstExp(rest);
    rest = result[1];
    exps.push(result[0]);
  }

  return exps;
}

function firstExp(source) {
  source = source.trim();

  switch (source[0]) {
    case '\'':
      var [exp, rest] = firstExp(source.slice(1));
      return [source[0] + exp, rest];
    case '(':
      var last = findMatchingParen(source);
      return [source.slice(0, last + 1), source.slice(last + 1)];
    default:
      var match = source.match(/^[^\s)']+/);
      var end = match[0].length;
      return [source.slice(0, end), source.slice(end)];
  }
}

function parseBoolean(source) {
  switch (source) {
    case '#t':
      return true;
    case '#f':
      return false;
    default:
      return null;
  }
}

function isInteger(source) {
  return isNaN(parseInt(source)) === false;
}

function parseInteger(source) {
  if (isInteger(source))
    return parseInt(source);
  else
    return null;
}

function parse(source) {
  if (parseBoolean(source) !== null)
    return parseBoolean(source);
  else if (parseInteger(source) !== null)
    return parseInteger(source);
  else if (source === '()')
    return [];
  else if (source.charAt(0) === '(') {
    var l = [];

    splitExps(source.substring(1, findMatchingParen(source))).forEach((exp) => {
      l.push(parse(exp));
    });

    return l;
  }
  else
    return source;
}

module.exports = {
  findMatchingParen: (source, start = 0) => {
    return findMatchingParen(source, start);
  },
  parse: (source) => {
    return parse(source);
  }
};
