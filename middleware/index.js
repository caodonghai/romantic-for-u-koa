const loginCheck = require("./loginCheck");
const koaRequestProxy = require("./koaRequestProxy");

module.exports = {
  loadRouters: (app) => {
    app
    .use(loginCheck())
    .use(koaRequestProxy())
  },
};