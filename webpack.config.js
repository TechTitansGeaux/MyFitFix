const path = require('path');

module.exports = {
  entry:  path.resolve(__dirname, 'client', 'src', 'index.jsx'),
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist'),
  },
};