import router from './router';
import store from './store';
import { getCookie } from './utils/cookie';

const ua = window.navigator.userAgent.toLowerCase();
let clientType = 'other';
if (ua.match(/MicroMessenger/i) === 'micromessenger') {
  clientType = 'wechat';
} else if (ua.match(/WeiBo/i) === 'weibo') {
  clientType = 'weibo';
} else if (ua.match(/windows/i) === 'windows' || ua.match(/mac/i) === 'mac') {
  clientType = 'pc';
}
store.dispatch('setClientType', clientType);

// 路由守卫
router.beforeEach((to, from, next) => {
  console.log('获取token');
  console.log(getCookie('token'));
  //* *********************在#号前增加?开始
  const paths = window.location.href.split('#');
  paths[1] = paths[1] || '/';
  // 老式的#!分隔跳转
  if (paths[0].charAt(paths[0].length - 1) !== '?') {
    paths[0] = `${paths[0]}?`;
  }
  if (paths[1].charAt(0) === '!') {
    paths[1] = paths[1].substr(1);
  }
  const url = `${paths[0]}#${paths[1]}`;
  if (window.location.href !== url) {
    window.location.href = url;
  }
  //* *********************在#号前增加?结束

  // store.dispatch('getUserInfo');
  if (to.query.session_key) { // 保存返回的token
    store.dispatch('setToken', to.query.session_key);
  }
  if (to.query.openid) { // 保存返回的token
    setCookie('openid', to.query.openid);
  }
  if (to.query.login_type) { // 保存登录类型login_type
    store.dispatch('setLoginType', to.query.login_type);
  }
  if (to.path !== '/loginQrcode' && to.path !== '/author' && to.path !== '/login') {
    console.log('走123');
    console.log(store.getters.user_id);
    // 验证登录客户端
    if (!/Android|webOS|iPhone|iPod|BlackBerry/i.test(ua)) {
      // 生产模式下非手机端跳至扫二维码页面
      next('/loginQrcode');
    } else if (!store.getters.user_id) {
      console.log('走456');
      store.dispatch('setbeforeLoginUrl', to.fullPath); // 保存用户进入的url
      next('/author');
    }
  } else if (to.path === '/author' && store.getters.login_status) {
    // 用户使用后退返回到授权页，则默认回到首页
    next('/');
    return false;
  }
  next();
  // 是否可以后退
  let allowBackBool = true; //    给个默认值true
  if (to.meta.allowBack !== undefined) {
    allowBackBool = to.meta.allowBack;
  }
  if (!allowBackBool) {
    router.history.pushState(null, null, window.location.href);
  }
  store.dispatch('setAllowback', allowBackBool);
});
