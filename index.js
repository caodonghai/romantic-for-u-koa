const Koa = require("koa");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const { init: initDB } = require("./db");
const koaRequestProxy = require("./middleware/koaRequestProxy");

// routers
const home = require("./routers/home");
const count = require("./routers/count");
const wishList = require("./routers/wishList");
const user = require("./routers/user");

const app = new Koa();
app
  .use(logger())
  .use(bodyParser())
  .use(koaRequestProxy())
  .use(home.routes())
  .use(home.allowedMethods())
  .use(count.routes())
  .use(count.allowedMethods())
  .use(wishList.routes())
  // .use(wishList.allowedMethods())
  .use(user.routes())
  .use(user.allowedMethods());

const port = process.env.PORT || 80;
async function bootstrap() {
  await initDB();
  app.listen(port, () => {
    console.log("启动成功", port);
  });
}
bootstrap();
