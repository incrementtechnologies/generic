<template>
  <div class="img-modal" v-if="data.length > 0" :id="customId">
    <div class="img-holder" :style="getHeight()">
      <font-awesome-icon :icon="faTimesCircle" class="close-icon icon" @click="close()"></font-awesome-icon>
      <font-awesome-icon :icon="faChevronLeft" class="icon-prev icon" @click="setPrev()" v-if="activeIndex > 0"></font-awesome-icon>
      <font-awesome-icon :icon="faChevronRight" class="icon-next icon" @click="setNext()" v-if="activeIndex < (data.length - 1)"></font-awesome-icon>
      <span class="loading">
        <font-awesome-icon :icon="faCircleNotch" class="fa-spin"></font-awesome-icon>
      </span>
      <img :src="data[activeIndex].url" class="image-viewer gallery-image-viewer" :key="activeIndex" id="image-view"/>
      <div v-if="data[activeIndex].type === 'order_now'" class="actions"  :key="'a' + activeIndex">
        <span class="text">
          <label class="title pull-left">
            <b>{{data[activeIndex].text}}</b>
          </label>
        </span>
        <button class="btn btn-warning pull-right" @click="redirectExternal(data[activeIndex].link)">ORDER NOW</button>
      </div>
      <div v-if="data[activeIndex].type === 'redirect_link'" class="actions actions-secondary"  :key="'a' + activeIndex">
        <span class="text">
          <label class="title pull-left">
            <b>{{data[activeIndex].text}}</b>
          </label>
        </span>
        <button class="btn btn-primary pull-right" @click="redirectExternal(data[activeIndex].link)">PURCHASE NOW</button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
.img-modal{
  display: none;
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 100000;
  top: 0px;
  background: rgba(0, 0, 0, 0.7);
}

.img-holder{
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  position: absolute;
}

.gallery-image-viewer{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.close-icon{
  font-size: 42px;
  color: white;
  top: -15px;
  position: absolute;
  right: -21px;
  float: right;
  z-index: 100001;
}

.icon-prev, .icon-next{
  font-size: 42px;
  color: white;
  top: 45vh;
  position: absolute;
  z-index: 100001;
}

.icon-prev{
  left: -25px;
}

.icon-next{
  right: -25px;
}

.icon:hover{
  cursor: pointer;
  color: $warning;
}

.actions{
  position: absolute;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, .5);
  width: 100%;
  text-align: left;
}

.actions-secondary{
  position: absolute;
  bottom: 0;
  left: 0;
  background: $warning;
  width: 100%;
  text-align: left;
}

.actions .text{
  color: white;
  display: table;
  width: 70%;
  float: left;
  min-height: 50px;
  height: 8vh;
}

.actions label{
  display: table-cell;
  vertical-align: middle;
  padding-left: 10px;
  margin: 0px;
}

.btn{
  width: 30% !important;
  float: left;
}

.loading{
  font-size: 75px;
  width: 100%;
  color: $warning;
  position: relative;
  text-align: 'center';
  top: 40vh;
  display: block;
}

.fa-spin{
  animation-duration: 0.50s;
}

@media (max-width: 992px) {
  .icon-prev, .icon-next{
    top: 50%;
  }

  .actions .text{
    width: 100%;
    text-align: center;
  }

  .actions label{
    padding-left: 0px;
  }

  .btn{
    width: 100% !important;
  }

  .loading{
    top: 25vh;
  }
}
</style>
<script>
import jquery from 'jquery'
import { faTimesCircle, faChevronCircleRight, faChevronCircleLeft, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
export default {
  mounted(){
    this.onLoaded()
  },
  data(){
    return {
      activeIndex: 0,
      faTimesCircle: faTimesCircle,
      faChevronLeft: faChevronCircleLeft,
      faChevronRight: faChevronCircleRight,
      loading: true,
      faCircleNotch: faCircleNotch
    }
  },
  props: ['propStyle', 'data', 'customId'],
  methods: {
    close(){
      this.activeIndex = 0
      jquery('#' + this.customId).css({
        display: 'none'
      })
    },
    getHeight(){
      let height = jquery(window).height()
      let width = jquery(window).width()
      if(width > height){
        let iHeight = parseInt(height - (height * 0.05))
        return {
          height: iHeight + 'px !important',
          width: iHeight + 'px !important',
          top: parseInt(height - (height * 0.975)) + 'px !important',
          left: parseInt((width - iHeight) / 2) + 'px'
        }
      }else{
        let iWidth = parseInt(width - (width * 0.1))
        return {
          height: iWidth + 'px !important',
          width: iWidth + 'px !important',
          left: parseInt(width * 0.05) + 'px !important',
          top: parseInt((height - iWidth) / 2) + 'px'
        }
      }
    },
    setLoading(params){
      jquery('.loading').css({
        display: params
      })
    },
    setNext(){
      this.activeIndex++
      this.onLoaded()
    },
    setPrev(){
      this.activeIndex--
      this.onLoaded()
    },
    onLoaded(){
      this.setLoading('block')
      jquery('#image-view').on('load', function(){
        jquery('.loading').css({
          display: 'none'
        })
      })
      jquery('#image-view').on('error', function(){
        jquery('.loading').css({
          display: 'block'
        })
      })
    },
    redirectExternal(link){
      window.open(link, '_BLANK')
    },
    setImage(index){
      this.activeIndex = index
      jquery('#' + this.customId).css({
        display: 'block'
      })
    }
  }
}
</script>
