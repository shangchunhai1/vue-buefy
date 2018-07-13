<template>
  <div class="img-inputer headimg-upload-div" :class="[themeClass, sizeClass, nhe ? 'nhe': '', ]" ref="box">
    
    <img style="width:50%;" :src="placeholderImg" class="img-inputer__imgae" v-if="placeholderImg != ''"/>
    <i v-else class="iconfont img-inputer__icon" v-html="iconUnicode"></i>
    <p class="img-inputer__placeholder">{{placeholder}}</p>

    <div class="img-inputer__preview-box" v-if="imgSelected">
      <img :src="dataUrl" class="img-inputer__preview-img headimg_upload">
    </div>
    <label :for="readonly ? '' : inputId" class="img-inputer__label"></label>
    <!-- 图片或文件选择后鼠标移入的提示-->
    <div class="img-inputer__mask" v-if="imgSelected && !noMask">
      <p class="img-inputer__file-name">{{fileName}}</p>
      <p class="img-inputer__change" v-if="readonly">{{readonlyTipText}}</p>
      <p class="img-inputer__change" v-else>{{bottomText}}</p>
    </div>
    <!-- input主体-->
    <input
        ref="inputer"
        v-if="capture"
        type="file"
        :name="name"
        :id="inputId"
        :accept="accept"
        capture="video"
        class="img-inputer__inputer"
        @change="handleFileChange"
    />
    <input
        ref="inputer"
        v-else
        type="file"
        :name="name"
        :id="inputId"
        :accept="accept"
        class="img-inputer__inputer"
        @change="handleFileChange"
    />
    <transition name="vip-fade">
      <div class="img-inputer__err" v-if="errText.length">{{errText}}</div>
    </transition>
  </div>
</template>


