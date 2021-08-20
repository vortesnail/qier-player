const execa = require('execa');
const chalk = require('chalk');

function run(script, opts) {
  return execa.commandSync(script, { stdio: 'inherit', ...opts }).stdout;
}

function error(s) {
  console.log(chalk.red(s));
}

function success(s) {
  console.log(chalk.green(s));
}

function info(s) {
  console.log(chalk.blue(s));
}

function warn(s) {
  console.log(chalk.yellow(s));
}

module.exports = { run, error, success, info, warn };
