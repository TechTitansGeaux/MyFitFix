const path = require('path');

const dist = path.join(__dirname, '/client/dist');

module.exports = {
  entry: './client/src/index.jsx',
  output: {
    filename: 'build.js',
    path: dist,
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],

      },
    ],
  },
};