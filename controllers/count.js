const { Counter } = require("../db");

/**
 * 获取文件
 */
exports.getCount = async (ctx) => {
  const result = await Counter.count();
  ctx.body = {
    code: 200,
    data: result,
  };
};

exports.updateCount = async (ctx) => {
  const { request } = ctx;
  const { action } = request.body;
  if (action === "inc") {
    await Counter.create();
  } else if (action === "clear") {
    await Counter.destroy({
      truncate: true,
    });
  }

  ctx.body = {
    code: 200,
    data: await Counter.count(),
  };
};
