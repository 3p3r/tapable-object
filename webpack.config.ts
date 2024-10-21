import type webpack from "webpack";

const config: webpack.Configuration = {
  entry: "./index.ts",
  output: {
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },
};

export default config;
