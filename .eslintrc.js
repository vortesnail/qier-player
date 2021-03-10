const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:unicorn/recommended',
    'plugin:promise/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'unicorn', 'promise', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
      },
      typescript: {},
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
      },
    ],
    'import/no-extraneous-dependencies': [ERROR, { devDependencies: true }],
    'import/prefer-default-export': OFF,
    'import/no-unresolved': ERROR,

    'unicorn/better-regex': ERROR,
    'unicorn/prevent-abbreviations': OFF,
    'unicorn/filename-case': [
      ERROR,
      {
        cases: {
          // 中划线
          kebabCase: true,
          // 小驼峰
          camelCase: true,
          // 下划线
          snakeCase: false,
          // 大驼峰
          pascalCase: true,
        },
      },
    ],
    'unicorn/no-array-instanceof': WARN,
    'unicorn/no-for-loop': WARN, // 使用 for of 和 .entries 代替传统的 for 循环
    'unicorn/prefer-add-event-listener': [
      ERROR,
      {
        excludedPackages: ['koa', 'sax'],
      },
    ],
    'unicorn/prefer-query-selector': ERROR,
    'unicorn/no-null': OFF,

    '@typescript-eslint/no-useless-constructor': ERROR,
    '@typescript-eslint/no-empty-function': WARN,
    '@typescript-eslint/no-var-requires': OFF,
    '@typescript-eslint/explicit-function-return-type': OFF,
    '@typescript-eslint/explicit-module-boundary-types': OFF,
    '@typescript-eslint/no-explicit-any': OFF,

    'react/jsx-filename-extension': [ERROR, { extensions: ['.tsx', 'ts', '.jsx', 'js'] }],
    'react/jsx-indent-props': [ERROR, 2],
    'react/jsx-indent': [ERROR, 2],
    'react/jsx-one-expression-per-line': OFF,
    'react/destructuring-assignment': OFF,
    'react/state-in-constructor': OFF,
    'react/jsx-props-no-spreading': OFF,
    'react/prop-types': OFF,

    'jsx-a11y/click-events-have-key-events': OFF,
    'jsx-a11y/no-noninteractive-element-interactions': OFF,

    'lines-between-class-members': [ERROR, 'always'],
    // indent: [ERROR, 2, { SwitchCase: 1 }],
    'linebreak-style': [ERROR, 'unix'],
    quotes: [ERROR, 'single'],
    semi: [ERROR, 'always'],
    'no-unused-expressions': WARN,
    'no-plusplus': OFF,
    'no-console': OFF,
    'class-methods-use-this': ERROR,
    'jsx-quotes': [ERROR, 'prefer-single'],
    'global-require': OFF,
  },
};
