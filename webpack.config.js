const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './public/javascripts/scripts.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './public/dist')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.js$/
      }
    ]
  },
  plugins: [new ExtractTextPlugin('style.css')],
  watch: true
};