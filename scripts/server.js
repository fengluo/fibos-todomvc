const path = require("path");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const serve = require("koa-static");
const webpack = require("webpack");
const devWare = require("koa-webpack");

const config = require("./webpack.dev.js");

const app = new Koa();
const port = 4000;
app
  .use(bodyParser())
  .use(serve(path.join(__dirname, "../dist")))
  .use(
    devWare({
      config,
      dev: { publicPath: "/dist/" } /*, hot:{}*/
    })
  )

  .listen(port, () => {
    console.log("Server Started http://localhost:" + port.toString());
  });
