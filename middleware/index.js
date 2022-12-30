const koaRequestProxy = require("./koaRequestProxy");
const loginCheck = require("./loginCheck");

module.exports = (app) => {
    app
    .use(loginCheck())
    .use(koaRequestProxy())
};