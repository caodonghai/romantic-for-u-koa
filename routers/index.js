const home = require("./home");
const count = require("./count");
const wishList = require("./wishList");
const user = require("./user");
const videoAnalysis = require("./videoAnalysis");

module.exports = {
  loadMiddleWares: (app) => {
    app
    .use(home.routes())
    .use(home.allowedMethods())
    .use(count.routes())
    .use(count.allowedMethods())
    .use(wishList.routes())
    .use(wishList.allowedMethods())
    .use(user.routes())
    .use(user.allowedMethods())
    .use(videoAnalysis.routes())
    .use(videoAnalysis.allowedMethods());
  },
};