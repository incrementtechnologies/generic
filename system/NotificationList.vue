<template>
  <div class="ledger-summary-container">
    <button class="btn btn-primary pull-right" style="margin-bottom: 10px;" @click="showTransferModal('create')">Add Notification</button>
    <basic-filter 
      v-bind:category="category" 
      :activeCategoryIndex="0"
      :activeSortingIndex="0"
      @changeSortEvent="retrieve($event.sort, $event.filter)"
      @changeStyle="manageGrid($event)"
      :grid="['list', 'th-large']"></basic-filter>
    
    <table class="table table-bordered table-responsive" v-if="data !== null">
      <thead>
        <tr>
          <td>Payload</td>
          <td>Device</td>
          <td>Title</td>
          <td>Description</td>
          <td>Action</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :ke="index">
          <td>{{item.payload}}</td>
          <td>{{item.device}}</td>
          <td>{{item.title}}</td>
          <td>{{item.description}}</td>
          <td>
            <button class="btn btn-primary"><i class="fa fa-pencil"></i></button>
            <button class="btn btn-danger"><i class="fa fa-trash" @click="removeItem(item)"></i></button>
          </td>
        </tr>
      </tbody>
    </table>
    <empty v-if="data === null" :title="'No notifications available!'" :action="'Create an update now!'"></empty>
    <increment-modal :property="createModal"></increment-modal>
  </div>
</template>
<style scoped>
.ledger-summary-container{
  width: 99%;
  float: left;
  height: auto;
  margin-bottom: 100px;
  margin-top: 25px;
  margin-right: 1%;
}

.ledger-summary-container-header{
  width: 100%;
  float: left;
  height: 70px;
  border: solid 1px #ddd;
}
.summary-container-item{
  width: 100%;
  float: left;
  border-radius: 5px;
  min-height: 50px;
  overflow-y: hidden;
  border: solid 1px #ddd;
  margin-top: 10px;
  padding-left: 10px;
}
.summary-container-item .header{
  width: 100%;
  float: left;
  height: 50px;
  line-height: 50px;
  color: #555;
}
.summary-container-item .body{
  width: 100%;
  float: left;
  min-height: 50px;
  overflow-y: hidden;
  padding-right: 10px;
}

td i {
  padding-right: 0px !important;
  padding-left: 0px !important;
}

@media (max-width: 992px){
  .ledger-summary-container{
    width: 100%;
  }
}
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import CreateModal from './CreateNotification.js'
export default{
  mounted(){
    $('#loading').css({display: 'block'})
    this.retrieve({created_at: 'desc'}, {column: 'created_at', value: ''})
  },
  data(){
    return {
      user: AUTH.user,
      data: null,
      auth: AUTH,
      selecteditem: null,
      config: CONFIG,
      category: [{
        title: 'Sort by',
        sorting: [{
          title: 'Created ascending',
          payload: 'created_at',
          payload_value: 'asc'
        }, {
          title: 'Created descending',
          payload: 'created_at',
          payload_value: 'desc'
        }]
      }],
      filter: null,
      sort: null,
      createModal: CreateModal
    }
  },
  components: {
    'empty': require('components/increment/generic/empty/Empty.vue'),
    'basic-filter': require('components/increment/generic/filter/Basic.vue'),
    'increment-modal': require('components/increment/generic/modal/Modal.vue')
  },
  methods: {
    redirect(params){
      ROUTER.push(params)
    },
    showTransferModal(action, item = null){
      switch(action){
        case 'create':
          this.createModal = {...CreateModal}
          let inputs = this.createModal.inputs
          inputs.map(input => {
            input.value = null
          })
          this.createModal.params[0].value = this.user.userID
          break
        case 'update':
          let modalData = {...this.createModal}
          let parameter = {
            title: 'Update',
            route: 'system_notifications/update',
            button: {
              left: 'Cancel',
              right: 'Update'
            },
            sort: {
              column: 'created_at',
              value: 'desc'
            },
            params: [{
              variable: 'id',
              value: item.id
            }]
          }
          modalData = {...modalData, ...parameter} // updated data without
          let object = Object.keys(item)
          modalData.inputs.map(data => {
            if(data.variable === 'type'){
              data.value = item.type
            }
            if(data.variable === 'title'){
              data.value = item.title
            }
            if(data.variable === 'description'){
              data.value = item.description
            }
            if(data.variable === 'payload'){
              data.value = item.payload
            }
            if(data.variable === 'device'){
              data.value = item.device
            }
          })
          this.createModal = {...modalData}
          break
      }
      $('#createSysteNotificationModal').modal('show')
    },
    retrieve(sort, filter){
      if(sort !== null){
        this.sort = sort
      }
      if(filter !== null){
        this.filter = filter
      }
      if(sort === null && this.sort !== null){
        sort = this.sort
      }
      if(filter === null && this.filter !== null){
        filter = this.filter
      }
      let parameter = {
        condition: [{
          value: filter.value + '%',
          column: filter.column,
          clause: 'like'
        }],
        sort: sort
      }
      this.APIRequest('system_notifications/retrieve', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0){
          this.data = response.data
        }else{
          this.data = null
        }
      })
    },
    removeItem(item){
      let parameter = {
        id: item.id
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('system_notifications/delete', parameter).then(response => {
        this.retrieve(null, null)
      })
    }
  }
}
</script>
