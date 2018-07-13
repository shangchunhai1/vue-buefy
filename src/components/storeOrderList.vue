<template>
<div class="store_order_list_dev_class">
  <div v-for="(order,index) in items" :key="order.id" class="order_list">
    <div class="order_title">
      <div class="store_image_div">
        <img v-if="order.user != ''"  class="store_image":src="order.user.image" alt="">
        <span v-if="order.user != ''" >{{order.user.nickname}}</span>
      </div>
      <div class="service">
        <div class="order_title_status">订单ID:{{ order.order_id }}</div>
      </div>
    </div>
    <div v-for="item in order.products" :key="item.id" class="product_list">
      <div class="product_list_div">
        <div class="product_image_list"><img :src="item.image_tool" /></div>
        <div class="product_list_detail">
          <div>{{item.name}}</div>
          <div>{{item.meta_title}}</div>
          <div>
            <span class="product_price">￥{{item.price}}</span>
          </div>
        </div>
      </div>      
    </div>
    <div class='order_info'>
      共{{order.total_quantity}}件商品
      <span class="margin_lr">运费：{{order.shipping_fee}}</span>
      合计：<span class="big_size">￥{{order.total}}</span>
    </div>
  </div>
</div>
</template>
<style lang="less">
.store_order_list_dev_class {
  .order_list {
    background-color: #fff;
    font-size: 0.8rem;
    margin-top: 1rem;
  }
  .order_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.3rem 0.7rem;
    color: #999;
    border-bottom: 1px solid #e6e6e6;
    .store_image_div {
      display: flex;
      align-items: center;
      span {
        padding: 0 10px;
        color: #444;
      }
    }
    .store_image {
      width: 25px;
      height: 25px;
      border-radius: 25px;
    }
  }
  .order_title_status {
    color: #f29564;
  }
  .product_list {
    display: flex;
    align-items: center;
    padding: 0.5rem 0.7rem;
    height: 6rem;
    color: #666;
    .product_list_div {
      background: #fafafa;
      height: 6rem;
      width: 100%;
      display: flex;
      align-items: center;
      .product_image_list {
        margin-right: 4%;
        width: 30%;
        height: 100%;
      }
      .product_image_list img {
        height: 100%;
      }
    }
  }
  .product_image_list {
    margin-right: 4%;
    width: 30%;
    height: 100%;
  }
  .product_image_list img {
    height: 100%;
  }
  .product_list_detail {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  .product_price {
    color: #f29564;
    margin-right: 0.5rem;
  }
  .product_price_sale {
    text-decoration: line-through;
    color: #949494;
  }
  .order_info {
    display: flex;
    padding: 0.3rem 0.7rem 0.3rem 0rem;
    justify-content: flex-end;
    color: #666;
    align-items: center;
    border-top: 1px solid #e6e6e6;
  }
  .margin_lr {
    margin: 0rem 0.7rem;
  }
  .big_size {
    font-size: 1rem;
  }
  .order_info_button {
    background-color: #fff;
    color: @theme-color;
    border: 1px solid @theme-color;
    border-radius: 1rem;
    padding: 0 0.5rem;
    margin-left: 0.4rem;
  }
  .button_color {
    color: @theme-color;
    border: 1px solid @theme-color;
  }
  .order_title_return_status {
    border: 1px solid #999;
    padding: 0 0.3rem;
    border-radius: 0.6rem;
    color: #999;
  }
  .border_top {
    border-top: 1px solid #e6e6e6;
  }
  .oder_time {
    display: flex;
    justify-content: space-between;
    padding: 0 0.7rem;
    color: #999;
  }
  .service {
    display: flex;
    align-items: flex-start;
  }
  .service img {
    margin-right: 0.3rem;
  }
  .order_time_detail {
    display: flex;
    flex-direction: column;
  }
  .order_time_detail span {
    padding-bottom: 0.5rem;
  }
}
</style>
<script>
export default {
  name: "orderlist",
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  components: {},
  data() {
    return {};
  },
  methods: {},
  created: function() {}
};
</script>
