const Koa = require("koa");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const { init: initDB } = require("./db");
const koaRequestProxy = require("./middleware/koaRequestProxy");
const routers = require("./routers/index");

logger({routers})

const app = new Koa();
app
  .use(logger())
  .use(bodyParser())
  .use(...routers.map((item) => item.routes()))
  .use(...routers.map((item) => item.allowedMethods()))
  .use(koaRequestProxy());

const port = process.env.PORT || 80;
async function bootstrap() {
  await initDB();
  app.listen(port, () => {
    console.log("启动成功", port);
  });
}
bootstrap();
