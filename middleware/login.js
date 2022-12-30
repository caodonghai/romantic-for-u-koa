const { User } = require("../db");
const noCkeckLogin = [
    '/api/loginWithUserName',
    '/rap2api/'
]

module.exports = () => {
  return async (ctx, next) => {
    // 使用
    let { url, header } = ctx;
    if(isNoNeedCheckLogin(url)) {
        return await next();
    }
    const {userName, openId} = header;
    if(!userName) {
        ctx.body = {
            code: 302,
            Location: '/pages/login/index',
            data: {},
        };
        return
    } else if(!isLoginWithUserName(userName, ctx)) {
        ctx.body = {
            code: 502,
            errMsg: "用户不存在",
            data: {},
        };
        return
    }
    return await next();
  };
};

function isNoNeedCheckLogin(url) {
    return noCkeckLogin.some(item => url.startsWith(item))
}

async function isLoginWithUserName(userName, ctx) {
    const decodeUserName = decodeURIComponent(userName)
    console.log({userName, decodeUserName, ctx})
  const result = await User.findOne({
    where: {
      userName: decodeUserName,
    },
  });
  if (result && Object.keys(result).length) {
      return true
  }
  return false
};