<template>
  <div class="card">
    <div class="card-list productlist_top">
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
    <div class="columns productlist_content is-variable is-2 is-marginless is-mobile">
      <div class="column  is-paddingless is-3">
        <productnav :items="category" v-on:getCategory="changeCategory"> </productnav>
      </div>
      <div class="column is-9 has-background-white overflow-y-scroll">
        <div class="columns is-2 is-variable  is-multiline is-mobile">
          <div class="column is-6" v-for="item in product_data">
            <router-link :to="{ name: 'productinfo', params: { product_id: item.product_id }}">
              <div class="image is-square">
                <img :src="item.image" alt="">
              </div>
              <div class="card-list-price">¥{{item.price}}</div>
              <div class="card-list-sale">销量 {{item.sale}}</div>
              <div class="card-list-title">{{item.name}}</div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Productnav from "@/components/productnav";
import { getStoreProductDataList, getStoreProductDataByCategoryId } from '@/server/getData.js'
export default {
  components: {
    Productnav
  },
  data() {
    return {
      name: 'John Silver',
      isLoading: false,
      category: [],
      product_data: [],
    }
  },
  created() {
    getStoreProductDataList().then(res => {
      this.category = res.msg.category;
      this.product_data = res.msg.product;
      // if(res.msg.category.length){
      //   this.category_product_data[res.msg.category[0]['category_id']] = res.msg.product;
      // }
    });
  },
  methods: {
    changeCategory(category_id) {
      console.log('切换分类');
      console.log(category_id)
      getStoreProductDataByCategoryId(category_id).then(res => {
        this.product_data = res.msg;
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.productlist_content {
  position: fixed;
  height: 100%;
  width: 100%;
}
.productlist_top {
}
</style>
