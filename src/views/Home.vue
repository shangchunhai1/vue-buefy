<template>
  <div class="home" v-if="show">
    <div class="card-list">
      <div class="container">
        <b-field>
          <b-input placeholder="请输入搜索关键字" type="search" icon="search" expanded>
          </b-input>
          <p class="control">
            <button class="button is-primary">搜索</button>
          </p>
        </b-field>
      </div>
    </div>
    <div class="card-list-full">
      <switer :images="images"> </switer>
    </div>
    <div class="card-list-padd">
      <div class="card-list-content">
        <div class="columns is-2 is-variable  is-multiline is-mobile">
          <div class="column is-12 card-list-theme">店长推荐</div>
          <div class="column is-6" v-for="item in products">
            <div class="image is-square">
              <img :src="item.image" alt="">
            </div>
            <div class="card-list-price">¥{{item.price}}</div>
            <div class="card-list-sale">销量 {{item.sale}}</div>
            <div class="card-list-title">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
     <div class="card-list-padd">
      <div class="card-list-content">
        <div class="columns is-2 is-variable  is-multiline is-mobile">
          <div class="column is-12 card-list-theme">你知道吗</div>
          <div class="column is-12" v-for="item in articles">
            <div class="columns is-2 is-variable  is-multiline is-mobile card-list-bottom-border">
            <div class="column is-4" style="height:107px">
              <vimage :src="item.image" mode="aspectFill" :height=86></vimage>
            </div>
            <div class="column is-8 card-list-title-flex">
              <div class="card-list-title title-show-1-hidden">{{item.title}}</div>
              <div class="card-list-subtitle title-show-3-hidden">{{item.content}}</div>
            </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Switer from '@/components/switer.vue';
import { getHomeData } from '@/server/getData.js'
import Vimage from '@/components/vimage.vue';
export default {
  name: 'home',
  components: {
    Switer,
    Vimage,
  },
  data() {
    return {
      images: [],
      products: [],
      articles: [],
      show: false,
    }
  },
  created() {
    console.log('进入后展示');
    getHomeData().then((res) => {
      if (res.code === 200) {
        this.images = res.msg.image;
        this.products = res.msg.product;
        this.articles = res.msg.article;
        this.show = true;
      }
    })
  },
};
</script>
<style lang="scss" scoped>
</style>
