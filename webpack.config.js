const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./public/javascripts/scripts.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./public/dist")
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader", "sass-loader"],
          fallback: "style-loader"
        })
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|gif)$/,
        loader: "file-loader?name=/fonts/[name].[ext]"
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader"],
          fallback: "style-loader"
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader",
            options: { presets: ["env"] } // this is one way of passing options
          }
        ]
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: {
                declaration: false,
                target: "es5",
                module: "commonjs"
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
            loader: "html-loader",
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: require.resolve("tinymce/tinymce"),
        loaders: [
          "imports-loader?this=>window",
          "exports-loader?window.tinymce"
        ]
      },
      {
        test: /tinymce\/(themes|plugins)\//,
        loaders: ["imports-loader?this=>window"]
      }
    ]
  },
  plugins: [new ExtractTextPlugin("style.css")],
  watch: true
};

process.noDeprecation = true;
