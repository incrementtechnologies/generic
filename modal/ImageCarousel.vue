<template>
  <div class="img-modal" @click="close()">
    <div class="img-holder" :style="propStyle">
      <font-awesome-icon :icon="faTimesCircle" class="close-icon" @click="close()"></font-awesome-icon>
      <img :src="src" class="image-viewer" height="100%" width="100%" />
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

.close-icon:hover{
  cursor: pointer;
}

@media (max-width: 992px) {
  .img-holder{
    width: 90% !important;
    margin-left: 5% !important;
    margin-right: 5% !important;
    margin-top: 100px;
  }
}
</style>
<script>
import $ from 'jquery'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
export default {
  mounted(){
  },
  data(){
    return {
      src: null,
      faTimesCircle: faTimesCircle
    }
  },
  props: ['propStyle'],
  methods: {
    close(){
      this.src = null
      $('.img-modal').css({
        display: 'none'
      })
    },
    setImage(src){
      console.log(src)
      this.src = src
      $('.img-modal').css({
        display: 'block'
      })
    }
  }
}
</script>
