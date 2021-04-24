module.exports = {
  //是否自动打开页面
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      //配置别名
      alias: {
        //   '@': 'src' 默认已经配置
        assets: "@/assets",
        components: "@/components",
        views: "@/views",
      },
    },
  },
  //解决跨域
  // devServer: {
  //   proxy: "http://47.96.92.141:8080",
  // },
};
