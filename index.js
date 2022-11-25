const Koa = require("koa");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const { init: initDB } = require("./db");
const koaRequestProxy = require("./middleware/koaRequestProxy");
const routers = require("./routers/index");

console.log({routers})

const app = new Koa();
app
  .use(logger())
  .use(bodyParser())
  .use(...routers.map((item) => item.routes()))
  .use(...routers.map((item) => item.allowedMethods()))
  .use(
    koaRequestProxy({
      apiHost: "rap2api.taobao.org/app/mock/308003/GET", // 全局端口
    })
  )
  .use(async (ctx, next) => {
    // 使用
    let { url } = ctx;
    if (url.startsWith("/rap2api")) {
      const data = await ctx.koaRequestProxy({
        host: "rap2api.taobao.org/app/mock/308003", // 多代理，nest地址代理到localhost:3000
      });
      // 这里可以做一些请求之后需要处理的事情
      ctx.body = data;
      console.log({ url, data });
    }
    await next();
  });

const port = process.env.PORT || 80;
async function bootstrap() {
  await initDB();
  app.listen(port, () => {
    console.log("启动成功", port);
  });
}
bootstrap();
