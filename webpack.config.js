const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production', // production
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name].js', // 入口代码块文件名生成规则
    chunkFilename: '[name].js', // 非入口代码块文件名生成规则
  },
  optimization: {
    usedExports: true, // 标注使用到的导出
    moduleIds: 'deterministic', // 模块名称生成规则
    chunkIds: 'deterministic'   // 代码块名称的生成规则
  },
  resolve: {
    // fallback: {
    //   'crypto': require.resolve('crypto-browserify'),
    //   'stream': require.resolve('stream-browserify'),
    //   'buffer': require.resolve('buffer'),
    // }
    fallback: {
      'crypto': false,
      'stream': false,
      'buffer': false,
    }
  },
  devtool: false,
  // watch: true,
  cache: {
    // 如果使用filesystem，就不要在使用cnpm方式安装包,webpack5和cnpm方式有冲突
    // https://github.com/cnpm/cnpm/issues/335
    // cnpm install 会卡死，打包不出来
    type: 'filesystem', // 默认是memory-->快 filesystem-->慢，持久化
    cacheDirectory: path.resolve(__dirname, 'node_modules/.cache/webpack') //可配可不配
  },
  devServer: {
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, //不打包 不编译
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env', // es6-es5
                '@babel/preset-react' // jsx
              ]
            }
          }
        ]
      },
      {
        test: /\.png$/,
        type: 'asset/resource' //新的配置，对标file-loader
      },
      {
        test: /\.ico$/,
        type: 'asset/inline' //新的配置，对标url-loader 模块的大小<limit,base64字符串
      },
      {
        test: /\.txt$/,
        type: 'asset/source' //raw-loader
      },
      {
        test: /\.jpg$/,
        type: 'asset', //新的配置，对标file-loader asset后面不加会自动读下面的配置
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', 'css-loader'
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]

}