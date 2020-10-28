// eslint-disable-next-line @typescript-eslint/no-var-requires
const { join } = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const TerserPlugin = require('terser-webpack-plugin')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CompressionPlugin = require('compression-webpack-plugin')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CopyPlugin = require('copy-webpack-plugin')

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  webpackDevServerPort: parseInt(process.env.WEBPACK_DEV_SERVER_PORT || '8080', 10),
}

module.exports = {
  mode: config.nodeEnv,
  entry: {
    index: join(__dirname, `src/js`),
  },
  devtool: config.nodeEnv === 'development' ? 'eval-source-map' : undefined,
  output: {
    filename: '[name]-[hash].bundle.js',
    path: join(__dirname, 'dist'),
    publicPath: '/',
  },
  devServer: {
    contentBase: 'public/',
    historyApiFallback: true,
    port: config.webpackDevServerPort,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(txt|md)$/i,
        use: [
          {
            loader: 'raw-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: config.nodeEnv === 'production',
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new webpack.EnvironmentPlugin([]),
    new HtmlWebpackPlugin({
      template: './src/html/index.html',
    }),
    new CopyPlugin([{ from: 'public', to: '.' }]),
    new CompressionPlugin(),
  ],
}
