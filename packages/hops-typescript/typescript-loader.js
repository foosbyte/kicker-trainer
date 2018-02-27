module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.tsx?$/,
            use: [
              {
                loader: require.resolve('ts-loader'),
                options: {
                  configFile: 'tsconfig.json',
                },
              },
            ],
          },
        ],
      },
    ],
  },
};
