const { Wish } = require("../db");

/**
 * 获取文件
 */
exports.wishList = async (ctx) => {
  const result = await Wish.findAndCountAll();

  ctx.body = {
    code: 200,
    data: result,
  };
};

exports.createWish = async (ctx) => {
  const { request } = ctx;
  const { title, desc, useName, plannedTime } = request.body;

  await Wish.create({ title, desc, useName, plannedTime });

  ctx.body = {
    code: 200,
    data: true,
  };
};

exports.updateWish = async (ctx) => {
  const id = ctx.session.id;
  const { request } = ctx;
  const { title, desc, useName, plannedTime } = request.body;
  const current = Wish.findAll({
    where: {
      id,
    },
  });

  await current.update({ title, desc, useName, plannedTime });

  ctx.body = {
    code: 200,
    data: true,
  };
};

exports.completeWish = async (ctx) => {
  const id = ctx.session.id;
  const { request } = ctx;
  const { type } = request.body;
  const current = Wish.findAll({
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
  const current = Wish.findAll({
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
  const current = Wish.findAll({
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
  const current = Wish.findAll({
    where: {
      id,
    },
  });

  ctx.body = {
    code: 200,
    data: current,
  };
};
