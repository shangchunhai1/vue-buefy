<template>
  <div>
    <div class="card-list">
      <div class="container">
        <b-field>
          <b-input placeholder="请输入店铺名称" type="search" icon="search" expanded>
          </b-input>
          <p class="control">
            <button class="button is-primary">搜索</button>
          </p>
        </b-field>
      </div>
    </div>
      <div class="card-list-padd"  v-for="item in comments">
      <div class="card-list-content">
        <div class="columns is-variable  is-multiline is-mobile">
          <div class="column is-12">
            <div class="is-size-6 has-text-weight-semibold">{{item.title}}</div>
            <div class="columns is-mobile padding-10 is-marginless">
              <div class="column is-paddingless  is-3 ">
                <figure class="image is-64x64">
                  <img :src="item.user_image" alt="">
                </figure>                
              </div>
               <div class="column padding-left-less is-paddingless is-9 is-mobile card-list-title-flex">
                <div class="is-size-6 has-text-weight-semibold">{{item.user_name}}</div>
                <div>{{item.store_name}}</div>
              </div>
            </div>
            <div class="is-size-7">{{item.content}}</div>
            <div class="columns padding-10  is-variable  is-multiline is-mobile is-marginless ">
              <div class="column is-4  " style="height:80px;padding:3px" v-for="itemv in item.comment_image">
                <vimage :src="itemv.url" mode="aspectFill"></vimage>
              </div>              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getShopList } from '@/server/getData.js';
import vimage from '@/components/vimage.vue';
  export default {
    components: {
      vimage,
    },
    data () {
      return {
        comments: [],
      }
    },
    created() {
      getShopList().then((res) => {
        console.log(res)
        this.comments = res;
      })
    },
  }
</script>

<style scoped>

</style>