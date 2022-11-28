const { User } = require("../db");

/**
 * 获取文件
 */
exports.getUserList = async (ctx) => {
  const result = await User.findAndCountAll();

  ctx.body = {
    code: 200,
    data: result,
  };
};
