const Router = require("koa-router");
const controllers = require("../controllers/countdownDays");

const router = new Router();

// 获取列表
router.get("/api/wish/countdownDaysList", controllers.countdownDaysList);

// 详情
router.get("/api/wish/:id/countdownDaysById", controllers.countdownDaysById);

// 用户下的数据列表
router.get("/api/wish/countdownDaysByUserName", controllers.countdownDaysByUserName);

// 创建
router.post("/api/wish/createCountdownDay", controllers.createCountdownDay);

// 更新
router.post("/api/wish/:id/updateCountdownDay", controllers.updateCountdownDay);

// 删除
router.post("/api/wish/:id/deleteCountdownDay", controllers.deleteCountdownDay);

module.exports = router;
