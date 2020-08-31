<template>
  <div class="modal fade" id="connectionError" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-primary" id="exampleModalLabel">{{title}}</h5>
          <button type="button" class="close" @click="hideModal()" aria-label="Close">
            <span aria-hidden="true" class="text-primary">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <label>{{message}}</label><br><br>

            <p><b>{{confirm}}</b></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="onConfirm()">Yes &nbsp;&nbsp;<i class="fas fa-trash"></i></button>
          <button type="button" class="btn btn-primary" @click="hideModal()">No take me back</button>
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
  props: ['title', 'message', 'confirm'],
  methods: {
    show(id){
      this.id = id
      $('#connectionError').modal('show')
    },
    hideModal(){
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
