<template>
  <div>
    <div class="modal fade" id="quickTutorialNavigationModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-md" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary">
            <h5 class="modal-title" id="exampleModalLabel">Quick Tutorial</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close()">
              <span aria-hidden="true" class="text-white">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <span class="guide-row">
              <img :src="config.GUIDE[activeIndex].image" height="100px" width="100px" v-if="config.GUIDE[activeIndex].image !== null"/>
              <i class="fa text-primary" v-bind:class="config.GUIDE[activeIndex].icon" v-if="config.GUIDE[activeIndex].icon !== null" style="font-size: 100px;"></i>
              <h2 class="text-primary">{{config.GUIDE[activeIndex].title}}</h2>
              <p v-html="config.GUIDE[activeIndex].subtitle"></p>
            </span>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger" @click="markAsDone()" v-if="(config.GUIDE.length - 1) > activeIndex">Skip</button>
            <button class="btn btn-primary pull-right" @click="markAsDone()" v-if="(config.GUIDE.length - 1) === activeIndex">Finish</button>
            <button class="btn btn-primary pull-right" @click="next()" v-if="(config.GUIDE.length - 1) > activeIndex">Next</button>
            <button class="btn btn-warning pull-right" @click="previous()" v-if="activeIndex > 0" style="margin-right: 10px;">Previous</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.guide-row{
  width: 100%;
  float: left;
  min-height: 50px;
  overflow-y: hidden;
  text-align: center;
  margin-bottom: 50px;
  margin-top: 50px;
}
.modal-footer{
  display: unset;
}
</style>
<script>
import ROUTER from '../../../../router'
import AUTH from '../../../../services/auth'
import CONFIG from '../../../../config.js'
import axios from 'axios'
export default {
  mounted(){
    this.checkIfDoneTutorial()
  },
  data(){
    return {
      user: AUTH.user,
      config: CONFIG,
      activeIndex: 0
    }
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    checkIfDoneTutorial(){
      let parameter = {
        condition: [{
          value: this.user.userID,
          column: 'account_id',
          clause: '='
        }]
      }
      this.APIRequest('tutorial/retrieve', parameter).then(response => {
        if(response.data.length <= 0){
          $('#quickTutorialNavigationModal').modal('show')
        }
      })
    },
    previous(){
      if(this.activeIndex > 0){
        this.activeIndex--
      }
    },
    next(){
      if(this.activeIndex < this.config.GUIDE.length){
        this.activeIndex++
      }
    },
    markAsDone(){
      let parameter = {
        account_id: this.user.userID
      }
      this.APIRequest('tutorial/create', parameter).then(response => {
        if(response.data > 0){
          $('#quickTutorialNavigationModal').modal('hide')
        }
      })
    }
  }
}
</script>
