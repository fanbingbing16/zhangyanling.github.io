const { defineConfig } = require('@vue/cli-service')
const CompressionPlugin = require("compression-webpack-plugin") //引入gzip压缩插件

// const path = require('path')

// function resolve(dir) {
//   return path.join(__dirname, dir)
// }

module.exports = defineConfig({
  productionSourceMap: false,
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
    config.when(process.env.NODE_ENV !== 'development',
      config => {
        config
          .plugin('ScriptExtHtmlWebpackPlugin')
          .after('html')
          .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }])
          .end()
        // 对超过10kb的文件gzip压缩
        config.plugin('compressionPlugin').use(
          new CompressionPlugin({
            test: /\.(js|css|html)$/, // 匹配文件名
            threshold: 10240
          })
        )
        config.optimization.splitChunks({
          chunks: 'all',
          maxSize: 1100000,
          minSize: 700000,
          cacheGroups: {
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: 'initial' // only package third parties that are initially dependent
            },
            elementPlus: {
              name: 'chunk-elementPlus', // split elementPlus into a single package
              priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
              test: /[\\/]node_modules[\\/]_?element-plus(.*)/ // in order to adapt to cnpm
            },
            vue1: {
              name: 'chunk-vue1', // split elementPlus into a single package
              priority: 21, // the weight needs to be larger than libs and app or it will be packaged into libs or app
              test: /[\\/]node_modules[\\/]_?@vue(.*)/, // in order to adapt to cnpm
            },
            typescript: {
              name: 'chunk-typescript', // split elementPlus into a single package
              priority: 22, // the weight needs to be larger than libs and app or it will be packaged into libs or app
              test: /[\\/]node_modules[\\/]_?typescript(.*)/, // in order to adapt to cnpm
            },
           
          }
        })
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
        },
       
      ]
    },
    // plugins: [
    //   new CompressionPlugin({
    //     //gzip压缩配置
    //     test: /\.js$|\.html$|\.css/, //匹配文件名
    //     threshold: 10240, //对超过10kb的数据进行压缩
    //     deleteOriginalAssets: false, //是否删除原文件
    //   }),
    // ],
  },



})
