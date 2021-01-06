const isProduction = process.env.NODE_ENV === "production";
const cdn = {
  // 忽略打包的第三方库
  externals: {
    vue: 'Vue',
    'element-ui': 'ELEMENT'
  },
  js: [
    'https://cdn.jsdelivr.net/npm/vue',
    'https://unpkg.com/element-ui@2.13.2/lib/index.js'
  ],
  css: [
    //'https://unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css'
  ]
};
module.exports = {
  publicPath: './',
  devServer: {
    //https: true,
    proxy: {
      '/*': {
        //target: 'http://10.100.201.17:31733/',
        target: 'https://weixin.billjc.com/',
        secure: true,
      },
      '/ems': {
        target: 'https://weixin.billjc.com',
        changeOrigin: true,
        secure: false,
        headers: {
          Referer: 'https://weixin.billjc.com'
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
      args[0].title = 'my vue2.0'
      return args
    })
  },
  configureWebpack: config => {
    if (isProduction) {
      config.externals = cdn.externals;
    }
  }
}