<script type="text/ecmascript-6">
import store from '../store'
import Exif from 'exif-js'
export default {
    name: "headimg-upload",
    props: {
        type: {
            default: "img",
            type: String
        },
        // 默认情况下可能会导致选择框弹出慢的问题，请针对具体化图片类型即可解决
        accept: {
            default: "image/*,video/*;",
            type: String
        },
        capture: {
            default: true,
            type: Boolean
        },
        id: {
            default: "",
            type: String
        },
        onChange: {
            default: null,
            type: Function
        },
        readonly: {
            type: Boolean,
            default: false
        },
        readonlyTipText: {
            default: "不可更改",
            type: String
        },
        bottomText: {
            default: "点击或拖拽图片以修改",
            type: String
        },
        placeholder: {
            default: "点击或拖拽选择图片",
            type: String
        },
        value: {
            default: undefined
        },
        icon: {
            default: "",
            type: String
        },
        customerIcon: {
            default: "",
            type: String
        },
        maxSize: {
            default: 5120,
            type: Number
        },
        size: {
            default: "",
            type: String
        },
        imgSrc: {
            default: "",
            type: String
        },
        nhe: {
            type: Boolean,
            default: false
        },
        noMask: {
            type: Boolean,
            default: false
        },
        theme: {
            type: String,
            default: ""
        },
        name: {
            type: String,
            default: "file"
        },
        imgshow: {
            type: String,
            default: "auto"  //aspectFill为等比例缩放,将最短边显示完整
        },
        hidden: { //是否隐藏上传框
            type: Boolean,
            default: false,
        },
        source: { //返回图片id标示
            type: String,
            default: '0',
        },
        placeholderImg: { //是否隐藏上传框
            type: String,
            default: '',
        },
    },
    data() {
        return {
            inputId: "",
            file: [],
            dataUrl: "",
            fileName: "",
            errText: ""
        };
    },
    computed: {
        imgSelected() {
            return !!this.dataUrl || !!this.fileName;
        },
        sizeHumanRead() {
            let rst = 0;
            if (this.maxSize < 1024) {
                rst = this.maxSize + "K";
            } else {
                rst =
                    (this.maxSize / 1024).toFixed(this.maxSize % 1024 > 0 ? 2 : 0) + "M";
            }
            return rst;
        },
        sizeClass() {
            if (this.size) {
                return `img-inputer--${this.size}`;
            }
        },
        themeClass() {
            return `img-inputer--${this.theme}`;
        },
        /**
         * @return {string}
         */
        ICON() {
            let rst = "";
            if (this.icon) {
                rst = this.icon;
            } else {
                rst = this.theme === "light" ? "img" : "clip";
            }
            return rst;
        },
        iconUnicode() {
            let iconMap = {
                img: "&#xe624;",
                clip: "&#xe62d;",
                img2: "&#xe62f;"
            };
            return this.customerIcon || iconMap[this.ICON];
        }
    },
    mounted() {
        this.inputId = this.id || this.gengerateID();
        if (this.imgSrc) {
            this.dataUrl = this.imgSrc;
        }
        // 阻止浏览器默认的拖拽时事件
        ["dragleave", "drop", "dragenter", "dragover"].forEach(e => {
            this.preventDefaultEvent(e);
        });
        // 绑定拖拽时间
        this.addDropSupport();
    },
    methods: {
        preventDefaultEvent(eventName) {
            document.addEventListener(
                eventName,
                function (e) {
                    e.preventDefault();
                },
                false
            );
        },
        addDropSupport() {
            let BOX = this.$refs.box;

            BOX.addEventListener("drop", e => {
                e.preventDefault();
                if (this.readonly) return false;
                this.errText = "";
                let fileList = e.dataTransfer.files;

                if (fileList.length === 0) {
                    return false;
                }

                if (fileList.length > 1) {
                    this.errText = "暂不支持多文件";
                    return false;
                }

                this.handleFileChange(fileList);
            });
        },
        gengerateID() {
            let nonstr = Math.random()
                .toString(36)
                .substring(3, 8);
            if (!document.getElementById(nonstr)) {
                return nonstr;
            } else {
                return this.gengerateID();
            }
        },
        handleFileChange(e) {
            if (typeof e.target === "undefined") this.file = e[0];
            else this.file = e.target.files[0];

            this.errText = "";
            let size = Math.floor(this.file.size / 1024);
            if (size > this.maxSize) {
                this.errText = `文件大小不能超过${this.sizeHumanRead}`;
                return false;
            }
            // 双向绑定
            this.$emit("input", this.file);

            this.imgPreview(this.file);

            this.fileName = this.file.name;

            this.resetInput();
        },
        imgPreview(file) {
            store.dispatch('setIsLoading',true)
            let self = this;
            if (!file || !window.FileReader) return;
            let Orientation = 0;
            //去获取拍照时的信息，解决拍出来的照片旋转问题  
            Exif.getData(file, function () {
                Orientation = Exif.getTag(this, 'Orientation');
                if (/^image/.test(file.type)) {
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = function () {
                        if (!self.hidden) {
                            self.dataUrl = this.result;
                        }
                        // 文件选择回调 && 两种绑定方式
                        if (self.source > 0) {
                            self.onChange && self.onChange(file, file.name, data, self.source);
                            self.$emit('onChange', file, file.name, data, self.source);
                            if (self.imgshow == 'auto') {
                                store.dispatch('setIsLoading',false)
                            }
                        } else {
                            self.onChange && self.onChange(self.file, self.file.name);
                            self.$emit("onChange", self.file, self.file.name);
                            if (self.imgshow == 'auto') {
                                store.dispatch('setIsLoading',false)
                            }
                        }
                        if (self.imgshow == 'aspectFill') {
                            console.log(Orientation)
                            let img = new Image();
                            img.src = this.result;
                            console.log('4444')
                            self.AutoResizeImage(img, Orientation)
                            console.log('77777')
                        }
                    };
                }
            });

        },
        compress(img, Orientation) {
            let self = this;
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext('2d');
            //瓦片canvas
            let tCanvas = document.createElement("canvas");
            let tctx = tCanvas.getContext("2d");
            let initSize = img.src.length;
            let width = img.width;
            let height = img.height;
            //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
            let ratio;
            if ((ratio = width * height / 10000) > 1) {
                console.log("大于100万像素");
                ratio = Math.sqrt(ratio);
                console.log('ratio' + ratio)
                width /= ratio;
                height /= ratio;
            } else {
                ratio = 1;
            }
            canvas.width = width;
            canvas.height = height;
            //        铺底色
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            //如果图片像素大于100万则使用瓦片绘制
            let count;
            if ((count = width * height / 1000000) > 1) {
                console.log("超过100W像素");
                count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
                //            计算每块瓦片的宽和高
                let nw = ~~(width / count);
                let nh = ~~(height / count);
                tCanvas.width = nw;
                tCanvas.height = nh;
                for (let i = 0; i < count; i++) {
                    for (let j = 0; j < count; j++) {
                        tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                    }
                }
            } else {
                ctx.drawImage(img, 0, 0, width, height);
            }
            //修复ios上传图片的时候 被旋转的问题
            if (Orientation != "" && Orientation != 1) {
                console.log('水电费水电费水电费')
                self.$emit("onOrientation", Orientation);
                switch (Orientation) {
                    case 6://需要顺时针（向左）90度旋转
                        this.rotateImg(img, 'left', canvas);
                        break;
                    case 8://需要逆时针（向右）90度旋转
                        this.rotateImg(img, 'right', canvas);
                        break;
                    case 3://需要180度旋转
                        this.rotateImg(img, 'right', canvas);//转两次
                        this.rotateImg(img, 'right', canvas);
                        break;
                }
            }
            //进行最小压缩
            let ndata = canvas.toDataURL('image/jpeg/gif', 0.5);
            tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
            
            return ndata;
        },
        rotateImg(img, direction, canvas) {
            //最小与最大旋转方向，图片旋转4次后回到原方向
            const min_step = 0;
            const max_step = 3;
            if (img == null) return;
            //img的高度和宽度不能在img元素隐藏后获取，否则会出错
            let height = img.height;
            let width = img.width;
            let step = 2;
            if (step == null) {
                step = min_step;
            }
            if (direction == 'right') {
                step++;
                //旋转到原位置，即超过最大值
                step > max_step && (step = min_step);
            } else {
                step--;
                step < min_step && (step = max_step);
            }
            //旋转角度以弧度值为参数
            let degree = step * 90 * Math.PI / 180;
            let ctx = canvas.getContext('2d');
            switch (step) {
                case 0:
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0);
                    break;
                case 1:
                    canvas.width = height;
                    canvas.height = width;
                    ctx.rotate(degree);
                    ctx.drawImage(img, 0, -height);
                    break;
                case 2:
                    canvas.width = width;
                    canvas.height = height;
                    ctx.rotate(degree);
                    ctx.drawImage(img, -width, -height);
                    break;
                case 3:
                    canvas.width = height;
                    canvas.height = width;
                    ctx.rotate(degree);
                    ctx.drawImage(img, -width, 0);
                    break;
                   
            }
             console.log('66666')
        },
        AutoResizeImage(img, Orientation) {
            console.log('Orientation' + Orientation)
            let self = this;
            let objImg = document.getElementsByClassName(
                "headimg_upload"
            )[0];
            let objImg_div = document.getElementsByClassName(
                "headimg-upload-div"
            )[0];
            let maxWidth = objImg_div.offsetWidth
            let maxHeight = objImg_div.offsetHeight
            img.onload = function () {
                let data = self.compress(img, Orientation);
                if (!self.hidden) {
                    self.dataUrl = data
                }
                var hRatio;
                var wRatio;
                var Ratio = 1;
                var w = img.width;
                var h = img.height;
                switch (Orientation) {
                    case 6://需要顺时针（向左）90度旋转
                        w = img.height;
                        h = img.width;
                        break;
                    case 8://需要逆时针（向右）90度旋转
                        w = img.height;
                        h = img.width;
                        break;                   
                }
                console.log('w ' + w)
                console.log('h ' + h)
                wRatio = maxWidth / w;
                hRatio = maxHeight / h;
                if (wRatio > hRatio) {
                    Ratio = wRatio
                } else {
                    Ratio = hRatio
                }
                w = w * Ratio;
                h = h * Ratio;
                objImg.style.height = Math.round(h) + "px";
                objImg.style.width = Math.round(w) + "px";
                if (w > h) {
                    objImg.style.marginLeft = Math.round((maxWidth - w) / 2) + "px";
                    objImg.style.marginTop = "0px";
                } else {
                    objImg.style.marginTop = Math.round((maxHeight - h) / 2) + "px";
                    objImg.style.marginLeft = "0px";
                }                
                store.dispatch('setIsLoading',false)
            }
            
        },
        resetInput() {
            let input = document.getElementById(this.inputId);
            let form = document.createElement("form");

            document.body.appendChild(form);

            let parentNode = input.parentNode;
            // 判断input 是否为最后一个节点
            let isLastNode = parentNode.lastChild === input;
            let nextSibling;

            // 如果后面还有节点，则记录下一个node，做位置标志
            // 如果本身已经是最后一个节点，则直接通过parentNode appendChild即可
            if (!isLastNode) {
                nextSibling = input.nextSibling;
            }

            form.appendChild(input);
            form.reset();

            isLastNode
                ? parentNode.appendChild(input)
                : parentNode.insertBefore(input, nextSibling);

            document.body.removeChild(form);
        }
    },
    watch: {
        imgSrc(newval) {
            this.dataUrl = newval;

            if (!newval) {
                this.file = [];
                this.errText = "";
                this.fileName = "";
            }
        },

        value(newval, oldval) {
            // 重置逻辑
            if (oldval && !newval) {
                this.file = [];
                this.dataUrl = "";
                this.errText = "";
                this.fileName = "";
            }
        }
    }
};
</script>

