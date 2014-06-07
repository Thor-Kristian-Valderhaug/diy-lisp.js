function isBoolean(str) {
  return str === '#t' || str === '#f';
}

function parseBoolean(str) {
  switch (str) {
    case '#t':
      return true;
    case '#f':
      return false;
  }
}

function isInteger(str) {
  return isNaN(parseInt(str)) === false;
}

function parseInteger(str) {
  return parseInt(str);
}

module.exports.parse = (str) => {
  if (isBoolean(str) === true)
    return parseBoolean(str);
  else if (isInteger(str) === true)
    return parseInteger(str);
  else
    return str;
};
