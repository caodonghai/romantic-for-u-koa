const loginCheck = require("./loginCheck");
const koaRequestProxy = require("./koaRequestProxy");

module.exports = (app) => {
    app
    .use(loginCheck())
    .use(koaRequestProxy())
};