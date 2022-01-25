const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlReplaceWebpackPlugin = require("html-replace-webpack-plugin");

module.exports = function (_path, process) {
  const replaceKey = [
    {
      pattern: "<!-- publicPath -->",
      replacement: _path.publicPath[process.env.NODE_ENV]
    }
  ];

  const templatesPath = path.join(_path.src, "/templates/");
  const searchRecursive = function (dir, pattern) {
    var results = [];
    fs.readdirSync(dir).forEach(function (dirInner) {
      dirInner = path.resolve(dir, dirInner);
      var stat = fs.statSync(dirInner);
      if (stat.isDirectory()) {
        results = results.concat(searchRecursive(dirInner, pattern));
      }
      if (stat.isFile() && dirInner.endsWith(pattern)) {
        results.push(dirInner);
      }
    });
    return results;
  };

  console.clear();
  const templatesPlugin = searchRecursive(templatesPath, ".html").map((e) => {
    const e_m = path.resolve(e);
    const templatesPath_m = path.resolve(templatesPath);
    return new HtmlWebpackPlugin({
      template: e,
      filename: e_m.replace(templatesPath_m, "").substring(1),
      inject: true,
      minify: false
    });
  });

  const replacementPlugin = new HtmlReplaceWebpackPlugin(replaceKey);

  return [].concat(templatesPlugin).concat(replacementPlugin);
};
