<template>
  <div>
    <div v-for="item in items" class="receive_components">
      <div class="date_time">{{ item.date_ch }}</div>
      <div class="receive_total">
        <div class="receive_total_title">
          <span>收款笔数</span>
          <span>合计</span>
        </div>
        <div class="receive_total_content">
          <span>{{ item.count }}</span>
          <span><span class="no_weight">￥</span>{{ item.total }}</span>
        </div>
      </div>
      <div v-for="(list,index) in item.receive" class="receive_list">
        <div><span>#{{ index+1 }}</span>         
        
         <template v-if="list.user_id > 0">
            (付款人:{{list.from_name}})
        </template>      
        <span class="show_time">{{ list.time }}</span>
        </div>
        <div class="receive_money_color">¥{{ list.amount }}</div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.receive_components{
  font-size: 0.8rem;
  .date_time{
    padding: 1rem;
    color: #999;
  }
  .receive_total{
    border-bottom: 1px solid #e6e6e6;
    background-color: #fff;
    padding: 0.8rem 1rem;
    .receive_total_title{
      color: #999;
      margin-bottom: 5px;
    }
    .receive_total_content{
      color: #000;
      font-size: 1.2rem;
      font-weight: bold;
    }
    .no_weight{
      font-size: 1rem;
      font-weight: normal;
    }
    div{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .receive_list{
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    font-size: 0.9rem;
    span{
      color: #999;
      margin-right: 1rem;
    }
    .receive_money_color{
      color: @theme-color;
      font-weight: bold;
    }
    .show_time{
        margin-left:0.5rem;
        color: #bbb;
        font-size: 0.8rem;
    }
  }
}
</style>
<script>
export default {
  props: ['items'],
};
</script>