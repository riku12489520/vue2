const jsonServer = require("json-server");
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const ip = require("ip").address();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.url === "/ajaxserver" && req.method === "POST") {
    const reqBody = req.body;
    const oilMock = require("./data.mock");
    const found = oilMock.find((e) => {
      return (
        e.pcmId + "" === reqBody.pcm_id + "" &&
        e.deviceId + "" === reqBody.dev_id + ""
      );
    });
    if (found) {
      return res.jsonp(found.value());
    } else {
      res.jsonp({ status: 0, msg: "No matched pmc_id or dev_id" });
    }
    // console.log(reqBody.pcm_id)
    res.jsonp({ 123: 123 });
  } else {
    res.jsonp({});
  }
  next();
});

const [, , ...processParams] = process.argv;
const args = Object.assign(
  {
    port: 8081,
    host: "0.0.0.0"
  },
  require("yargs")(processParams).argv
);

server.listen(args.port, () => {
  console.log(`Mocking JSON server is running on http://${""}:${args.port}/`);
});
