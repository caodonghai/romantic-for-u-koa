const Router = require("koa-router");
const controllers = require("../controllers/wishList");

const router = new Router();

// 获取愿望列表
router.get("/api/wishList", controllers.wishList);

router.get("/api/wishListById", controllers.wishListById);

router.get("/api/wishListByUserName", controllers.wishListByUserName);

// 创建愿望
router.post("/api/createWish", controllers.createWish);

// 更新愿望
router.post("/api/updateWish", controllers.updateWish);

// 完成愿望
router.post("/api/completeWish", controllers.completeWish);

// 删除愿望
router.post("/api/deleteWish", controllers.deleteWish);

// 获取愿望详情
router.post("/api/wish:id", controllers.wishDetail);

module.exports = router;
