module.exports.parse = (str) => {
  switch (str) {
    case '#t':
      return true;
    case '#f':
      return false;
    default:
      return str;
  }
};
