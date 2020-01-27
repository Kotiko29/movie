const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: {
    app: './index.js',
  },
  // devtool: 'source-map',
  devServer: {
    open: false,
    contentBase: './dist',
    // host: '192.168.1.73',
    // host: '192.168.0.200',
    port: 8081
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'category.html',
      template: './category.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'post.html',
      template: './post.html',
    }),
    new CopyWebpackPlugin([
      { from: './static', to: 'static' }
    ]),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use:[
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: './'
            }
          },
          {loader: 'css-loader'},
          {loader: 'stylus-loader'}
        ]
      },
      {
        test: /\.(ttf|eot|otf|woff2|woff)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[hash].[ext]',
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[hash].[ext]',
        },
      }
    ],
  },
  
};
