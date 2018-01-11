const baseHopsConfig = require("hops-build-config/configs/node");
const merge = require("webpack-merge");
const typeScriptLoader = require("./typescript-loader");

module.exports = merge.strategy({
  "module.rules": "prepend"
})(baseHopsConfig, typeScriptLoader);
