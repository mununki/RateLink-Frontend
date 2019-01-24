const withTypescript = require("@zeit/next-typescript");
const withCSS = require("@zeit/next-css");

const prod = process.env.LAMBDA_ENV === "production";

module.exports = withTypescript(
  withCSS({
    assetPrefix: prod ? null : `/${process.env.UP_STAGE}/`
  })
);
