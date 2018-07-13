<template>
  <div class="productnav">
    <template v-for="(item,index) in items">
      <div v-if="(default_id == 0 && index==0) || default_id==item.category_id" class="category_list has-text-primary" v-on:click="changeCategroy(item.category_id)">
        <span class="category_name">{{item.category_name}}</span>
        <span class="triangle-right"></span>
      </div>
      <div v-else class="category_list" v-on:click="changeCategroy(item.category_id)">
        <span class="category_name">{{item.category_name}}</span>
      </div>
    </template>
  </div>
</template>
<style lang="scss" scoped>
.productnav {
  display: flex;
  background-color: transparent;
  width: 100%;
  flex-direction: column;
  .category_list {
    padding: 10px 0px 10px 15px;
    border-bottom: 1px solid #ddd;
    color: #999;
    font-size: 0.8rem;
    .triangle-right {
      margin-top:5px;
      width: 0;
      height: 0;
      border-top: 5px solid transparent;
      border-right: 6px solid #fff;
      border-bottom: 5px solid transparent;
      float:right;
    }
    .category_name{
      padding-right:5px;
    }
  }
}
</style>
<script>
export default {
  name: "productnav",
  props: {
    items: {
      type: Array,
      required: true
    },
    value: {
      default: 0,
    },
  },
  data() {
    return {
      default_id: this.value
    };
  },
  methods: {
    changeCategroy(category_id) {
      if (this.default_id != category_id) {
        this.default_id = category_id
        this.$emit("getCategory", category_id);
        this.$emit('input', category_id)
      }
    }
  }
};
</script>