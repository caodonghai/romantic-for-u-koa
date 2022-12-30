const { User } = require("../db");

exports.getUserList = async (ctx) => {
  const result = await User.findAndCountAll();

  ctx.body = {
    code: 200,
    data: result,
  };
};

exports.loginWithUserName = async (ctx) => {
  let req_query = ctx.request.query;
  let userName = req_query.userName;
  const result = await User.findOne({
    where: {
      userName: userName,
    },
  });

  if (result && Object.keys(result).length) {
    ctx.body = {
      code: 200,
      data: result,
    };
  } else {
    ctx.body = {
      code: 502,
      errMsg: "用户不存在",
      data: {},
    };
  }
};