<style lang="less">
.img-inputer {
  position: relative;
  display: inline-block;
  width: 260px;
  height: 150px;
  border-radius: 5px;
  background: #f0f0f0;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.117647),
    0 1px 4px rgba(0, 0, 0, 0.117647);
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &--small {
    width: 160px;
    height: 100px;

    .img-inputer__placeholder {
      font-size: 12px;
      top: 65%;
    }
    .img-inputer__icon {
      font-size: 28px !important;
      top: 38%;
    }
    .inputer__imgae {
      width: 30%;
    }
  }

  &--large {
    width: 460px;
    height: 250px;
  }

  &:hover {
    transform: scale(1.015);
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
      0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
  }
  &.nhe:hover {
    transform: scale(1);
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.117647),
      0 1px 4px rgba(0, 0, 0, 0.117647);
  }

  &--light {
    background: #fbfdff;
    border: 1px solid #97a8be;
    box-shadow: none;

    .img-inputer__icon {
      color: #97a8be;
    }

    &:hover {
      transform: scale(1);
      box-shadow: none;
      border-color: #20a0ff;
    }
  }

  &__icon {
    position: absolute;
    font-size: 34px !important;
    left: 50%;
    top: 40%;
    color: #757575;
    transform: translate(-50%, -50%);
  }

  &__placeholder {
    position: absolute;
    margin: 0;
    font-size: 14px;
    width: 100%;
    color: #aaa;
    top: 62%;
    text-align: center;
  }

  &__preview-box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 5px;
    overflow: hidden;
    background: #333;
  }

  &__preview-img {
    position: relative;
    top: 0;
    z-index: 2;
    width: 100%;
  }

  &__label {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    cursor: pointer;
    margin-bottom: 0;

    &:hover {
      ~ .img-inputer__mask {
        display: block;
      }
    }
  }

  &__inputer {
    position: absolute;
    left: -9999px;
  }

  &__mask {
    display: none;
    position: absolute;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 5px;
    text-align: center;
    background: rgba(0, 0, 0, 0.22);
  }

  &__file-name {
    color: white;
    font-size: 13px;
    padding-top: 10px;
    margin: 0;
    display: inline-block;
    max-width: 90%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &__change {
    position: absolute;
    bottom: 0;
    margin: 0;
    font-size: 12px;
    border-radius: 0 0 5px 5px;
    background: rgba(0, 0, 0, 0.7);
    text-align: center;
    color: white;
    width: 100%;
    padding: 9px 0;
  }

  &__err {
    color: #e55;
    font-size: 12px;
    position: absolute;
    bottom: 0px;
    text-align: center;
    width: 100%;
    z-index: 1000;
  }
}

.vip-fade {
  &-enter-active,
  &-leave-active {
    transition: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: trnsform;
  }
  &-enter,
  &-leave-active {
    opacity: 0;
    transform: translateX(30%);
  }
}
</style>