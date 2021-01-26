const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const cssLoaders = extra => {
  let loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: ''
      },
    },
    'css-loader'
  ]
  if (extra) {
    loaders.push(extra)
  }
  return loaders
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: ['@babel/polyfill', './js/main.js'],
  output: {
    filename: "bundle.[name].[contenthash].js",
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
  plugins: [
    new HTMLWebpackPlugin({
      // filename: 'html/index.html',
      template: './index.html'
    }),
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, 'src/favicon.ico'),
    //       to: path.resolve(__dirname, 'dist/')
    //     }
    //   ]
    // }),
    new MiniCssExtractPlugin({
      filename: "bundle.[name].[contenthash].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif|ico)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  devServer: {
    port: 4200
  }
}