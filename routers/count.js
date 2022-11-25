const Router = require("koa-router");
const controller = require("../controllers/count");

const router = new Router();

// 获取计数
router.get("/api/count", controller.getCount);

// 更新计数
router.post("/api/count", controller.updateCount);

module.exports = router;
