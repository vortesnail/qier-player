const path = require('path');

const PROJECT_PATH = path.resolve(__dirname, '../');

// Dev server host and port
const SERVER_HOST = 'localhost';
const SERVER_PORT = 8888;

// Whether to enable bundle package analysis
const shouldOpenAnalyzer = false;
const ANALYZER_HOST = 'localhost';
const ANALYZER_PORT = '7777';

module.exports = {
  PROJECT_PATH,
  SERVER_HOST,
  SERVER_PORT,
  shouldOpenAnalyzer,
  ANALYZER_HOST,
  ANALYZER_PORT,
};
