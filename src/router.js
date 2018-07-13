import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';

Vue.use(Router);
/* eslint-disable global-require */

export default new Router({
  routes: [
    {
      path: '/',
      component: { render(c) { return c('router-view'); } },
      redirect: '/home',
      name: '首页',
      meta: {
        keepAlive: false, // 此组件不需要被缓存
        allowBack: true, // 是否允许后退
        footShow: true, // 是否显示tabbar
        auth: false, // 是否验证权限
      },
      children: [
        {
          path: '/login',
          component: resolve => require(['./views/login/login'], resolve),
          meta: {
            keepAlive: false, // 此组件不需要被缓存
            allowBack: true, // 是否允许后退
            footShow: false, // 是否显示tabbar
            auth: false, // 是否验证权限
          },
        },
        {
          path: '/author',
          component: resolve => require(['./views/login/author'], resolve),
          meta: {
            keepAlive: false, // 此组件不需要被缓存
            allowBack: true, // 是否允许后退
            footShow: false, // 是否显示tabbar
            auth: true, // 是否验证权限
          },
        },
        {
          path: 'home',
          component: resolve => require(['./views/Home'], resolve),
          meta: {
            keepAlive: false, // 此组件不需要被缓存
            allowBack: true, // 是否允许后退
            footShow: true, // 是否显示tabbar
            auth: false, // 是否验证权限
          },
        },
        {
          path: 'my',
          component: resolve => require(['./views/user/my'], resolve),
          meta: {
            keepAlive: false, // 此组件不需要被缓存
            allowBack: true, // 是否允许后退
            footShow: true, // 是否显示tabbar
            auth: false, // 是否验证权限
          },
        },
        {
          path: 'contact',
          component: resolve => require(['./views/user/contact'], resolve),
          meta: {
            keepAlive: false, // 此组件不需要被缓存
            allowBack: true, // 是否允许后退
            footShow: true, // 是否显示tabbar
            auth: false, // 是否验证权限
          },
        },
        {
          path: 'shoplist',
          component: resolve => require(['./views/user/shoplist'], resolve),
          meta: {
            keepAlive: false, // 此组件不需要被缓存
            allowBack: true, // 是否允许后退
            footShow: true, // 是否显示tabbar
            auth: false, // 是否验证权限
          },
        },
        {
          path: '/product',
          component: { render(c) { return c('router-view'); } },
          redirect: '/product/productlist',
          meta: {
            keepAlive: false, // 此组件不需要被缓存
            allowBack: true, // 是否允许后退
            footShow: true, // 是否显示tabbar
            auth: false, // 是否验证权限
          },
          children: [
            {
              path: '',
              name: 'productlist',
              component: resolve => require(['./views/user/product/product'], resolve),
              meta: {
                keepAlive: false, // 此组件不需要被缓存
                allowBack: true, // 是否允许后退
                footShow: true, // 是否显示tabbar
                auth: false, // 是否验证权限
              },
            },
            {
              path: 'productinfo',
              name: 'productinfo',
              component: resolve => require(['./views/user/product/productinfo'], resolve),
              meta: {
                keepAlive: false, // 此组件不需要被缓存
                allowBack: true, // 是否允许后退
                footShow: true, // 是否显示tabbar
                auth: false, // 是否验证权限
              },
            },
          ],
        },
      ],
    },
  ],
});
/* eslint-enable global-require */
