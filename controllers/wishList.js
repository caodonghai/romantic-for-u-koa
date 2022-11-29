const { WishList } = require("../db");

/**
 * 获取文件
 */
exports.wishList = async (ctx) => {
  const result = await WishList.findAndCountAll();

  ctx.body = {
    code: 200,
    data: result,
  };
};

exports.wishListById = async (ctx) => {
  let req_query = ctx.request.query;
  let id = req_query.id;
  const result = await WishList.findByPk(id);

  ctx.body = {
    code: 200,
    data: result,
  };
};

exports.wishListByUserName = async (ctx) => {
  let req_query = ctx.request.query;
  let userName = req_query.userName;
  const result = await WishList.findAndCountAll({
    where: {
      userName: userName,
    },
  });

  ctx.body = {
    code: 200,
    data: result,
  };
};

exports.createWish = async (ctx) => {
  const { request } = ctx;
  const { body = {} } = request;
  console.log({request, body})

  const { wishTitle, wishDesc, userName, plannedTime } = body;

  await WishList.create({
    wishTitle,
    wishDesc,
    userName,
    plannedTime,
  });

  ctx.body = {
    code: 200,
    data: true,
  };
};

exports.updateWish = async (ctx) => {
  const { request } = ctx;
  let req_query = request.query;
  let id = req_query.id;
  const { wishTitle, wishDesc, userName, plannedTime } = request.body;
  const current = await WishList.findAll({
    where: {
      id,
    },
  });

  await current.update({ wishTitle, wishDesc, userName, plannedTime });

  ctx.body = {
    code: 200,
    data: true,
  };
};

exports.completeWish = async (ctx) => {
  const { request } = ctx;
  let req_query = request.query;
  let id = req_query.id;
  const { type } = request.body;
  const current = await WishList.findAll({
    where: {
      id,
    },
  });

  await current.update({ type });

  ctx.body = {
    code: 200,
    data: true,
  };
};

exports.deleteWish = async (ctx) => {
  const { request } = ctx;
  let req_query = request.query;
  let id = req_query.id;
  const current = await WishList.findAll({
    where: {
      id,
    },
  });

  await current.destroy();

  ctx.body = {
    code: 200,
    data: true,
  };
};

exports.wishDetail = async (ctx) => {
  const { request } = ctx;
  let req_query = request.query;
  let id = req_query.id;
  const current = await WishList.findAll({
    where: {
      id,
    },
  });

  ctx.body = {
    code: 200,
    data: current,
  };
};
