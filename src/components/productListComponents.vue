<template>
  <div class="productlist_components">
    <template v-if="items.length>0">
      <div v-if="type == 'one'" v-for="item in items" class="productlist_components_content">
        <div :to="{path:pathName,query:{'product_id':item.product_id}}" class="list">
          <div class="in_list">
            <img v-if="item.image_tool" :src="item.image_tool" alt="">
            <div class="in_list_right">
              <div>
                <p class="title">{{item.name}}</p>
                <p v-if="item.sale" class="product_sale">销量{{item.sale}}</p>
              </div>
              <div v-if="item.price" class="product_price">
                <span>¥{{item.price}}</span>
                <div class="product_action_image">
                  <div class="product_action_image_bg"><img v-on:click="addCart(item.store_product_id)" src="../assets/image/icon1.png" /></div>                  
                  <router-link class="product_action_image_bg" :to="{path:'/productForm',query:{'product_id':item.product_id}}"><img src="../assets/image/icon2.png" /></router-link>
                </div>
              </div>
            </div>
          </div>            
        </div>
      </div>
      <div class="two" v-if="type === 'two'">
        <div v-for="item in items" class="flex-1">
          <router-link :to="{path:pathName,query:{'product_id':item.product_id}}" class="list">
            <div class="in_list">
              <img v-if="item.image_tool" :src="item.image_tool" alt="">
              <p v-if="item.price" class="product_price">¥{{item.price}}
                <!-- <span>¥{{item.price}}</span> -->
                </p>
              <p v-if="item.sale" class="product_sale">销量{{item.sale}}</p>
              <p class="title">{{item.name}}</p>
            </div>            
          </router-link>
        </div>
      </div>
    </template>
    <div class="empty_product" v-else>
      无相关内容
    </div>
  </div>
</template>

<script>
export default {
  name: 'productListComponents',
  props: ['title', 'type', 'items','defaultcategoty','pathName'],
  methods: {
    addCart(store_product_id){
      this.$emit("addCart", store_product_id);
    },
  }
}
</script>

<style lang="less" scoped>
.productlist_components{
  .empty_product{
    padding:15px 10px;
    color:#666
  }
  .productlist_components_content {
    display: flex;
    align-items: center;
    width:100%;
    flex-wrap:wrap;
    background: #fff;
    .list{
      width: 100%;
      .in_list{
        padding:10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 80px;
        img {
          height: 100%;
          border: 1px solid #e6e6e6;
          width: 80px;
        }
        .in_list_right{
          display: flex;
          flex-direction: column;
          height: 100%;
          flex-grow: 2;
          padding-left: 1rem;
          justify-content: space-between;
          p{
            text-align: left;
          }
          .product_price{
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size:0.9rem;
            font-weight:400;                                                                                                                                                                                                     
            color:@theme-color;
            line-height: 0.9rem;
            word-wrap: break-word;
            word-break: break-all;
            .product_action_image{
              display: flex;
              .product_action_image_bg{
                width: 25px;
                height: 25px;
                margin-left: 0.5rem;
                img{
                  width: 100%;
                  height: 100%;
                  border: none;
                 
                }
              }
              
              
            }
          }
          .product_sale{
            font-size:0.7rem;
            line-height: 0.7rem;
            padding-top:10px;
            color:#999
          }
          .title {
            display: block;
            max-width: 100%;
            line-height: 1rem;
            font-size: 0.9rem;
            max-height: 2rem;
            color: #000;
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap: normal;
          }
        }
      }
    }
  }
  .two {
    display: flex;
    align-items: center;
    width:100%;
    flex-wrap:wrap;
    background: #fff;
    .flex-1{
      width:50%;
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    img {
      width:100%;
      border-radius: 0.5rem;
    }
    .list{
      padding: 6px;
    }
    .in_list{
      padding:5px;
      justify-content: center;
      text-align: center;
    }
    p{
      text-align: left;
    }
    .product_price{
      display: flex;
      align-items: center;
      font-size:0.8rem;
      font-weight:400;                                                                                                                                                                                                     
      color:#BA424E;
      line-height: 0.8rem;
      word-wrap: break-word;
      word-break: break-all;
      span{
        color: #999;
        font-size: 0.7rem;
        text-decoration:line-through;
        margin-left: 0.5rem;
      }
    }
    .product_sale{
      font-size:0.7rem;
      padding-top:3px;
      padding-bottom: 5px;
      color:#666
    }
    .title {
      display: block;
      max-width: 100%;
      line-height: 1rem;
      font-size: 0.95rem;
      height: 2rem;
      color: #222;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: normal;
    }
  }
}

</style>
