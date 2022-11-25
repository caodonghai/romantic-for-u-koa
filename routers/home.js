const Router = require("koa-router");
const controllers = require("../controllers/home");

const router = new Router();

// 首页
router.get("/", controllers.getHomePage);

// 小程序调用，获取微信 Open ID
router.get("/api/wx_openid", controllers.getOpenId);

module.exports = router;
