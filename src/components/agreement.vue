<template>
  <div v-if="value" class="agreement">
    <img v-on:click="closeAgreement" class="agreement_cacel" src="../assets/image/agreement_cacel.png" />
    <div class='agreement_padding'>
      <div class="agreement_title">{{title}}</div>
      <div class='agreement_content' v-html="content">
      </div>
    </div>
  </div>
</template>
<style lang="less">
.agreement {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 10;
  display: flex;
  justify-content: center;
  top: 0;
  .agreement_cacel {
    position: absolute;
    right: 4%;
    top: 10px;
    width: 20px;
    height: 20px;
  }
  .agreement_padding {
    width: 92%;
    height: 100%;
    .agreement_title {
      font-weight: bold;
      font-size: 1rem;
      height: 8%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .agreement_content {
      height: 86%;
      background: #f5f5f5;
      border-radius: 9px;
      padding: 2%;
      border: 1px solid #999;
      overflow-y: scroll;
      overflow-x: hidden;
      word-break: break-all;
    }
  }
}
</style>  
<script>
export default {
  props: {
    title: {},
    content: {},
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeAgreement() {
      this.$emit("input", false);
    }
  }
};
</script>