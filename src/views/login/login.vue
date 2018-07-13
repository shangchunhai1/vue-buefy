<template>
  <div class="container is-fluid height-full">
    <div class="notification height-full">
      <section  class="section">
        <h3 class="subtitle">欢迎登录</h3>
        <b-field>
          <b-input placeholder="手机号" type="mobile" v-model="phone" icon="user-o">
          </b-input>
        </b-field>
        <b-field>
          <b-input placeholder="密码" type="password" v-model="password" icon="key">
          </b-input>
        </b-field>

        <b-field grouped>
          <b-input placeholder="验证码" icon="sort-numeric-asc" v-model="inputCode">
          </b-input>
          <p class="control">
            <button class="button is-primary" @click="createCode">{{checkCodeText}}</button>
          </p>
        </b-field>
      </section>
      <div class="button-div">
        <button class="button is-primary" @click="login">
          登录
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { checkPhone } from '@/utils/function';
import { mobileLogin } from '@/server/getData';

export default {
  data() {
    return {
      phone: '', // 手机号
      password: '', // 密码
      inputCode: '', // 验证码
      checkCode: '',
      checkCodeText: '',
    };
  },
  created() {
    this.createCode();
  },
  methods: {
    login() {
      const that = this;
      if (!checkPhone(this.phone)) {
        this.$toast.open({
          message: '手机号有误',
          type: 'is-warning',
        });
      } else if (this.password.length < 6) {
        this.$toast.open({
          message: '密码有误',
          type: 'is-warning',
        });
      } else if (this.inputCode !== this.checkCode || !this.checkCode) {
        this.$toast.open({
          message: '验证码有误',
          type: 'is-warning',
        });
      } else {
        // 请求登录接口
        mobileLogin(this.phone, this.password).then((res) => {
          if(res.code === 200){
            that.$store.dispatch('setUserData',res);
            console.log('成功')
            that.$router.push('/');
          }
        });
      }
      console.log('提交');
    },
    // 图片验证码
    createCode() {
      let code = '';
      let codeText = '';
      const codeLength = 4; // 验证码的长度
      const random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // 随机数
      for (let i = 0; i < codeLength; i++) {
        // 循环操作
        const index = Math.floor(Math.random() * 10); // 取得随机数的索引（0~35）
        code = `${code}${random[index]}`; // 根据索引取得随机数加到code上
        codeText = `${codeText}${random[index]} `;
      }
      this.checkCode = code; // 把code值赋给验证码
      this.checkCodeText = codeText;
    },
  },
};
</script>
<style scoped>
.button-div {
  padding-top: 40px;
}
</style>
