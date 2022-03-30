<template>
  <div class="modal fade" id="connectionError" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-primary" id="exampleModalLabel">{{title}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true" class="text-primary">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <label>{{message}}</label>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">No</button>
          <button type="button" class="btn btn-primary" @click="onConfirm()">Yes</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";

.text-primary{
  color: $primary !important;
}
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
export default {
  mounted(){
  },
  data(){
    return {
      user: AUTH.user,
      auth: AUTH,
      config: CONFIG,
      id: null
    }
  },
  props: ['title', 'message'],
  methods: {
    show(id){
      console.log('[confirm]', id)
      this.id = id
      $('#connectionError').modal('show')
    },
    hideModal(){
      console.log('hide')
      this.id = null
      $('#connectionError').modal('hide')
    },
    onConfirm(){
      this.$emit('onConfirm', {id: this.id})
      this.id = null
      this.hideModal()
    }
  }
}
</script>
