module.exports.parse = (str) => {
  if (str === '#t')
    return true;
  else if (str === '#f')
    return false;
  else
    return str;
}
