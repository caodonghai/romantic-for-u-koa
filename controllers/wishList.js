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
  const { params } = ctx;
  const { id = "" } = params;
  const result = WishList.findAll({
    where: {
      id,
    },
  });

  ctx.body = {
    code: 200,
    data: result,
  };
};

exports.wishListByUserName = async (ctx) => {
  let req_query = ctx.request.query;
  let userName = req_query.userName;
  console.log({ userName, req_query });
  const result = WishList.findAll({
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

  const { wishTitle, wishDesc, userName, plannedTime, createdAt, updatedAt } =
    body;

  await WishList.create({
    wishTitle,
    wishDesc,
    userName,
    plannedTime,
    createdAt,
    updatedAt,
  });

  ctx.body = {
    code: 200,
    data: true,
  };
};

exports.updateWish = async (ctx) => {
  const id = ctx.session.id;
  const { request } = ctx;
  const { wishTitle, wishDesc, userName, plannedTime } = request.body;
  const current = WishList.findAll({
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
  const id = ctx.session.id;
  const { request } = ctx;
  const { type } = request.body;
  const current = WishList.findAll({
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
  const id = ctx.session.id;
  const { request } = ctx;
  const { type } = request.body;
  const current = WishList.findAll({
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

exports.deleteWish = async (ctx) => {
  const id = ctx.session.id;
  const { request } = ctx;
  const { type } = request.body;
  const current = WishList.findAll({
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
  const id = ctx.session.id;
  const current = WishList.findAll({
    where: {
      id,
    },
  });

  ctx.body = {
    code: 200,
    data: current,
  };
};
