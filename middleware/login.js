const { User } = require("../db");

module.exports = () => {
  return async (ctx, next) => {
    // 使用
    let { url, header } = ctx;
    const {userName, openId} = header;
    if(!userName) {
        ctx.body = {
            code: 302,
            Locatioin: '/pages/login/index'
        };
    } else {
        await isLoginWithUserName(userName, ctx)
    }

    return await next();
  };
};

async function isLoginWithUserName(userName, ctx) {
    const decodeUserName = decodeURIComponent(userName)
    console.log({userName, decodeUserName, ctx})
  const result = await User.findOne({
    where: {
      userName: decodeUserName,
    },
  });

  if (!result || !Object.keys(result).length) {
    ctx.body = {
      code: 502,
      errMsg: "用户不存在",
      data: {},
    };
  }
};