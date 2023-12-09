const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  entry: {
    main: "./src/client/index.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist", "client"),
    publicPath: '/', // needs to be project root for HtmlWebpackPlugin, ./ does not work
    clean: true,
  },
  module: {
    rules: [
      {
        test: /.(js|jsx|ts|tsx)$/,
        include: path.resolve(__dirname, "src", "client"),
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        // include: path.resolve(__dirname, "src", "client"),
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              config: path.resolve(__dirname, 'postcss.config.cjs'),
            },
          },
        },],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  devServer: {
    static: {
      publicPath: "/", // URL mapped to folder
      directory: path.resolve(__dirname, "dist", "client"), // Folder where index.html is
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        secure: false,
      },
      '/session': {
        target: 'http://localhost:3001',
        secure: false,
      },
    },
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: "src/client/index.html",
      chunks: "main",
    }),
  ],
};
