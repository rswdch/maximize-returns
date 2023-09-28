const path = require("path");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  entry: "./src/client/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist", "client"),
    // publicPath: path.resolve(__dirname, "dist", "client"),
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        include: path.resolve(__dirname, "src", "client"),
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  devServer: {
    static: {
      publicPath: "/", // URL mapped to folder
      directory: path.resolve(__dirname, "dist", "client"), // Folder where index.html is
    },
    historyApiFallback: true,
  },
};
