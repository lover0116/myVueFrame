const isProduction = process.env.NODE_ENV === "production";
const cdn = {
  // 忽略打包的第三方库
  /**
   * externals 对象属性解析：
   * '包名' : '在项目中引入的名字'
   * 以element-ui举例 我再main.js里是以
   * import ELEMENT from 'element-ui'
   * Vue.use(ELEMENT, { size: 'small' })
   * 这样引入的，所以我的externals的属性值应该是ELEMENT
   */
  externals: {
    vue: 'Vue',
    //vuex: 'Vuex',
    //'vue-router': 'VueRouter',
    //axios: 'axios',
    'element-ui': 'ELEMENT'
  },
  js: [
    'https://cdn.jsdelivr.net/npm/vue',
    //'https://unpkg.com/vue-router/dist/vue-router.js',
    //'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
    //'https://cdn.bootcdn.net/ajax/libs/axios/0.19.2/axios.min.js',
    'https://unpkg.com/element-ui@2.13.2/lib/index.js'
  ],
  css: [
    'https://unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css'
  ]
};
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
  chainWebpack: (config) => {
    if (isProduction) {
      config.plugin('html').tap((args) => {
        args[0].cdn = cdn
        return args
      })
    }
    config.plugin('html').tap(args => { // 所有环境配置统一的title
      args[0].title = 'my vue2'
      return args
    })
  },
  configureWebpack: config => {
    if (isProduction) {
      config.externals = cdn.externals;
    }
  }
}
