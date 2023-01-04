const Router = require("koa-router");
const controllers = require("../controllers/countdownDays");

const router = new Router();

// 获取列表
router.get("/api/countdownDays/list", controllers.countdownDaysList);

// 详情
router.get("/api/countdownDays/:id/detail", controllers.countdownDaysById);

// 用户下的数据列表
router.get("/api/countdownDays/listByUserName", controllers.countdownDaysByUserName);

// 创建
router.post("/api/countdownDays/create", controllers.createCountdownDay);

// 更新
router.post("/api/countdownDays/:id/update", controllers.updateCountdownDay);

// 删除
router.post("/api/countdownDays/:id/delete", controllers.deleteCountdownDay);

module.exports = router;
