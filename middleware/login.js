const { User } = require("../db");

module.exports = () => {
  return async (ctx, next) => {
    // 使用
    let { url, header } = ctx;
    const {userName, openId} = header;
    const decodeUserName = decodeURIComponent(userName)
    if(!decodeUserName) {
        ctx.body = {
            code: 302,
            Locatioin: '/pages/login/index'
        };
    } else {
        await isLoginWithUserName(decodeUserName, ctx)
    }

    return await next();
  };
};

async function isLoginWithUserName(userName, ctx) {
console.log({userName, ctx})
  const result = await User.findOne({
    where: {
      userName: userName,
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