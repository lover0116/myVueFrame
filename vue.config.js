module.exports = {
  // cli3 代理是从指定的target后面开始匹配的，不是任意位置；配置pathRewrite可以做替换
  devServer: {
    proxy: {
      '/xxx': {
        target: 'http://10.100.201.91:38080',
        changeOrigin: true,
        pathRewrite: {
          '^/xxx': ''
        }
      }
    }
  },
  /*configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.externals = { // 不会被打包的库
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'element-ui': 'ELEMENT'
      }
    }
  }*/
}