const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  mode: "development", // "production" | "development" | "none"
  entry: {
    bundle: path.resolve(__dirname, "src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name][contenthash].js", // name taken from entry point, [contenthash] adds the hash behind filenames
    clean: true, // cleaning the inital file so no duplicate files or extra files are created
    assetModuleFilename: "[name][ext]", // so webpack does not change asset names to random names
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000, // changing the port for serving the files
    open: true, // auto open in browser
    hot: true, // hot reloading
    compress: true, // gzip compress
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg)$/i, // for adding images, i - case insensitive
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: "Joke Generator",
      filename: "index.html",
      template: "src/template.html",
    }),
    new BundleAnalyzerPlugin(),
  ],
};
