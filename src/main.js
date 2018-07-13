import Vue from 'vue';
import Buefy from 'buefy';
import 'font-awesome/css/font-awesome.min.css'; // https://fontawesome.com
import App from './App.vue';
import router from './router';
import store from './store';
import './permission'; // 权限验证
import './sass/custom.scss'; // 加载buefy
import './utils/mock';

Vue.use(Buefy, {
  defaultIconPack: 'fa',
});
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
