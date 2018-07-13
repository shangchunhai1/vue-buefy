<template>
  <div id='app' :class="$route.meta.footShow ? 'padding-bottom-nav' : ''">
    <keep-alive>
      <router-view v-if='$route.meta.keepAlive'>
        <!-- 这里是会被缓存的视图组件，比如 page1,page2 -->
      </router-view>
    </keep-alive>
    <router-view v-if='!$route.meta.keepAlive'>
      <!-- 这里是不被缓存的视图组件，比如 page3 -->
    </router-view>
    <footerbar :nowpath='thepath' :tabBar='tabBar' v-if='$route.meta.footShow'></footerbar>
    <b-loading :is-full-page='true' :active.sync='isLoading'></b-loading>
  </div>
</template>

<style lang='scss'>
html,
body,
{
  height: 100%;
  overflow-y:hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  overflow-y:scroll;
  background: hsl(0, 0%, 90%)
  //min-height: 100%;
}
.padding-bottom-nav{
  padding-bottom:65px;
}
</style>
<script>
import { mapState } from 'vuex';
import footerbar from './components/footerbar.vue';

export default {
  components: {
    footerbar,
  },
  data() {
    return {
      thepath: '/',
      tabBar: { //tabbar参数
        'color': '#000000',
        'selectedColor': '#ff6633',
        'backgroundColor': '#fff',
        'backgroundColor': '#ffffff',
        'type':'icon',
        'list': [
          {
            'pagePath': '/home',
            'text': '首页',
            'iconPath': 'home',
            'selectedIconPath': '',
            active: true,
          },
          {
            'pagePath': '/product',
            'text': '列表',
            'iconPath': 'th-list',
            'selectedIconPath': '',
            active: false,
          },
          {
            'pagePath': '/shoplist',
            'text': '逛逛',
            'iconPath': 'shopping-bag',
            'selectedIconPath': '',
            active: false,
          },
          {
            'pagePath': '/contact',
            'text': '消息',
            'iconPath': 'comment',
            'selectedIconPath': '',
            active: false,
          },
          {
            'pagePath': '/my',
            'text': '我的',
            'iconPath': 'user',
            'selectedIconPath': '',
            active: false,
          },
        ],
      },
    };
  },
  beforeUpdate() {
    this.thepath = this.$route.path;
  },
  computed: {
    ...mapState({
      isLoading: state => state.user.isLoading,
    }),
  },
};
</script>
