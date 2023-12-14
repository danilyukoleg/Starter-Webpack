import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import path from "path";

export default {
  mode: "development",
  entry: "./src/js/index.js",
  output: {
    filename: "./assets/js/bundle.[contenthash].js",
    path: path.resolve("dist"),
    assetModuleFilename: "./assets/[name].[contenthash].[ext]",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "./assets/css/build.[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: "/node_modules",
        use: ["babel-loader"],
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
        generator: {
          filename: "./assets/images/[name].[hash][ext]",
        },
      },
    ],
  },
  devServer: {
    watchFiles: path.resolve("src"),
    compress: true,
    open: true,
    port: 9000,
  },
};
