const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 需要解构

module.exports = {
  mode:'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename:'[name]_[hash].js'
  },
  plugins: [
    new CleanWebpackPlugin(), // 不需要传入任何参数
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    }),
  ]
}