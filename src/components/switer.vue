<template>
  <div>
  <swiper :options="swiperOption" ref="mySwiper">
    <!-- slides -->
    <swiper-slide v-for="item in images">
      <a :href="item.navpath">
        <img :src="item.url" alt="">
      </a>      
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <!-- Optional controls -->
  </swiper>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

  export default {
    name: 'switer',
    components: {
      swiper,
      swiperSlide
    },
    props:{
      images:{ // 图片数组
        type: Array,
        required: true,
        default: [],
      },
      loopBool:{ //是否循环
        type: Boolean,
        default: true,
      },
      autoBool:{ // 自动轮播
        type: Boolean,
        default: true,
      },
      autoTime:{ // 轮播时间
        type: Number,
        default: 3000,
      }
    },
    data() {
      return {
        swiperOption: {          
          autoplay: {
            delay: this.autoTime,
            stopOnLastSlide: !this.autoBool,
            disableOnInteraction: true,
          },
          // scrollbar: {
          //   el: '.swiper-scrollbar',
          //   draggable: true,
          // },
          loop : this.loopBool, //循环播放
          controller: false,
          watchSlidesProgress : true,
          watchSlidesVisibility : true,
          pagination: {
            el: '.swiper-pagination',
            bulletActiveClass: 'my-bullet-active',
          }
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      console.log('this is current swiper instance object', this.swiper)
      //this.swiper.slideTo(3, 1000, false)
      //this.swiper.scrollbar.$dragEl.css('background','#ff6600');
    }
  }
</script>

<style lang="scss">
@import "../sass/custom.scss";
.my-bullet-active{
  background: $primary;
  opacity:1;
}
.swiper-slide{
  height: auto !important;
  
}
.swiper-slide img {
    height: 100% !important;
  }
</style>