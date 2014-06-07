function findMatchingParen(str, start = 0) {
  if (str.charAt(start) !== '(')
    throw Error('First character is not \'(\')');

  var i = start;
  var openBrackets = 1;

  while (openBrackets > 0) {
    i += 1;

    if (str.length === i)
      throw Error('Incomplete expression: ' + str);

    switch (str[i]) {
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

function parseBoolean(str) {
  switch (str) {
    case '#t':
      return true;
    case '#f':
      return false;
    default:
      return null;
  }
}

function isInteger(str) {
  return isNaN(parseInt(str)) === false;
}

function parseInteger(str) {
  if (isInteger(str))
    return parseInt(str);
  else
    return null;
}

function parse(str) {
  if (parseBoolean(str) !== null)
    return parseBoolean(str);
  else if (parseInteger(str) !== null)
    return parseInteger(str);
  else if (str === '()')
    return [];
  else if (str.charAt(0) === '(') {
    var l = [];

    splitExps(str.substring(1, findMatchingParen(str))).forEach((exp) => {
      l.push(parse(exp));
    });

    return l;
  }
  else
    return str;
}

module.exports = {
  findMatchingParen: (str, start = 0) => {
    return findMatchingParen(str, start);
  },
  parse: (str) => {
    return parse(str);
  }
};
