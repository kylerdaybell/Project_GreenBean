// babel.config.js
//This file is important to get tests to work for redux
module.exports = {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react',
      '@babel/preset-flow',
    ],
    plugins: [
      'babel-plugin-styled-components',
      '@babel/plugin-proposal-class-properties',
      "@babel/transform-runtime"
    ]
  }
  