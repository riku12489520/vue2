const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const _path = {
  main: path.resolve(path.join(__dirname, "../")),
  build: path.resolve(path.join(__dirname, "../build/")),
  dist: path.resolve(path.join(__dirname, "../dist/")),
  src: path.resolve(path.join(__dirname, "../src/")),
  buildAssetsFolderName: "assets/",
  publicPath: {
    development: "",
    production: "./"
  }
};

const baseWebpackConfig = function (process) {
  const templates = require("./templates")(_path, process);
  return {
    context: _path.main,
    entry: {
      main: ["./src/index.js"]
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader"
        },
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
                plugins: [["@babel/transform-runtime"]]
              }
            }
          ]
        },
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"]
          }
        },
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/
        },
        {
          test: /\.(css|scss|sass)$/,
          exclude: /node_modules/,
          use: [
            "css-hot-loader",
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
          ]
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename:
          process.env.NODE_ENV === "production"
            ? _path.buildAssetsFolderName + "[name].[hash].css"
            : _path.buildAssetsFolderName + "bundle.css"
      }),
      new webpack.ProvidePlugin({}),
      new StylelintPlugin({
        fix: true
      }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      })
    ].concat(templates),
    output: {
      path: _path.dist,
      filename:
        process.env.NODE_ENV === "production"
          ? _path.buildAssetsFolderName + "[name].[hash].js"
          : _path.buildAssetsFolderName + "bundle.js",
      publicPath: process.env.NODE_ENV === "production" ? "./" : "/"
    },
    devtool: "source-map",
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx", ".vue", ".css", ".scss"],
      alias: {
        "@": _path.src
      }
    }
  };
};

module.exports = { baseWebpackConfig, _path };
