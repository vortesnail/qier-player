/**
 * Trans to big camel name.
 * @param {string} name a name string
 * @param {string} symbol Symbol to be converted
 */
function dashToBigCamel(name, symbol) {
  if (typeof name !== 'string') {
    throw new TypeError('The incoming `name` is not a string...');
  }

  const result = name.split(symbol).reduce((str, cur) => {
    let res = str;
    if (/\w/.test(cur)) {
      res += cur[0].toUpperCase() + (cur.slice(1) ? cur.slice(1).toLowerCase() : '');
    }
    return res;
  }, '');

  return result;
}

module.exports = {
  dashToBigCamel,
};
