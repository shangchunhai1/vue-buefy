<template>
<div>
  <div style="margin-bottom:0.5rem;" v-if="type === 'car'">
    <div v-if="items.product" v-for="product in items.product" class="car_product_list">
      <img v-on:click="changeProductCheck(product.store_product_id)" v-if="product.selected" width="18" src="../assets/image/car_selected.png" />
      <img v-on:click="changeProductCheck(product.store_product_id)" v-else width="18" src="../assets/image/car_select.png" />
      <img class="car_product_list_image" height="100%" :src="product.image" />
      <div v-if="product.update_status" class="product_list_detail_edit">
        <div class="product_list_detail_edit_button_group">
          <span v-on:click="productQuantityAction(product.store_product_id,'sub')">-</span>
          <input v-on:input="countTotal" type="text" v-model="product.quantity">
          <span v-on:click="productQuantityAction(product.store_product_id,'add')">+</span>
        </div>
        <div v-on:click="changeProductQuantity(product.store_product_id)" class="product_list_detail_over">完成</div>
      </div>
      <div v-else class="product_list_detail">
        <div class="car_product_list_name_content"><span style="width:98%">{{product.name}}</span><img v-on:click="changeProductEdit(product.store_product_id)" width="15" height="16" src="../assets/image/car_edit.png" /></div>
        <div style="display:flex;align-items: center;justify-content: space-between;">
          <div>
            <span class="product_price">￥{{product.price}}</span>
          </div>
          <span>x{{product.quantity}}</span>
        </div>
      </div>
    </div>
  </div>
  <div style="margin-bottom:0.5rem;" v-if="type === 'confirm'">
    <div v-for="product in items.products" class="car_product_list">
      <img class="car_product_list_image" height="100%" :src="product.image_tool" />
      <div class="product_list_detail">
        <div class="car_product_list_name_content"><span style="width:98%">{{product.name}}</span></div>
        <div style="display:flex;align-items: center;justify-content: space-between;">
          <div>
            <span class="product_price">￥{{product.price}}</span>
          </div>
          <span>数量:<span v-on:click="changeQuantity(product.product_id,'subtract')" class="quantity_action">-</span>{{product.quantity}}<span v-on:click="changeQuantity(product.product_id,'add')" class="quantity_action">+</span></span>
        </div>
      </div>
    </div>
  </div>
  <div v-if="type === 'return'" v-for="item in items" :key="item.id" class="car_product_list">
    <input v-on:click="changeChecked(item.product_id,$event)" checked type="checkbox" />
    <img height="100%" :src="item.image_tool" />
    <div class="product_list_detail">
      <div>{{item.name}}</div>
      <div>{{item.meta_title}}</div>
      <div>
        <span class="product_price">￥{{item.price}}</span>
        <span>数量:<span v-on:click="changeQuantity(item.product_id,'subtract')" class="quantity_action">-</span>{{item.quantity}}<span v-on:click="changeQuantity(item.product_id,'add')" class="quantity_action">+</span></span>
      </div>
    </div>
  </div>
  <div v-if="type === 'returnDeatail'" v-for="item in items" :key="item.id" class="car_product_list">
    <img height="100%" :src="item.image_tool" />
    <div class="product_list_detail">
      <div>{{item.name}}</div>
      <div>{{item.meta_title}}</div>
      <div>
        <span class="product_price">￥{{item.price}}</span>
        <span>数量:{{item.quantity}}</span>
      </div>
    </div>
  </div>
</div>
</template>
<style>
.car_product_list{
  display: flex;
  align-items: center;
  padding:0.9rem 0.7rem;
  border-bottom: 1px solid #e6e6e6;
  height: 6rem;
  color: #666;
  background-color: #fff;
  font-size: 0.8rem;
}
.detail{
  background: none !important;
}
.car_product_list_image{
  margin-right: 2%;
  margin-left: 2%;
  border: 1px solid #e6e6e6;
}
.product_list_detail{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 80%;
}
.product_list_detail_edit{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 70%;
}
.product_list_detail_edit_button_group{
  display: flex;
  width: 70%;
}
.product_list_detail_edit_button_group span{
  width: 15%;
  display: flex;
  border: 1px solid #e6e6e6;
  align-items: center;
  justify-content: center;
}
.product_list_detail_edit_button_group input{
  width: 68%;
  margin: 0 1%;
  text-align: center;
  border: 1px solid #e6e6e6;
}
.product_list_detail_over{
  background-color: #ff7600;
  color: #fff;
  height: 100%;
  width: 28%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.product_price{
  color: #F29564;
}
.product_price_sale{
  text-decoration:line-through;
  color:#949494;
}
.quantity_action{
  display: inline-flex;
  border: 1px solid #e6e6e6;
  width: 1rem;
  height: 1rem;
  align-items: center;
  justify-content: center;
  margin: 0 0.3rem;
}
.car_shop_info{
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  padding: 0.5rem 0.7rem;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
}
.car_product_list_name_content{
  display: flex;
}
</style>
<script>
import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
import { changeCartProductQuantity } from '../utils/request/product'
export default {
  name: 'carlist',
  props: ['items','type','issyn'],
  components:{
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
  },
  data () {
    return {
    }
  },
  methods: {
    changeChecked(product_id,obj){
      var param = [];
      param['product_id'] = product_id;
      param['checked'] = obj.srcElement.checked;
      this.$emit('listenchild',param);
    },
    changeQuantity(product_id,action_name,index){
      var param = [];
      param['product_id'] = product_id;
      param['action_name'] = action_name;
      param['index'] = index;
      this.$emit('listenchildquantity',param);
    },
    //计算总计
    countTotal(){
      this.$emit('listenproductcountchild');
    },
    //加减商品数量
    productQuantityAction(store_product_id,action){
      var param = [];
      param['store_product_id'] = store_product_id;
      param['action'] = action;
      this.$emit('listenproductquantityactionchild',param);
    },
    //保存修改的商品数量
    changeProductQuantity(store_product_id){
      var data = [];
      data['store_product_id'] = store_product_id;
      for(var i=0;i<this.items.product.length;i++){
        if(this.items.product[i].store_product_id == store_product_id){
          data['quantity'] = this.items.product[i].quantity;
          //将数量同步到服务器
          changeCartProductQuantity(data).then((res)=>{
          });
        }
      }
      this.$emit('listenproducteditchild',store_product_id);
    },
    //商品编辑状态开启&关闭
    changeProductEdit(store_product_id){
      this.$emit('listenproducteditchild',store_product_id);
    },
    //商品选中&取消选择
    changeProductCheck(store_product_id){
      this.$emit('listenproductchild',store_product_id);
    }
  }
}
</script>
