module.exports.parse = (str) => {
  switch (str) {
    case '#t':
      return true;
    case '#f':
      return false;
    default:
      if (isNaN(parseInt(str)) === true)
        return str;
      else
        return parseInt(str);
  }
};
