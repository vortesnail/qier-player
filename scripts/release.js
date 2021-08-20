const { prompt } = require('enquirer');
const fs = require('fs-extra');
const path = require('path');
const semver = require('semver');
const { run, info, error, warn, success } = require('./helper');
const { getPkgDir } = require('./paths');
const pkg = require('../package.json');
const build = require('./build');

const pkgsDir = getPkgDir();

async function release() {
  info(`\nCurrent Version v${pkg.version}\n`);

  const { inc } = await prompt({
    type: 'select',
    name: 'inc',
    message: 'Pick a version number to increment:',
    choices: ['patch', 'minor', 'major'],
  });

  const version = semver.inc(pkg.version, inc);
  if (!semver.valid(version)) {
    error(`The version number ${version} is not legal.`);
    return;
  }

  const { confirm } = await prompt({
    type: 'confirm',
    name: 'confirm',
    message: `Releasing v${version}. Confirm?`,
  });

  if (!confirm) return;

  warn('\nYou must ensure that the qier-player has been built, otherwise the other packages will lint with errors.');
  warn('\nYou can excute "yarn build:qier-player" first.');

  info('\nRunning lint...');
  run('yarn lint');

  info('\nUpdating versions...');
  updateVersions(version);

  info('\nBuilding all packages...');
  buildPackages();

  run('yarn changelog');

  info('\nFinally, publishing packages!');
  publishPackages();

  info('\nNow you might want to push the code to the github remote repository ^_^');
  run('git add -A');
  run(`git commit -m v${version}`);
  run(`git tag v${version}`);
  run(`git push origin refs/tags/v${version}`);
  run('git push');
  run(`git tag -d v${version}`);

  success('\nCongratulation! Release success.\n');
}

function getValidPkgDirs() {
  return fs.readdirSync(pkgsDir).filter((dir) => {
    try {
      return !require(path.resolve(pkgsDir, dir, 'package.json')).private;
    } catch (e) {
      error(e.message);
      return false;
    }
  });
}

function updateVersions(version) {
  getValidPkgDirs().forEach((dir) => {
    const f = path.resolve(pkgsDir, dir, 'package.json');
    const pkgInfo = require(f);
    pkgInfo.version = version;
    if (pkgInfo.peerDependencies) {
      Object.keys(pkgInfo.peerDependencies).forEach((pd) => {
        if (pd === 'qier-player') pkgInfo.peerDependencies[pd] = version;
      });
    }
    fs.writeJsonSync(f, pkgInfo, { spaces: 2 });
  });
  pkg.version = version;
  fs.writeJsonSync(path.resolve(__dirname, '..', 'package.json'), pkg, { spaces: 2 });
}

function buildPackages() {
  getValidPkgDirs().forEach((dir) => build(dir));
}

function publishPackages() {
  getValidPkgDirs().forEach((dir) => {
    info(`\nPublishing ${dir}...\n`);
    run('npm publish', { cwd: path.resolve(pkgsDir, dir) });
  });
}

release();
