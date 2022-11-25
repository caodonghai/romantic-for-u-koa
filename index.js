const Koa = require("koa");
const Router = require("koa-router");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const fs = require("fs");
const path = require("path");
const koaRequest = require("koa2-request");
const { init: initDB, Counter } = require("./db");
const koaRequestProxy = require("./middleware/koaRequestProxy");
const { log } = require("console");

const router = new Router();

const homePage = fs.readFileSync(path.join(__dirname, "index.html"), "utf-8");

// 首页
router.get("/", async (ctx) => {
  ctx.body = homePage;
});

// 更新计数
router.post("/api/count", async (ctx) => {
  const { request } = ctx;
  const { action } = request.body;
  if (action === "inc") {
    await Counter.create();
  } else if (action === "clear") {
    await Counter.destroy({
      truncate: true,
    });
  }

  ctx.body = {
    code: 200,
    data: await Counter.count(),
  };
});

// 获取计数
router.get("/api/count", async (ctx) => {
  const result = await Counter.count();

  ctx.body = {
    code: 200,
    data: result,
  };
});

// 小程序调用，获取微信 Open ID
router.get("/api/wx_openid", async (ctx) => {
  if (ctx.request.headers["x-wx-source"]) {
    ctx.body = ctx.request.headers["x-wx-openid"];
  }
});

const app = new Koa();
app
  .use(logger())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
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
        host: "rap2api.taobao.org/app/mock/308003/GET", // 多代理，nest地址代理到localhost:3000
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
