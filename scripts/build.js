const argv = require('minimist')(process.argv.slice(2));
const { getPkgDir } = require('./paths');
const { run, error } = require('./helper');

const { name } = argv;

function build(target) {
  if (!target) {
    error('Error: project not specified, maybe you can try like this: --name=qier-player');
    return;
  }
  const pkgDir = getPkgDir(target);

  run(`npx sass ${pkgDir}/src:${pkgDir}/dist/es`);
  run(`npx tsc -p ${pkgDir}/tsconfig.json`);
  run(`npx tsconfig-replace-paths -p ${pkgDir}/tsconfig.json -s ${pkgDir}/src -o ${pkgDir}/dist/es`);
  run(`npx tsccss -o ${pkgDir}/dist/es`);
  run(`npx webpack --config ./scripts/webpack.prod.js --name=${target}`);
}

if (name) build(name);

module.exports = build;
