const Router = require("koa-router");
const controllers = require("../controllers/user");

const router = new Router();

router.get("/api/userList", controllers.getUserList);

router.get("/api/loginWithUserName", controllers.loginWithUserName);

module.exports = router;
