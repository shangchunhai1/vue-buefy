<template>
  <div class="empty">
    <img v-if="type === 'order' || type === 'shareamount' " width="40%" src="../assets/image/emptyorder.png" />
    <span>{{ item.title }}</span>
    <span>{{ item.subtitle }}</span>
  </div>
</template>
<script>
export default {
  name: 'empty',
  props:['type','item'],
  data () {
    return {      
    }
  },
  methods: {
  },
  created:function(){
  }
}
</script>
<style>
.empty{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 0.8rem;
}
.empty span, empty img{
  margin-top: 0.5rem;
}
</style>
