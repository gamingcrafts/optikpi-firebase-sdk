const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "production",
  output: {
    filename: "tracker.js",
    path: path.resolve(__dirname, "dist"),
    library: "optikpi",
    libraryTarget: "umd",
  },
};
