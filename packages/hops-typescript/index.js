const path = require("path");

module.exports = {
  buildConfig: path.join(__dirname, "./build.js"),
  developConfig: path.join(__dirname, "./develop.js"),
  nodeConfig: path.join(__dirname, "./node.js")
};
