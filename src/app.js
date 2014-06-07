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

function parseListOfSymbols(str) {
  if (str === '()')
    return [];
  else
    return null;
}

module.exports.parse = (str) => {
  if (parseBoolean(str) !== null)
    return parseBoolean(str);
  else if (parseInteger(str) !== null)
    return parseInteger(str);
  else if (parseListOfSymbols(str) !== null)
    return parseListOfSymbols(str);
  else
    return str;
};
