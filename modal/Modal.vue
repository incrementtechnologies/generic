<template v-if="property !== null">
  <div class="modal fade" v-bind:id="property.id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" v-bind:class="property.size" role="document">
      <div class="modal-content">
        <div class="modal-header" v-bind:class="property.background">
          <h5 class="modal-title" id="exampleModalLabel">{{property.title}}</h5>
          <button type="button" class="close" @click="hideModal()" aria-label="Close">
            <span aria-hidden="true" v-bind:class="{'text-primary': property.background === null, 'text-white': property.background !== null}">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <span v-if="errorMessage !== null" class="text-danger text-center">
              <label><b>Opps! </b>{{errorMessage}}</label>
          </span>
          <br v-if="errorMessage !== null">
          <div class="form-group" v-bind:class="{'col-lg-6': item.row === 'half', 'col-lg-4': item.row === 'one-third', 'col-lg-3': item.row === 'one-fourth','float-left': item.row !== 'full'}" v-for="(item, index) in property.inputs" :key="index">
            
            <!-- Label -->
            <label v-bind:for="item.id" style="float: left; width: 100%;">
              {{item.label}}
              <label class="text-danger" v-if="item.required === true">*</label>
            </label>

            <!-- Error input validation -->
            <label class="text-danger" v-bind:for="item.id" v-if="(item.type === 'input' || item.type === 'textarea') && item.value !== null && item.validation.type === 'text' && (item.validation.size > item.value.length)" style="float: left; width: 100%;"><b>Opps!</b> Length must be greater than equal {{item.validation.size}}.</label>

            <label class="text-danger" v-bind:for="item.id" v-if="(item.type === 'input') && item.value !== null && item.validation.type === 'email' && (item.validation.flag === false)" style="float: left; width: 100%;"><b>Opps!</b> Invalid email address.</label>

            <label class="text-danger" v-bind:for="item.id" v-if="(item.type === 'input') && item.value !== null && !isNaN(item.value) && item.validation.type === 'number' && (item.validation.size > parseFloat(item.value))" style="float: left; width: 100%;"><b>Opps!</b> Minimum value is {{item.validation.size}}.</label>

            <!-- Input Tag -->
            <input v-bind:type="item.inputType" class="form-control" v-model="item.value" v-if="item.type === 'input'" v-bind:placeholder="item.placeholder" v-bind:class="{'invalid-inputs': (item.value !== null && !isNaN(item.value) && item.validation.type === 'number' && (item.validation.size > parseFloat(item.value))) || (item.value !== null && item.validation.type === 'text' && (item.validation.size > item.value.length)) || (item.value !== null && item.validation.type === 'email' && item.value.flag === false)}" @keyup="validateTyping(item)" :disabled="item.disabled === true">
            
            <!-- Select Tag with specified value -->
            <select class="form-control" v-if="item.type === 'select_specified'" v-model="item.value" v-bind:placeholder="item.placeholder">
              <option v-for="(itemOption, indexOption) in item.options" v-bind:value="itemOption.value" :key="indexOption">{{itemOption.label}}</option>
            </select>

            <!-- Select Tag with decremental value -->
            <select class="form-control" v-if="item.type === 'select_decrement'" v-model="item.value" v-bind:placeholder="item.placeholder">
              <option v-for="(itemOption, indexOption) in item.options.max" v-bind:value="item.options.start - itemOption" :key="indexOption">{{(item.options.start - itemOption) + item.options.label}}</option>
            </select>

            <!-- Select Tag with incremental value -->
            <select class="form-control" v-if="item.type === 'select_increment'" v-model="item.value" v-bind:placeholder="item.placeholder">
              <option v-for="(itemOption, indexOption) in item.options.max" v-bind:value="item.options.start + itemOption" :key="indexOption">{{(item.options.start + itemOption) + item.options.label}}</option>
            </select>

            <!-- Textarea tag -->
            <textarea class="form-control" v-bind:rows="item.textAreaRows" v-if="item.type === 'textarea'" v-bind:placeholder="item.placeholder" v-bind:class="{'invalid-inputs': item.value !== null && (item.validation.size > item.value.length)}" v-model="item.value"></textarea>

          </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="hideModal()">{{property.button.left}}</button>
            <button type="button" class="btn btn-primary" @click="submit()">{{property.button.right}}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

.form-control{
  min-height: 45px !important;
  overflow-y: hidden;
}
.input-group{
  margin-bottom: 10px !important;
}
.input-group-addon{
  width: 100px !important;
  background: #22b173 !important;
  color: #fff !important;
}
.invalid-inputs{
  border: solid 1px #ff0000 !important;
}
.float-left{
  float: left !important;
}
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
export default {
  data(){
    return {
      user: AUTH.user,
      config: CONFIG,
      errorMessage: null,
      parameter: null
    }
  },
  props: ['property'],
  methods: {
    hideModal(){
      $('#' + this.property.id).modal('hide')
    },
    validateTyping(item){
      switch(item.validation.type){
        case 'email':
          if(AUTH.validateEmail(item.value) === false){
            item.validation.flag = false
          }else{
            item.validation.flag = true
          }
          break
      }
    },
    validate(){
      this.parameter = {}
      let inputs = this.property.inputs
      for (var i = 0; i < inputs.length; i++) {
        let item = inputs[i]
        if(item.required === true){
          // validate
          if(item.type === 'select_increment' || item.type === 'select_specified' || item.type === 'select_decrement'){
            this.parameter[item.variable] = item.value
          }else if(item.validation.type === 'text'){
            if(item.value === null){
              this.errorMessage = item.label + ' is required'
              return false
            }else if(item.value !== null && item.validation.size > item.value.length){
              this.errorMessage = item.label + ' must be greater than equal to ' + item.validation.size
              return false
            }else{
              this.parameter[item.variable] = item.value
            }
          }else if(item.validation.type === 'date' || item.validation.type === 'datetime-local'){
            if(item.value === null){
              this.errorMessage = item.label + ' is required'
              return false
            }else{
              this.parameter[item.variable] = item.value
            }
          }else if(item.validation.type === 'number'){
            if(item.value === null || item.validation.size > parseFloat(item.value)){
              this.errorMessage = item.label + ' must be greater than equal to ' + item.validation.size
              return false
            }else{
              this.parameter[item.variable] = parseFloat(item.value)
            }
          }else if(item.validation.type === 'email'){
            if(AUTH.validateEmail(item.value) === false){
              this.errorMessage = item.label + ' is invalid'
            }else{
              this.parameter[item.variable] = item.value
            }
          }
        }else{
          if(item.value !== null || item.value !== ''){
            if(item.variable === 'account_id'){
              this.parameter[item.variable] = this.user.userID
            }else{
              this.parameter[item.variable] = item.value
            }
          }
        }
      }
      this.errorMessage = null
      return true
    },
    addParams(){
      for (var i = 0; i < this.property.params.length; i++) {
        let item = this.property.params[i]
        this.parameter[item.variable] = item.value
      }
    },
    submit(){
      $('#loading').css({display: 'block'})
      if(this.validate()){
        this.addParams()
        this.APIRequest(this.property.route, this.parameter).then(response => {
          this.hideModal()
          $('#loading').css({display: 'none'})
          this.$parent.retrieve(this.property.sort)
        })
        $('#loading').css({display: 'none'})
      }else{
        $('#loading').css({display: 'none'})
      }
    }
  }
}
</script>
