const homePage = fs.readFileSync(
  path.join(__dirname, "./viewsindex.html"),
  "utf-8"
);

console.log({ __dirname, homePage });

/**
 * 获取文件
 */
exports.getHomepage = async (ctx) => {
  ctx.body = homePage;
};

exports.getOpenId = async (ctx) => {
  if (ctx.request.headers["x-wx-source"]) {
    ctx.body = ctx.request.headers["x-wx-openid"];
  }
};
