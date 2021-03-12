const path = require('path');
const fs = require('fs');

// Get the working directory of the file executed by node
const appDirectory = fs.realpathSync(process.cwd());

/**
 * Resolve absolute path from relative path
 * @param {string} relativePath relative path
 */
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

// Default module extension
const moduleFileExtensions = ['ts', 'tsx', 'js', 'jsx', 'json'];

/**
 * Resolve module path
 * @param {function} resolveFn resolve function
 * @param {string} filePath file path
 */
function resolveModule(resolveFn, filePath) {
  // Check if the file exists
  const extension = moduleFileExtensions.find((ex) => fs.existsSync(resolveFn(`${filePath}.${ex}`)));

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }
  return resolveFn(`${filePath}.ts`); // default is .ts
}

module.exports = {
  appDist: resolveApp('dist'),
  appDistUmd: resolveApp('dist/umd'),
  appIndex: resolveModule(resolveApp, 'src/index'), // Package entry path
  appNodeModules: resolveApp('node_modules'), // node_modules path
  appSrc: resolveApp('src'),
  appDemo: resolveApp('demo'),
  appDemoIndex: resolveModule(resolveApp, 'demo/index'),
  appDemoHtml: resolveApp('demo/index.html'),
  appPackageJson: resolveApp('package.json'),
  moduleFileExtensions,
};
