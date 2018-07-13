<template>
  <div class="footer_div">
    <nav class="navbar is-fixed-bottom">
      <div class="level  is-mobile ">
        <template v-for="item in tabBar.list">
          <div class="level-item has-text-centered" v-on:click="pathTo(item.pagePath)">
            <div :class="item.pagePath == nowpath ? 'has-text-primary' : 'has-text-grey' ">
              <template v-if="tabBar.type == 'icon'">
                <b-icon :icon="item.iconPath" size="is-medium"></b-icon>
                <p class="navbar-title">{{item.text}}</p>
              </template>
            </div>
          </div>
        </template>
      </div>
    </nav>
  </div>
</template>  
<style lang="scss" scoped>
.navbar {
  border-top: 1px solid #eee;
  padding: 5px 0;
}
.navbar-title {
  font-size: 14px;
  line-height: 1.2;
}
</style>  
<script>
export default {
  name: 'footerbar',
  props: {
    tabBar: {
      type: Object,
      required: true,
    },
    nowpath: {
      type: String,
      required: true,
      default: '/'
    }
  },
  data() {
    return {}
  },
  created() {
    console.log(this.tabBar);
  },
  methods: {
    backsmall() {
      this.$router.push('/smallcode');
      let that = this
      console.log('返回前台')
      console.log(wx);
      wx.miniProgram.getEnv(function (res) {
        console.log(res.miniprogram)
        if (res.miniprogram == true) {
          wx.miniProgram.reLaunch({ url: '/pages/user/user' })
        } else {
          that.$router.push('/smallcode');
        }
      })
    },
    pathTo(path) {
      console.log('点击tabbar')
      console.log(path)
      this.$router.push(path);
    }
  }
}
</script>