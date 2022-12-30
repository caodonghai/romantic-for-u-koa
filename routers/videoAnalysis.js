const Router = require("koa-router");
const controllers = require("../controllers/videoAnalysis");

const router = new Router();

// 视频解析
router.get("/api/analysisVideoUrl", controllers.analysisVideoUrl);

module.exports = router;
