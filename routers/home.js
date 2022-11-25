const Router = require("koa-router");
const controller = require("../controllers/home");

const router = new Router();

// 首页
router.get("/", controller.getHomePage);

// 小程序调用，获取微信 Open ID
router.get("/api/wx_openid", controller.getOpenId);

module.exports = router;
