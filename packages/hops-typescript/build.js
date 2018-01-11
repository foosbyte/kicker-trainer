const baseHopsConfig = require("hops-build-config/configs/build");
const merge = require("webpack-merge");
const typeScriptLoader = require("./typescript-loader");

module.exports = merge.strategy({
  "module.rules": "prepend"
})(baseHopsConfig, typeScriptLoader);
