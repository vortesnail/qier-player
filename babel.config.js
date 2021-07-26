module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: { chrome: '58', ie: '11' },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
      },
    ],
  ],
};
