const path = require('path');



module.exports = {
  mode: 'development',
  watch: true,
  entry:  path.resolve(__dirname, 'client', 'src', 'index.jsx'),
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'client', 'dist'),
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