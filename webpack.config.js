const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 需要解构
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = {
  mode:'development',
  entry: {
    main:'./src/index.js',
    test:'./src/test.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[hash].js',
    chunkFilename:'[id].js' 
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(), // 不需要传入任何参数
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename:'[name].css'
    })
  ]
}
module.exports = (env, argv) => {
  console.log(env)
  console.log(argv)
  return config
}