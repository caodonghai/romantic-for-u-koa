const koaRequest = require("koa2-request");
const qs = require("qs");

module.exports = () => {
  return async (ctx, next) => {
    // 使用
    let { url } = ctx;
    if (url.startsWith("/rap2api")) {
      const data = await requestProxy(
        {
          host: "rap2api.taobao.org/app/mock/308003", // 多代理，nest地址代理到localhost:3000
        },
        ctx
      );
      // 这里可以做一些请求之后需要处理的事情
      ctx.body = data;
      console.log({ url, data });
    }

    return await next();
    // return next();
  };
};

function requestProxy(params = {}) {
  let reqParams = Object.assign({}, params, formatReqParams(ctx, params));
  if (reqParams.method.toUpperCase() !== "GET") {
    reqParams.data = params.data || ctx.request.body;
  }
  // application/x-www-form-urlencoded形式转发参数乱码修改
  if (qs.stringify(ctx.request.body)) {
    reqParams = { ...reqParams, data: qs.stringify(ctx.request.body) };
  }

  delete reqParams.headers.host;
  return koaRequest(reqParams)
    .then((res) => {
      const { body } = res;
      return body;
    })
    .catch((err) => {
      // console.log(err)
      return err;
    });
}

function proxy(ctx, opts) {
  ctx.koaRequestProxy = (params = {}) => {
    params = Object.assign({}, { host: opts.apiHost || "" }, params);
    let reqParams = Object.assign({}, params, formatReqParams(ctx, params));
    if (reqParams.method.toUpperCase() !== "GET") {
      reqParams.data = params.data || ctx.request.body;
    }
    // application/x-www-form-urlencoded形式转发参数乱码修改
    if (qs.stringify(ctx.request.body)) {
      reqParams = { ...reqParams, data: qs.stringify(ctx.request.body) };
    }

    delete reqParams.headers.host;
    return koaRequest(reqParams)
      .then((res) => {
        const { body } = res;
        return body;
      })
      .catch((err) => {
        // console.log(err)
        return err;
      });
  };
}
function setResCookies(ctx, headers) {
  const resCookies = headers["set-cookie"];

  if (
    !headers ||
    !resCookies ||
    !resCookies.length ||
    resCookies.length <= 0 ||
    !resCookies[0]
  ) {
    return;
  }

  ctx.res._headers = ctx.res._headers || {};
  ctx.res._headerNames = ctx.res._headerNames || {};

  ctx.res._headers["set-cookie"] = ctx.res._headers["set-cookie"] || [];
  ctx.res._headers["set-cookie"] =
    ctx.res._headers["set-cookie"].concat &&
    ctx.res._headers["set-cookie"].concat(resCookies);

  ctx.res._headerNames["set-cookie"] = "set-cookie";
}

/**
 * @param  {} ctx koa当前执行上下文
 * @param  {} params 请求参数
 */
function formatReqParams(ctx, params) {
  let { url, method, headers } = ctx;
  const { host } = params;

  url = (params.url || url).replace("/rap2api", "/api");
  method = params.method || method;

  url = `http://${host}/${method}${url}`; // rap2api.taobao.org/app/mock/308003/GET
  console.log({ url, method, params });
  delete params.host;

  return {
    url,
    method,
    headers: {
      "content-type": "application/json",
      charset: "UTF-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Credentials": "true",
      ...headers,
    },
  };
}
