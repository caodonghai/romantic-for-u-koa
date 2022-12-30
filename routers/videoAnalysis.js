const Router = require("koa-router");
const controllers = require("../controllers/videoAnalysis");

const router = new Router();

// 更新计数
router.get("/api/analysisVideoUrl", controllers.analysisVideoUrl);

module.exports = router;
