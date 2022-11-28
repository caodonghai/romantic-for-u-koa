const { User } = require("../db");

/**
 * 获取文件
 */
exports.getUserList = async (ctx) => {
  console.log({ctx})
  const result = await User.findAndCountAll();

  console.log({ctx, result})

  ctx.body = {
    code: 200,
    data: result,
  };
};
