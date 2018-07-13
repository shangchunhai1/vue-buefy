<template>
  <div class="hello">
    <h1>欢迎登陆店铺</h1>
    <h2></h2>
  </div>
</template>

<script>
import { setCookie, getCookie, delCookie } from '@/utils/cookie';
import { getUserInfo } from '@/server/getData'
export default {
  name: "author",
  data() {
    return {};
  },
  created() {
    //获取登录信息
    this.login()
  },
  methods: {
    login() {
      let that = this
      console.log('验证author')
      console.log(this.$store.getters.token)
      console.log(getCookie('token'));
      if (this.$store.getters.token) {
        //TODO  获取用户信息
        getUserInfo().then((res) => {
          if(res.code == '200'){
            this.$store.dispatch('setUserData',res);
            console.log('走这里了啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊')
            this.goBeforeLoginUrl()
            that.$toast.open({
              message: "欢迎" + this.$store.getters.name,
              type: 'is-success'
            }) 
          }
        })
        
      } else {
        setCookie('beforeLoginUrl', this.$store.getters.beforeLoginUrl)
        if (this.$store.getters.client_type == 'wechat' && this.$store.getters.login_type != 'wechat') {
          let auth_url = process.env.AUTH_URL + "/index.php?route=wechat/login/authorBase&type=1&auth=auth3";
          // 跳转到微信授权页面
          window.location.href = auth_url;
        } else if (this.$store.getters.client_type == 'weibo' && this.$store.getters.login_type != 'weibo') {
          //是否是微博登录weibo_base
          window.location.href = process.env.BSAE_URL + "/index.php?route=swechat/login/weiBoAuthor&weibo_base=1";
        } else {
          this.$router.push('/login')
        }
      }
    },
    goBeforeLoginUrl() {
      let path = decodeURIComponent(getCookie('beforeLoginUrl'))
      if (path == 0) {
        this.$router.push('/')
      } else {
        this.$router.push(decodeURIComponent(path))
        delCookie('beforeLoginUrl')
      }

      //this.$router.go(path);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
