const Router = require("koa-router");
const controllers = require("../controllers/user");

const router = new Router();

// 获取愿望列表
router.get("/api/userList", controllers.getUserList);

module.exports = router;
