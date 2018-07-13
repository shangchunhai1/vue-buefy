<template>
  <div>
    <div class="">
      <div class="columns  has-background-white is-3 is-variable is-marginless is-multiline is-mobile card-list-bottom-border" v-for="item in contactlist">
        <div class="column is-3">
          <figure class="image is-64x64">
            <img :src="item.image" alt="">
          </figure>
        </div>
        <div class="column is-9 padding-left-less card-list-title-flex">
          <div class="card-list-title title-show-1-hidden">
            <div class="columns   is-marginless is-multiline is-mobile">
              <div class="column is-6 is-paddingless">{{item.user_name}}</div>
              <div class="column card-list-subtitle is-6 is-paddingless has-text-right">{{item.createDate}}</div>
            </div>
            
          </div>
          <div class="card-list-subtitle title-show-1-hidden">{{item.content}}</div>
        </div>
        <!-- <div class="column">
          <article class="media">
          <figure class="media-left">
            <p class="image is-64x64">
              <img :src="item.image" alt="">
            </p>
          </figure>
          <div class="media-content">
            <div class="content card-list-title-flex">
              <div class="card-list-title title-show-1-hidden">{{item.user_name}}</div>
              <div class="card-list-subtitle title-show-1-hidden">{{item.content}}</div>
            </div>            
          </div>
        </article>
        </div> -->
        
      </div>
    </div>

  </div>
</template>

<script>
import { getContactList } from '@/server/getData.js';
export default {
  data() {
    return {
      contactlist: [],
    }
  },
  created() {
    getContactList().then((res) => {
      this.contactlist = res;
      console.log(this.contactlist)
    })
  },
}
</script>

<style scoped>
</style>