// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://172.16.0.199/newsvn/wechatstore/admin',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};

