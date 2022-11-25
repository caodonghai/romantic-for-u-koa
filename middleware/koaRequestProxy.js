const koaRequest = require("koa2-request");

// const auth = async(ctx, next) => {
// 	const {a = ''} = ctx.request.header;
//     //koa封装的请求第三方接口的方法(koa2-request)
//     let result = await koaRequest({
//         url: "http://rap2api.taobao.org/app/mock/308003/GET/api/getLoveKnotData",
//         method: "get",
//         json: true,
//         Headers: {
//             "content-type": "application/json",
//             charset: "UTF-8",
//             "Access-Control-Allow-Origin": "*",
//             "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
//             "Access-Control-Allow-Credentials": "true",
//         },
//     });
//     console.log(JSON.parse(result.body),JSON.parse(result1.body))
//     await next()
// }

module.exports = (opts = {}) => {
  return (ctx, next) => {
    if (!ctx.koaRequestProxy) {
      proxy(ctx, opts);
    }

    return next();
  };
};

function proxy(ctx, opts) {
  ctx.koaRequestProxy = (params = {}) => {
    params = Object.assign({}, { host: opts.apiHost || '' }, params);

    let reqParams = Object.assign({}, params, formatReqParams(ctx, params));
    if (reqParams.method.toUpperCase() !== 'GET') {
      reqParams.data = params.data || ctx.request.body;
    }
    // application/x-www-form-urlencoded形式转发参数乱码修改
    if (qs.stringify(ctx.request.body)) {
      reqParams = { ...reqParams, data: qs.stringify(ctx.request.body) };
    }

    delete reqParams.headers.host;
    return koaRequest(reqParams)
      .then(res => {
        const { data, headers } = res;

        setResCookies(ctx, headers);

        return data;
      })
      .catch(err => {
        // console.log(err)
        return err;
      });
  };
}
function setResCookies(ctx, headers) {
  const resCookies = headers['set-cookie'];

  if (!headers || !resCookies || !resCookies.length || resCookies.length <= 0 || !resCookies[0]) {
    return;
  }

  ctx.res._headers = ctx.res._headers || {};
  ctx.res._headerNames = ctx.res._headerNames || {};

  ctx.res._headers['set-cookie'] = ctx.res._headers['set-cookie'] || [];
  ctx.res._headers['set-cookie'] =
    ctx.res._headers['set-cookie'].concat && ctx.res._headers['set-cookie'].concat(resCookies);

  ctx.res._headerNames['set-cookie'] = 'set-cookie';
}

/**
 * @param  {} ctx koa当前执行上下文
 * @param  {} params 请求参数
 */
function formatReqParams(ctx, params) {
  let { url, method, headers } = ctx;
  const { host } = params;

  url = params.url || url;
  method = params.method || method;

  url = `http://${host}${url}`;
  delete params.host;

  return { url, method, headers: {
    "content-type": "application/json",
    charset: "UTF-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Credentials": "true",
    ...headers
  } };
}