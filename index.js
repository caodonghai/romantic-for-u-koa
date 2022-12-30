const Koa = require("koa");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const { init: initDB } = require("./db");

// middleWares
const middleWares = require("./middleware/index");

// routers
const routers = require("./routers/index");


const app = new Koa();
app
  .use(logger())
  .use(bodyParser())
  
// 挂载自定义中间件
middleWares.loadMiddleWares(app);

// 挂载路由
routers.loadRouters(app);

const port = process.env.PORT || 80;
async function bootstrap() {
  await initDB();
  app.listen(port, () => {
    console.log("启动成功", port);
  });
}
bootstrap();
