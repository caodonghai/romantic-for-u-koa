const Router = require("koa-router");
const controllers = require("../controllers/wishList");

const router = new Router();

// 获取愿望列表
router.get("/api/wish/wishList", controllers.wishList);

router.get("/api/wish/wishListById", controllers.wishListById);

router.get("/api/wish/wishListByUserName", controllers.wishListByUserName);

// 创建愿望
router.post("/api/wish/createWish", controllers.createWish);

// 更新愿望
router.post("/api/wish/:id/updateWish", controllers.updateWish);

// 完成愿望
router.post("/api/wish/:id/completeWish", controllers.completeWish);

// 删除愿望
router.post("/api/wish/:id/deleteWish", controllers.deleteWish);

// 获取愿望详情
router.get("/api/wish/:id/wishDetail", controllers.wishDetail);

module.exports = router;
