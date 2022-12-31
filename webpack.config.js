const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 需要解构
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const config = {
  mode: 'development',
  devtool:'eval-cheap-module-source-map',
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
          {
            loader: 'postcss-loader',
            options:{
              postcssOptions:{
                plugins: [
                  [
                    'autoprefixer',
                    {
                      // 选项
                    }
                  ]
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /meta.html/,
        type:'asset/source'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(), // 不需要传入任何参数
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename:'test.html',
      templateParameters: {
        titleName: 'test-title-name',
        jsList:['https://code.jquery.com/jquery-3.1.0.js']
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename:'[name].css'
    })
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),  // <- css 代码压缩
    ],
    minimize: true
  },
  devServer: {
    client: {
      overlay: true, // 关闭全屏的代码遮罩层
      progress: true // 半分比显示编译进度
    },
    devServer: {
      compress: true,  // 启用 gzip
    },
  }
}
module.exports = (env, argv) => {
  console.log(env)
  console.log(argv)
  return config
}