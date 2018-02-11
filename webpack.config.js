const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
// create multiple instances
const extractAdminCSS = new ExtractTextPlugin('admin-style.css');
const extractMainCSS = new ExtractTextPlugin('style.css');
const extractMceCSS = new ExtractTextPlugin('mce-style.css');

// const extractCommons = new webpack.optimize.CommonsChunkPlugin({
//   name: 'commons',
//   filename: 'commons.js'
// });

const config = {
  entry: {
    app: './public/javascripts/scripts.js',
    admin: './public/javascripts/admin.js',
    adminvendors: './public/javascripts/adminvendors.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './public/dist')
  },
  module: {
    rules: [
      {
        test: /\.admin.scss$/,
        use: extractAdminCSS.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.public.scss$/,
        use: extractMainCSS.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|gif)$/,
        loader: 'file-loader?name=/fonts/[name].[ext]'
      },
      {
        test: /\.css$/,
        use: extractAdminCSS.extract({
          use: ['css-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['env'] } // this is one way of passing options
          }
        ]
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                declaration: false,
                target: 'es5',
                module: 'commonjs'
              },
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: require.resolve('tinymce/tinymce'),
        loaders: [
          'imports-loader?this=>window',
          'exports-loader?window.tinymce'
        ]
      },
      {
        test: /tinymce\/(themes|plugins)\//,
        loaders: ['imports-loader?this=>window']
      }
    ]
  },
  plugins: [
    extractMainCSS,
    extractAdminCSS,
    new webpack.optimize.CommonsChunkPlugin({
      name: 'adminvendors',
      minChunks: Infinity
    })
  ],
  watch: true
};

process.noDeprecation = true;

module.exports = config;
