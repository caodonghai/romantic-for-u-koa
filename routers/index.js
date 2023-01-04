const home = require("./home");
const count = require("./count");
const wishList = require("./wishList");
const user = require("./user");
const videoAnalysis = require("./videoAnalysis");
const countdownDays = require("./countdownDays");

module.exports = {
  loadRouters: (app) => {
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
    .use(videoAnalysis.allowedMethods())
    .use(countdownDays.routes())
    .use(countdownDays.allowedMethods());
  },
};