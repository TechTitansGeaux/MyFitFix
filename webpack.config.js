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
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }

        }
      }
    ]
  }
};