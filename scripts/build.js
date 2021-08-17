const execa = require('execa');
const chalk = require('chalk');
const argv = require('minimist')(process.argv.slice(2));
const { getPkgDir } = require('./paths');

const { name } = argv;

function run(script, opts) {
  return execa.commandSync(script, { stdio: 'inherit', ...opts }).stdout;
}

function build(target) {
  if (!target) {
    console.error(chalk.red('Error: project not specified, maybe you can try like this: --name=qier-player'));
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
