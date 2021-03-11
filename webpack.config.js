const path = require('path');

module.exports = ['source-map'].map((devtool) => ({
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'manim.js',
    library: 'Manim',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  // devtool,
  // optimization: {
  //   runtimeChunk: true,
  // },
}))[0];