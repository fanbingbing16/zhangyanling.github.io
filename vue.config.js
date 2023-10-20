const { defineConfig } = require('@vue/cli-service')
const CompressionPlugin = require("compression-webpack-plugin") //引入gzip压缩插件




module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {

    const oneOfsMap = config.module.rule('scss').oneOfs.store

    oneOfsMap.forEach(item => {

      item

        .use('sass-resources-loader')

        .loader('sass-resources-loader')

        .options({

          // Provide path to the file with resources

          // 要公用的scss的路径

          resources: 'src/style.scss'

        })

        .end()

    })

  }, configureWebpack: {
    module: {
      rules: [
        // 配置读取 *.md 文件的规则
        {
          test: /\.md$/,
          use: [
            { loader: "html-loader" },
            { loader: "markdown-loader", options: {} }
          ]
        }
      ]
    },
    plugins: [
      new CompressionPlugin({
        //gzip压缩配置
        test: /\.js$|\.html$|\.css/, //匹配文件名
        threshold: 10240, //对超过10kb的数据进行压缩
        deleteOriginalAssets: false, //是否删除原文件
      }),
    ],
  },



})
