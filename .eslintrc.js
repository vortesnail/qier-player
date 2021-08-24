const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
      },
      typescript: {
        project: 'packages/*/tsconfig.json',
      },
    },
  },
  rules: {
    'import/extensions': [
      ERROR,
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
      },
    ],
    'import/no-dynamic-require': OFF,
    'import/prefer-default-export': OFF,
    'import/no-extraneous-dependencies': [ERROR, { devDependencies: true }],

    '@typescript-eslint/no-non-null-assertion': OFF,
    '@typescript-eslint/no-unused-vars': WARN,
    '@typescript-eslint/no-explicit-any': OFF,
    '@typescript-eslint/no-var-requires': OFF,
    '@typescript-eslint/ban-types': OFF,
    '@typescript-eslint/explicit-module-boundary-types': OFF,
    'no-unused-vars': OFF,
    'lines-between-class-members': [ERROR, 'always'],
    // indent: [ERROR, 2, { SwitchCase: 1 }],
    'linebreak-style': [ERROR, 'unix'],
    quotes: [ERROR, 'single'],
    semi: [ERROR, 'always'],
    'no-unused-expressions': OFF,
    'no-plusplus': OFF,
    'no-console': WARN,
    'jsx-quotes': [ERROR, 'prefer-double'],
    'global-require': OFF,
    'no-use-before-define': OFF,
    'no-restricted-syntax': OFF,
    'no-continue': OFF,
    'class-methods-use-this': OFF,
    'func-names': OFF,
    'prefer-destructuring': OFF,
    'no-param-reassign': OFF,
    'consistent-return': OFF,
    'no-underscore-dangle': OFF,
  },
};
