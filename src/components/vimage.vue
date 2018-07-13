<template>
  <div class="vimage-div" :style="styleC" ref="vimagediv">
    <img :src="src" :alt="title" class="vimage-com">
  </div>
</template>
<script>
/**
 * mode的值
 * 1.scaleToFill (宽高都为100 默认值)
 * 2.aspectFit  长边可以显示完全
 * 3.aspectFill 短边可以显示完全
 * 4.widthFix 宽度不变，高度自动变化，保持原图宽高比不变
 * 5.heightFix 高度不变，宽度自动变化，保持原图宽高比不变
 */
export default {
  name: 'vimage',
  props: {
    src: {
      type: String,
      require: true,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    mode: {
      type: String,
      default: 'scaleToFill',
    },
  },
  mounted() {
    const that = this;
    const divobj = this.$refs.vimagediv;
    //const trueWidth = (this.width > divobj.clientWidth) ? divobj.clientWidth : this.width;
   // divobj.style.height = this.height;
    //divobj.style.width = trueWidth;
    const trueHeight = divobj.clientHeight;
    const trueWidth = divobj.clientWidth;
    const obj = this.$refs.vimagediv.children[0];
    const image = new Image();
    image.src = this.src; // 获取图像路径
    image.onload = () => {
      const imgWidth = image.width; // 获取图像宽度
      const imgHeight = image.height; // 获取图像高度
      let scale = 0;
      switch (that.mode) {
        case 'scaleToFill':// 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素
          obj.style.height = '100%';
          obj.style.width = '100%';
          divobj.style.height = 'auto'
          break;
        case 'aspectFit':// 长边可以显示出来
          if (imgWidth >= imgHeight) {
            scale = image.width / trueWidth;
            obj.width = trueWidth;
            obj.height = imgHeight / scale;
            obj.style.marginTop = `${Math.round((trueHeight - (imgHeight / scale)) / 2)}px`;
          } else {
            scale = image.height / trueHeight;
            obj.width = imgWidth / scale;
            obj.height = trueHeight;
            obj.style.marginLeft = `${Math.round((trueWidth - (imgWidth / scale)) / 2)}px`;
          }
          break;
        case 'aspectFill':// 短边可以显示出来
          if (imgWidth <= imgHeight) {
            scale = imgWidth / trueWidth;
            obj.width = trueWidth;
            obj.height = imgHeight / scale;
            obj.style.marginTop = `${Math.round((trueHeight - (imgHeight / scale)) / 2)}px`;
          } else { // 高度短
            scale = imgHeight / trueHeight;
            obj.width = imgWidth / scale;
            obj.height = trueHeight;
            obj.style.marginLeft = `${Math.round((trueWidth - (imgWidth / scale)) / 2)}px`;
          }
          break;
        case 'widthFix': // 宽度不变，高度自动变化，保持原图宽高比不变
          scale = imgWidth / trueWidth;
          obj.width = trueWidth;
          obj.height = imgHeight / scale;
          obj.style.marginTop = `${Math.round((trueHeight - (imgHeight / scale)) / 2)}px`;
          break;
        case 'heightFix': // 高度不变，宽度自动变化，保持原图宽高比不变
          scale = imgHeight / trueHeight;
          obj.width = imgWidth / scale;
          obj.height = trueHeight;
          obj.style.marginLeft = `${Math.round((trueWidth - (imgWidth / scale)) / 2)}px`;
          break;
        default:
          break;
      }
    };
  },
  computed: {
    styleC() {
      //return `width:${this.width}px;height:${this.height}px`;
    },
  },
};
</script>
<style scoped>
.vimage-div {
  display: inline-block;
  overflow: hidden;
  border: 1px solid red;
  width: 100%;
  height: 100%;
}
.vimage-div img {
  max-width: none !important;
  display: block;
}
</style>
