<template>
  <div class="img-modal" v-if="data.length > 0" :id="customId">
    <div class="img-holder" :style="propStyle">
      <font-awesome-icon :icon="faTimesCircle" class="close-icon icon" @click="close()"></font-awesome-icon>
      <font-awesome-icon :icon="faChevronLeft" class="icon-prev icon" @click="setPrev()" v-if="activeIndex > 0"></font-awesome-icon>
      <font-awesome-icon :icon="faChevronRight" class="icon-next icon" @click="setNext()" v-if="activeIndex < (data.length - 1)"></font-awesome-icon>
      <img :src="data[activeIndex].url" class="image-viewer"/>
      <div v-if="data[activeIndex].type === 'order_now'" class="actions">
        <span class="text">
          <label class="title pull-left">
            <b>{{data[activeIndex].text}}</b>
          </label>
        </span>
        <button class="btn btn-warning pull-right" @click="redirectExternal(data[activeIndex].link)">ORDER NOW</button>
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
  background: rgba(0, 0, 0, 0.7);
}

.img-holder{
  text-align: center;
  margin: auto;
  margin-top: 0px;
  position: relative;
}

img{
  width: 100%;
  height: auto;
}

.close-icon{
  font-size: 42px;
  color: white;
  top: 21px;
  position: relative;
  right: -21px;
  float: right;
}

.icon-prev, .icon-next{
  font-size: 42px;
  color: white;
  top: 50vh;
  position: absolute;
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

@media (max-width: 992px) {
  .img-holder{
    width: 90% !important;
    margin-left: 5% !important;
    margin-right: 5% !important;
    margin-top: 100px;
  }

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
}
</style>
<script>
import $ from 'jquery'
import { faTimesCircle, faChevronCircleRight, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'
export default {
  mounted(){
  },
  data(){
    return {
      activeIndex: 0,
      faTimesCircle: faTimesCircle,
      faChevronLeft: faChevronCircleLeft,
      faChevronRight: faChevronCircleRight
    }
  },
  props: ['propStyle', 'data', 'customId'],
  methods: {
    close(){
      this.activeIndex = 0
      $('#' + this.customId).css({
        display: 'none'
      })
    },
    setNext(){
      this.activeIndex++
    },
    setPrev(){
      this.activeIndex--
    },
    redirectExternal(link){
      window.open(link, '_BLANK')
    },
    setImage(index){
      this.activeIndex = index
      $('#' + this.customId).css({
        display: 'block'
      })
    }
  }
}
</script>
