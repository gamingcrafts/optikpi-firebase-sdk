const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "production",
  output: {
    filename: "optikpi-tracker.js",
    path: path.resolve(__dirname, "dist"),
    library: "optikpi",
    libraryTarget: "var",
  },
};
