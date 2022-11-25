const Router = require("koa-router");
const controllers = require("../controllers/count");

const router = new Router();

// 获取计数
router.get("/api/count", controllers.getCount);

// 更新计数
router.post("/api/count", controllers.updateCount);

module.exports = router;
