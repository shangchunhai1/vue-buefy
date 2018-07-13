<template>
  <div>
    我的
    <div class="columns is-variable  is-multiline is-mobile is-marginless is-1">
      <div class="column is-3 " style="height:80px">
        <vimage :src="url2" mode="widthFix"></vimage>
      </div>   
       <div class="column is-3  " style="height:80px">
        <vimage :src="url2" mode="widthFix"></vimage>
      </div>              
       <div class="column is-3  " style="height:80px">
        <vimage :src="url2" mode="aspectFit"></vimage>
      </div>   
       <div class="column is-3  " style="height:80px">
        <vimage :src="url3" mode="aspectFit"></vimage>
      </div>   
       <div class="column is-3  " style="height:80px">
        <vimage :src="url3" mode="aspectFit"></vimage>
      </div>   
       <div class="column is-3 " style="height:80px">
        <vimage :src="url3" mode="widthFix"></vimage>
      </div>   
       <div class="column is-3 " style="height:80px">
        <vimage :src="url3" mode="widthFix"></vimage>
      </div>   
       <div class="column is-3 " style="height:80px">
        <vimage :src="url3" mode="aspectFill"></vimage>
      </div>   
    </div>
    <vimage :src="url" ></vimage>
    <!-- <div class="columns is-mobile is-multiline">
      <div class="column is-6" v-on:click="testlink">
        100%
        <vimage :src="url" ></vimage>
      </div>
      <div class="column is-6">
        100%
        <vimage :src="url2"></vimage>
      </div>
      <div class="column is-4">
        aspectFit
        <vimage :width=200 :height=200 :src="url2" mode="aspectFit"></vimage>
      </div>
      <div class="column is-4">
        aspectFit
         <vimage :width=200 :height=200 :src="url3" mode="aspectFit"></vimage>
      </div>
      <div class="column is-4">
        aspectFill
        <vimage :width=200 :height=200 :src="url2" mode="aspectFill"></vimage>
      </div>
      <div class="column is-6">
        aspectFill
        <vimage :width=200 :height=200 :src="url3" mode="aspectFill"></vimage>
      </div>
      <div class="column is-6">
        widthFix
        <vimage :width=200 :height=200 :src="url2" mode="widthFix"></vimage>
      </div>
      <div class="column is-6">
        widthFix
        <vimage :width=200 :height=200 :src="url3" mode="widthFix"></vimage>
      </div>
      <div class="column is-6">
        heightFix
        <vimage :width=200 :height=200 :src="url2" mode="heightFix"></vimage>
      </div>
      <div class="column is-6">
        heightFix
        <vimage :width=200 :height=200 :src="url3" mode="heightFix"></vimage>
      </div>
    </div>
    ---------------------------------------------
    <p> 100%</p>
    <vimage :src="url"></vimage>
    <p> 100%</p>
    <vimage :src="url2"></vimage>
    <p>aspectFit</p>
    <vimage :width=200 :height=200 :src="url2" mode="aspectFit"></vimage>
    <p>aspectFit</p>
    <vimage :width=200 :height=200 :src="url3" mode="aspectFit"></vimage>
    <p>aspectFill</p>
    <vimage :width=200 :height=200 :src="url2" mode="aspectFill"></vimage>
    <p>aspectFill</p>
    <vimage :width=200 :height=200 :src="url3" mode="aspectFill"></vimage>
    <p>widthFix</p>
    <vimage :width=200 :height=200 :src="url2" mode="widthFix"></vimage>
    <p>widthFix</p>
    <vimage :width=200 :height=200 :src="url3" mode="widthFix"></vimage>
    <vimage :width=200 :height=200 :src="url2" mode="heightFix"></vimage>
    <vimage :width=200 :height=200 :src="url3" mode="heightFix"></vimage> -->

  </div>
</template>

<script>
import vimage from '@/components/vimage.vue';

export default {
  components: {
    vimage,
  },
  data() {
    return {
      url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=845221031,2054714551&fm=27&gp=0.jpg',
      url2: 'http://img0.imgtn.bdimg.com/it/u=561254476,3031188074&fm=27&gp=0.jpg',
      url3: 'http://img0.imgtn.bdimg.com/it/u=4204984068,3896675956&fm=27&gp=0.jpg',
    };
  },
  methods: {
    testlink(){
      this.$router.replace('/');
    }
  }
};
</script>

