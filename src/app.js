function findMatchingParen(str) {
  if (str.charAt(0) !== '(')
    throw Error('First character is not \'(\')');

  if (str.charAt(str.length - 1) === ')')
    return str.length - 1;

  var i = 0;
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

function parseAtom(str) {
  if (parseBoolean(str) !== null)
    return parseBoolean(str);
  else if (parseInteger(str) !== null)
    return parseInteger(str);
  else
    return str;
}

function parseListOfSymbols(str) {
  if (str === '()')
    return [];
  else if (str.charAt(0) === '(' && findMatchingParen(str))
    return str
      .substring(1, findMatchingParen(str))
      .split(' ')
      .map(parseAtom);
  else
    return null;
}

module.exports.parse = (str) => {
  if (parseListOfSymbols(str) !== null)
    return parseListOfSymbols(str);
  else
    return parseAtom(str);
};
