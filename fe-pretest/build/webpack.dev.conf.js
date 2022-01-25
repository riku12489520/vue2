process.env.NODE_ENV = "development";

const { merge } = require("webpack-merge");
const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const baseConfig = require("./webpack.base.conf");
const chokidar = require("chokidar");
const baseWebpackConfig = baseConfig.baseWebpackConfig(process);
const _path = baseConfig._path;
const ip = require("ip").address();

const [, , ...processParams] = process.argv;
const args = Object.assign(
  {
    port: require("../sandbox.config.json").container.port,
    host: "0.0.0.0"
  },
  require("yargs")(processParams).argv
);

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: "development",
  devServer: {
    disableHostCheck: true,
    contentBase: "_path.src",
    hot: true,
    inline: true,
    publicPath: "/",
    public: "0.0.0.0:0",
    watchContentBase: false,
    compress: true,
    progress: false,
    open: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization"
    },
    before(app, server) {
      chokidar
        .watch([_path.src + "/templates/**/*.html"])
        .on("all", function () {
          server.sockWrite(server.sockets, "content-changed");
        });
    }
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: ["node_modules/**/*", _path.dist, _path.build]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
    // new webpack.NamedModulesPlugin()
  ],
  watch: true
});

const server = new webpackDevServer(
  webpack(devWebpackConfig),
  devWebpackConfig.devServer
);

new Promise(async (resolve) => {
  const getPort = require("get-port");
  await getPort({
    host: args.host,
    port: getPort.makeRange(args.port, args.port + 10)
  }).then((res) => {
    resolve(res);
  });
}).then((port) => {
  args.port = port;
  server.listen(args.port, args.host, () => {
    const chalk = require("chalk");
    const log = require("./log");
    console.log();
    log(`Project is running at ` + chalk.underline.bold(`${ip}:${args.port}`));
    log(`Manually HTML Inject`);
    console.log(
      chalk.grey(
        `================================================================================\n`,
        `<link rel="stylesheet" type="text/css" href="http://${ip}:${args.port}/assets/bundle.css"/>\n`,
        `<script src="http://${ip}:${args.port}/assets/bundle.js"></script>\n`,
        `<script src="http://${ip}:${args.port}/webpack-dev-server.js"></script>\n`,
        `================================================================================`
      )
    );
  });
});
