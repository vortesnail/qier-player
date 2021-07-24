const path = require('path');

function getPkgDir(target) {
  if (target) {
    return path.resolve(__dirname, '..', 'packages', target);
  }
  return path.resolve(__dirname, '..', 'packages');
}

function getFixturesDir(target) {
  if (target) {
    return path.resolve(__dirname, '..', 'fixtures', target);
  }
  return path.resolve(__dirname, '..', 'fixtures');
}

module.exports = { getPkgDir, getFixturesDir };
