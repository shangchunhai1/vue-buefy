<template>
  <div>
    <template v-for="item in items">
        <div class="transaction_title">
          <div>{{item.name}}</div>
          <div class="item_total">合计:{{item.total}}</div>
        </div>
        <div v-for="content in item.list" :key="content.id" class="transaction_list">
          <div class="transaction_content">
            <img v-if="content.type && content.type == 'AWARD' && type != 'award'" src="../assets/image/money.png" />
            <img v-if="content.type && content.type == 'ONLINE' && type != 'award'" src="../assets/image/transaction.png" />
            <div class="trancation_amount"><span class="content_amount">{{content.type_name}}</span><span>{{content.times}}&nbsp;&nbsp;&nbsp;{{content.time}}</span></div>
          </div>
          <div v-bind:class="[content.amount > 0 ? tran_color_text : '']" style="width:40%;text-align:right;font-size:1.2rem;">
            <div>{{content.amount}}</div>
            <template v-if="type=='award'">
              <span v-if="content.status=='1'" class="trancation_amount">(已结算)</span>
              <span v-else  class="trancation_amount">(未结算)</span>
            </template>
            <template v-else>
              <span class="trancation_amount">(订单:{{content.order_id}})</span>
            </template>
          </div>
        </div>
    </template>
  </div>
</template>
<style lang="less">
  .tran_color_text{
    color: @theme-color;
  }
  .transaction_title{
    padding: 0.3rem 0.7rem;
    font-size: 1rem;
    display: flex;
    div{
      flex:1;
    }
    .item_total{
      text-align: right;
    }
  }
  .transaction_list{
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0.7rem;
    align-items: center;
    background-color: #fff;
    font-size: 0.8rem;
    border-bottom: 1px solid #e6e6e6;    
    .content_amount{
      color: #333;
      font-size:1rem;
    }
    .trancation_amount{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      font-size:0.8rem;
      color: #999;
      
    }
  }
  .transaction_content{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 60%;
    
  }
  .transaction_content img{
    width: 20%;
    margin-left: 4%;
    margin-right: 10%;
  }
  .transaction_content div{
    width: 66%;
    overflow: hidden;
  }
  .trancation_date{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 16%;
    .tran_date{
      font-size:1rem;
      color:#999;
      padding:3px;
    }
    .tran_time{
      font-size:1rem;
      color:#999;
      padding-left:6px;
    }
  }
</style>
<script>
export default {
  name: 'transactionlist',
  props: ['items','type'],
  components:{
  },
  data () {
    return {
      tran_color_text:'tran_color_text',
    }
  }
}
</script>
