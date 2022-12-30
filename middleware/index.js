const loginCheck = require("./loginCheck");
const koaRequestProxy = require("./koaRequestProxy");

module.exports = {
  loadMiddleWares: (app) => {
    app
    .use(loginCheck())
    .use(koaRequestProxy())
  },
};
