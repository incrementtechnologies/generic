<template>
  <div>
    <div class="modal fade custom-modal" id="imageView" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-md image-modal">
        <div class="modal-content" id="mc-imageview">
          <div class="modal-body image-body-modal" id="image-body">
            <span class="close-icon" data-dismiss="modal" data-target="#imageView"><i class="fa fa-times"></i></span>
            <img :src="src" class="image-viewer" height="100%" width="100%" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
#imageView{
  z-index: 10000  !important;
  min-height: 50px !important;
  overflow: auto !important;
}

.image-modal{
  width: 384px !important;
}
#mc-imageview{
  background: inherit  !important;
}
#md-custom{
  width: 700px !important;
}
.image-viewer{
  width: 100%;
  height: 100%;
}
.modal{
  overflow:auto !important;
}
.modal-body{
  padding: 0px !important;
  position: relative;
}
.image-body-modal .close-icon{
  position: absolute;
  right: 0px;
  top: 0px;
  color: $primary;
  border: solid 1px $primary;
}

.image-body-modal .carousel-controller{
  position: absolute;
  top: 40%;
  left: 0;
  width: 100%;
  color: $primary;
}

.carousel-controller .chevron{
  font-size: 50px !important;
}

.image-body-modal .close-icon:hover, .carousel-controller .chevron:hover{
  cursor: pointer;
  color: $secondary;
}
.image-body-modal i{
  padding: 10px;
  font-size: 24px;
}
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
export default {
  mounted(){
  },
  data(){
    return {
      user: AUTH.user
    }
  },
  props: ['src'],
  methods: {
    redirect(path){
      ROUTER.push(path)
    },
    setImage(src){
      this.src = src
      $('#imageView').modal({
        backdrop: 'static',
        keyboard: true,
        show: true
      })
    }
  }
}
</script>
