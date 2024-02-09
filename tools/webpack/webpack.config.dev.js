const { readFileSync } = require('fs');
const { resolve } = require('path');

const packageUrl = readFileSync(resolve(process.cwd(), 'package.json')).toString();
const { proxy, port } = JSON.parse(packageUrl);

module.exports = {
  mode: 'development',
  entry: ['./src/Main.tsx'],
  module: {
    rules: require('./webpack.rules'),
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    publicPath: '/',
  },
  target: 'browserslist',
  plugins: require('./webpack.plugins'),
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: require('./webpack.aliases'),
  },
  stats: 'errors-warnings',
  devtool: 'cheap-module-source-map',
  devServer: {
    port,
    proxy: [
      {
        context: ['/api'],
        changeOrigin: true,
        target: proxy,
        secure: false,
      },
    ],
    open: true,
    server: 'http',
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    allowedHosts: 'all',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  performance: {
    hints: false,
  },
};
