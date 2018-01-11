module.exports = {
  resolve: {
    extensions: [".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: require.resolve("ts-loader"),
            options: {
              configFile: "tsconfig.json"
            }
          }
        ]
      }
    ]
  }
};
