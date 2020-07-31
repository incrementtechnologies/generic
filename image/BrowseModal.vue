<template>
  <div>
    <div class="modal fade" :id="customId ? customId : 'browseImagesModal'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-md" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary">
            <h5 class="modal-title" id="exampleModalLabel">Images</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close()">
              <span aria-hidden="true" class="text-white">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <span class="search">
              <input type="text" class="form-control form-control-custom" v-model="searchValue" placeholder="Search something..." @keyup.enter="search()">
              <!-- <i class="fa fa-search" @click="search()"></i> -->
            </span>
            <span class="settings">
              <p v-if="errorMessage !== null" class="text-danger" style="margin-top: 10px;">
                <b>Opps!</b> {{errorMessage}}
              </p>
                <span class="image-holder" style="text-align: center;" @click="addImage()">
                  <i class="fa fa-plus" style="font-size: 60px; line-height: 200px;"></i>
                  <input type="file" id="Image" accept="image/*" @change="setUpFileUpload($event)">
                </span>
                <span v-bind:class="{'active-image': item.active === true }" class="image-holder" v-for="item, index in data" @click="select(index)" v-if="data !== null">
                  <img :src="config.BACKEND_URL + item.url"/>
                  <button type="button" class="btn btn-danger" id="deleteBtn" data-toggle="modal" data-target="#confirm-delete" v-if="item.active" @click="selectDeleteImage(item.id)">
                    <i class="fa fa-times"></i>
                  </button>
                </span>
            </span>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="close()">Cancel</button>
            <button class="btn btn-primary" @click="apply()">Apply</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for confirmation -->
     <div class="modal fade right" id="confirm-delete" tabindex="1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
      <div class="modal-dialog modal-side modal-notify modal-primary " role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Are you sure?</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" class="white-text">&times;</span>
            </button>
          </div>
          <div class="modal-body p-4" >
            <p>Do you really want to delete this photo?</p>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal" data-toggle="modal" data-target="#browseImagesModal">Cancel</button>
              <button class="btn btn-danger btn-ok" data-dismiss="modal" @click="deleteImage()" >Delete</button>
            </div>
        </div>
      </div>
    </div>

  </div>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
.bg-primary{
  background: $primary !important; 
}
#deleteBtn{
  position: absolute;
  top: 8px;
  right: 10px;
  border-radius: 20px;
}
.item{
  width: 100%;
  float: left;
}
.header, .search{
  width: 100%;
  float: left;
  height: 50px;
  text-align: center;
  line-height: 50px;
  text-align: center;
}

.header .fa-close{
  padding-right: 5px;
}

.settings{
  min-height: 200px;
  float: left;
  width: 100%;
  overflow-y: hidden;
}
.search .form-control-custom{
  width: 100%;
  float: left;
  height: 45px !important;
  margin-top: 2px;
  padding-top: 3px !important;
}
.search i{
  float: right;
  padding-right: 7px;
  margin-top: -50px;
  font-size: 14px !important;
}
.search i:hover{
  cursor: pointer;
}
.image-holder{
  position: relative;
  width: 200px;
  float: left;
  height: 200px;
  margin-bottom: 5px;
  border: solid 1px #ddd;
  border-radius: 2px;
}
.image-holder img{
  max-height: 200px;
  max-width: 100%;
  float: left;
}

.image-holder input{
  display: none;
  height: 200px;
  width: 200px;
}
.bottom-action{
  width: 100%;
  float: left;
  height: 40px;
  font-size: 10px;
}
.bottom-action .btn{
  float: left;
  height: 30px !important;
  padding-top: 5px !important; 
  margin-top: 5px;
  font-size: 10px !important;
  margin-left: 5px;
}
.image-holder:hover{
  cursor: pointer;
  background: #ffaa81;
}
.active-image{
  background: #ffaa81;
  border: solid 1px #ffaa81;
}
.active-image1{
  background: blue;
  border: solid 1px blue;
}
.settings .error{
  height: 50px;
  font-size: 10px;
  text-align: center;
  width: 100%;
  float: left;
  line-height: 50px;
}

</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import axios from 'axios'
export default {
  mounted(){
    this.search()
  },
  data(){
    return {
      idImage: null,
      user: AUTH.user,
      config: CONFIG,
      searchValue: null,
      data: null,
      prevIndex: null,
      loadingFlag: false,
      errorMessage: null,
      file: null
    }
  },
  props: ['customId'],
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    addImage(){
      $('#Image')[0].click()
    },
    setUpFileUpload(event){
      let files = event.target.files || event.dataTransfer.files
      if(!files.length){
        return false
      }else{
        this.file = files[0]
        this.createFile(files[0])
      }
    },
    createFile(file){
      let fileReader = new FileReader()
      fileReader.readAsDataURL(event.target.files[0])
      this.upload()
    },
    upload(){
      if(parseInt(this.file.size / 1024) > 1024){
        this.errorMessage = 'Allowed size is up to 1 MB only'
        this.file = null
        return
      }
      let formData = new FormData()
      formData.append('file', this.file)
      formData.append('file_url', this.file.name)
      formData.append('account_id', this.user.userID)
      $('#loading').css({'display': 'block'})
      axios.post(this.config.BACKEND_URL + '/images/upload?token=' + AUTH.tokenData.token, formData).then(response => {
        $('#loading').css({'display': 'none'})
        if(response.data.data !== null){
          this.search()
        }
      })
      this.prevIndex = null
    },
    search(){
      let parameter = null
      if(this.searchValue !== null && this.searchValue !== ''){
        parameter = {
          condition: [{
            value: '%' + this.searchValue + '%',
            column: 'url',
            clause: '='
          }, {
            value: this.user.userID,
            column: 'account_id',
            clause: '='
          }],
          sort: {
            created_at: 'desc'
          }
        }
      }else{
        parameter = {
          condition: [{
            value: this.user.userID,
            column: 'account_id',
            clause: '='
          }],
          sort: {
            created_at: 'desc'
          }
        }
      }
      this.loadingFlag = true
      this.APIRequest('images/retrieve', parameter).done(response => {
        this.loadingFlag = false
        if(response.data.length > 0){
          this.data = response.data
        }else{
          this.data = null
        }
      })
    },
    select(index){
      if(this.prevIndex === null){
        this.data[index].active = true
        this.prevIndex = index
      }else{
        if(this.prevIndex !== index){
          this.data[this.prevIndex].active = false
          this.data[index].active = true
          this.prevIndex = index
        }
      }
    },
    apply(){
      if(this.prevIndex !== null){
        this.$parent.manageImageUrl(this.data[this.prevIndex].url)
        this.data[this.prevIndex].active = false
        this.close()
      }
    },
    close(){
      if(!this.data){
        $('#browseImagesModal').modal('hide')
      }else{
        this.prevIndex = null
        $('#browseImagesModal').modal('hide')
      }
      this.data[this.prevIndex].active = false
      this.prevIndex = null
      $('#browseImagesModal').modal('hide')
    },
    selectDeleteImage(id){
      this.idImage = id
      $('#browseImagesModal').modal('hide')
    },
    deleteImage(){
      let params = {
        id: this.idImage
      }
      axios.post(this.config.BACKEND_URL + '/images/delete', params).then(response => {
        console.log(response)
        this.search()
      })
      this.prevIndex = null
      setTimeout(() => {
        $('#browseImagesModal').modal('show')
      }, 800)
    }
  }
}
</script>
