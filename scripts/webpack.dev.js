var path = require("path");

module.exports = {
  entry: ["./dapp/index.js"],
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "bundle.js"
  },
  mode: "development",
  module: {
    rules: [
      { test: /\.js|jsx$/, use: ["babel-loader"], exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader!css-loader'}
    ]
  }
};