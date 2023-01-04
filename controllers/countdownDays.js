const { CountdownDays } = require("../db");

/**
 * 获取文件
 */
exports.countdownDaysList = async (ctx, next) => {
  const result = await CountdownDays.findAndCountAll();

  ctx.body = {
    code: 200,
    data: result,
  };
};

exports.countdownDaysById = async (ctx) => {
  const { params } = ctx;
  let id = params.id;
  const result = await CountdownDays.findByPk(id);

  ctx.body = {
    code: 200,
    data: result,
  };
};

exports.countdownDaysByUserName = async (ctx) => {
  let req_query = ctx.request.query;
  let userName = req_query.userName;
  const result = await CountdownDays.findAndCountAll({
    where: {
      userName: userName,
    },
  });

  ctx.body = {
    code: 200,
    data: result,
  };
};

exports.createCountdownDay = async (ctx) => {
  const { request } = ctx;
  const { body = {} } = request;

  const { title, data, isEndTime, repeat, theme } = body;

  await CountdownDays.create({
      title, data, isEndTime, repeat, theme
  });

  ctx.body = {
    code: 200,
    data: true,
  };
};

exports.updateCountdownDay = async (ctx) => {
  const { request } = ctx;
  const { params } = ctx;
  let id = params.id;
  // console.log({ params, request });
  const { title, data, isEndTime, repeat, theme } = request.body;
  const current = await CountdownDays.findByPk(id);

  await current.update({ title, data, isEndTime, repeat, theme });

  ctx.body = {
    code: 200,
    data: true,
  };
};

exports.deleteCountdownDay = async (ctx) => {
  const { params } = ctx;
  let id = params.id;
  const current = await CountdownDays.findByPk(id);

  await current.destroy();

  ctx.body = {
    code: 200,
    data: true,
  };
};
