const path = require('path');

module.exports = {
  entry: '.client/src/index.jsx',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist'),
  },
};