const { defineConfig } = require('@vue/cli-service')
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

  }

})
