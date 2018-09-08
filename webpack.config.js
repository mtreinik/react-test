var path = require("path");
var config = {
  mode: "development",
  entry: ["./app/main.tsx"],
  output: {
    path: path.resolve(__dirname, "app/build"),
    filename: "bundle.js"
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: { transpileOnly: false }
        },
        exclude: /node_modules/
      }
    ]
  }
};

module.exports = config;
