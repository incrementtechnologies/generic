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
              <label><b>Oops! </b>{{errorMessage}}</label>
          </span>
          <br v-if="errorMessage !== null">
          <div class="form-group d-flex flex-column" v-bind:class="(item.row !== 'full' ? item.row + ' float-left' : '')" v-for="(item, index) in property.inputs" :key="index">
            
            <!-- Label -->
            <label v-if="item.inputType !== 'hidden'" v-bind:for="item.id" style="float: left; width: 100%;">
              {{item.label}}
              <label class="text-danger" v-if="item.required === true">*</label>
            </label>

            <!-- Error input validation -->
            <label class="text-danger" v-bind:for="item.id" v-if="(item.type === 'input' || item.type === 'textarea') && item.value !== null && item.validation.type === 'text' && (item.validation.size > item.value.length)" style="float: left; width: 100%;"><b>Oops!</b> Length must be greater than equal {{item.validation.size}}.</label>

            <label class="text-danger" v-bind:for="item.id" v-if="item.type === 'input' && item.value !== null && item.validation.type === 'email' && item.validation.flag === false" style="float: left; width: 100%;"><b>Oops!</b> Invalid email address.</label>

            <label class="text-danger" v-bind:for="item.id" v-if="(item.type === 'input') && item.value !== null && !isNaN(item.value) && item.validation.type === 'number' && (item.validation.size > parseFloat(item.value))" style="float: left; width: 100%;"><b>Oops!</b> Minimum value is {{item.validation.size}}.</label>

            <!-- Input Tag -->
            <input 
              v-bind:type="item.inputType" 
              class="form-control" 
              v-model="item.value" 
              v-if="item.type === 'input'" 
              :id="item.id"
              :value="item.value"
              v-bind:placeholder="item.placeholder" 
              v-bind:class="{'invalid-inputs': (item.value !== null && !isNaN(item.value) && item.validation.type === 'number' && (item.validation.size > parseFloat(item.value))) || (item.value !== null && item.validation.type === 'text' && (item.validation.size > item.value.length)) || (item.value !== null && item.validation.type === 'email' && item.validation.flag === false)}" 
              @keyup="validateTyping(item)" :disabled="item.disabled === true">

            <!-- Time Tag -->
            <date-picker
              v-if="item.type === 'time'"
              v-model="item.value"
              :type="'time'"
              :value-type="'HH:mm:ss'"
              :use12h="true"
              :id="item.id"
              :placeholder="item.placeholder"
              :format="'hh:mm A'"
              :input-class="'form-control'"
              :input-attr="{style: 'min-height: 50px !important;'}"
            ></date-picker>

            <!-- Date Tag -->
            <date-picker
              v-if="item.type === 'date'"
              v-model="item.value"
              :type="'date'"
              :value-type="'YYYY-MM-DD'"
              :use12h="true"
              :id="item.id"
              :placeholder="item.placeholder"
              :format="'MMM D, YYYY'"
              :input-class="'form-control'"
              :input-attr="{style: 'min-height: 50px !important;'}"
            ></date-picker>

            <!-- DateTime with limit -->
            <date-picker
              v-if="item.type === 'dateLimit'"
              v-model="item.value"
              :disabled-date="disabledDates"
              :type="'date'"
              :value-type="'YYYY-MM-DD'"
              :use12h="true"
              :id="item.id"
              :placeholder="item.placeholder"
              :format="'MMM D, YYYY'"
              :input-class="'form-control'"
              :input-attr="{style: 'min-height: 50px !important;'}"
            ></date-picker>

            <!-- DateTime Tag -->
            <date-picker
              v-if="item.type === 'datetime'"
              v-model="item.value"
              :type="'datetime'"
              :id="item.id"
              :value-type="'YYYY-MM-DD HH:mm:ss'"
              :use12h="true"
              :placeholder="item.placeholder"
              :format="'MMM, D, YYYY hh:mm A'"
              :input-class="'form-control'"
              :input-attr="{style: 'min-height: 50px !important;'}"
            >
            </date-picker>
            
            <!-- Non-Concatenated Location Tag -->
            <google-autocomplete-location
              v-if="item.type === 'location_non_concatenated'"
              v-bind:id="item.id"
              :property="googleProperty"
              ref="location"
              @onFinish="getNonConcatenated($event)"
            >
            </google-autocomplete-location>

            <!-- Concatenated Location Tag -->
            <google-autocomplete-location
              v-if="item.type === 'location_concatenated'"
              v-bind:id="item.id"
              :inputVal="item.value"
              :placeholder="item.placeholder"
              :property="googleProperty"
              ref="location"
              @onFinish="getConcatenated($event, item)">
            </google-autocomplete-location>

            <!-- Select Tag with specified value -->
            <select class="form-control form-control-custom" v-if="item.type === 'select_specified'" v-model="item.value" v-bind:placeholder="item.placeholder">
              <option v-for="(itemOption, indexOption) in item.options" v-bind:value="itemOption.value" :key="indexOption">{{itemOption.label}}</option>
            </select>

            <!-- Select Tag with decremental value -->
            <select class="form-control form-control-custom" v-if="item.type === 'select_decrement'" v-model="item.value" v-bind:placeholder="item.placeholder">
              <option v-for="(itemOption, indexOption) in item.options.max" v-bind:value="item.options.start - itemOption" :key="indexOption">{{(item.options.start - itemOption) + item.options.label}}</option>
            </select>

            <!-- Select Tag with incremental value -->
            <select class="form-control form-control-custom" v-if="item.type === 'select_increment'" v-model="item.value" v-bind:placeholder="item.placeholder">
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
.modal{
  z-index: 1050 !important;
}
.form-control{
  min-height: 50px !important;
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
.mx-datepicker,
.mx-input-wrapper {
  width: unset;
  position: unset;
  display: unset;
}
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

export default {
  data(){
    return {
      user: AUTH.user,
      config: CONFIG,
      errorMessage: null,
      parameter: null,
      concatenated: null,
      not_concatenated: {
        route: null,
        locality: null,
        region: null,
        country: null,
        latitude: 0,
        longitude: 0
      },
      googleProperty: {
        style: {
          height: '45px !important'
        },
        GOOGLE_API_KEY: CONFIG.GOOGLE_API_KEY,
        results: {
          style: {
          }
        },
        placeholder: 'Type Location'
      },
      lang: {
        formatLocale: {
          firstDayOfWeek: 1
        },
        monthBeforeYear: false
      }
    }
  },
  props: ['property'],
  components: {
    'google-autocomplete-location': require('src/components/increment/generic/location/GooglePlacesAutoComplete.vue'),
    DatePicker
  },
  methods: {
    disabledDates(date) {
      return date > new Date()
    },
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
    getConcatenated(event, item){
      if(event.route === null || event.route === ''){
        this.concatenated = null
        return
      }
      if(event.locality === null || event.locality === ''){
        this.concatenated = null
        return
      }
      if(event.country === null || event.country === ''){
        this.concatenated = null
        return
      }
      item.value = event.route + ', ' + event.locality + ', ' + event.country
    },
    getNonConcatenated(event) {
      let location = {
        route: event.route,
        locality: event.locality,
        region: event.region,
        country: event.country,
        latitude: event.latitude,
        longitude: event.longitude
      }
      this.not_concatenated = location
      let flag = false
      for (var i = 0; i < this.property.inputs.length; i++) {
        let item = this.property.inputs[i]
        if(item.variable === 'route'){
          flag = true
          break
        }
      }
      if(flag === false){
        this.property.inputs.push({
          row: 'full',
          label: 'Route',
          variable: 'route',
          placeholder: 'Enter route',
          value: location.route,
          required: true,
          id: 'route',
          type: 'input',
          inputType: 'hidden',
          validation: {
            size: 1,
            type: 'text'
          }})
        this.property.inputs.push({
          row: 'full',
          label: 'Locality',
          variable: 'locality',
          placeholder: 'Enter locality',
          value: location.locality,
          required: true,
          id: 'locality',
          type: 'input',
          inputType: 'hidden',
          validation: {
            size: 1,
            type: 'text'
          }})
        this.property.inputs.push({
          row: 'full',
          label: 'Region',
          variable: 'region',
          placeholder: 'Enter region',
          value: location.region,
          required: true,
          id: 'region',
          type: 'input',
          inputType: 'hidden',
          validation: {
            size: 1,
            type: 'text'
          }})
        this.property.inputs.push({
          row: 'full',
          label: 'Country',
          variable: 'country',
          placeholder: 'Enter country',
          value: location.country,
          required: true,
          id: 'country',
          type: 'input',
          inputType: 'hidden',
          validation: {
            size: 1,
            type: 'text'
          }})
        this.property.inputs.push({
          row: 'full',
          label: 'Latitude',
          variable: 'latitude',
          placeholder: 'Enter latitude',
          value: location.latitude,
          required: true,
          id: 'latitude',
          type: 'input',
          inputType: 'hidden',
          validation: {
            size: 1,
            type: 'text'
          }})
        this.property.inputs.push({
          row: 'full',
          label: 'Longitude',
          variable: 'longitude',
          placeholder: 'Enter longitude',
          value: location.longitude,
          required: true,
          id: 'longitude',
          type: 'input',
          inputType: 'hidden',
          validation: {
            size: 1,
            type: 'text'
          }})
      }else{
        this.property.inputs.map(item => {
          if(item.variable === 'route'){
            item.value = location.route
          }
          if(item.variable === 'locality'){
            item.value = location.locality
          }
          if(item.variable === 'latitude'){
            item.value = location.latitude
          }
          if(item.variable === 'longitude'){
            item.value = location.longitude
          }
          if(item.variable === 'region'){
            item.value = location.region
          }
          if(item.variable === 'country'){
            item.value = location.country
          }
          return item
        })
      }
    },
    validate(){
      var moment = require('moment')
      this.parameter = {}
      let inputs = this.property.inputs
      for (var i = 0; i < inputs.length; i++) {
        let item = inputs[i]
        if(item.required === true || (item.required === false && (item.value !== null || item.value !== ''))){
          // validate
          if(item.type === 'select_increment' || item.type === 'select_specified' || item.type === 'select_decrement'){
            this.parameter[item.variable] = item.value
          }else if(item.validation.type === 'text'){
            if(item.value === null && item.required){
              this.errorMessage = 'Fields with (*) are required'
              return false
            }else if(item.value !== null && item.validation.size > item.value.length){
              this.errorMessage = item.label + ' must be greater than equal to ' + item.validation.size
              return false
            }else{
              this.parameter[item.variable] = item.value
            }
          }else if(item.validation.type === 'date' || item.validation.type === 'datetime-local'){
            if(item.value === null && item.required){
              this.errorMessage = 'Fields with (*) are required'
              return false
            }else if(moment(item.value).isValid() === false){
              this.errorMessage = item.label + ' is invalid'
              return false
            }else{
              this.parameter[item.variable] = item.value
            }
          }else if(item.validation.type === 'time'){
            if(item.value === null){
              this.errorMessage = 'Fields with (*) are required'
              return false
            }else{
              this.parameter[item.variable] = item.value
            }
          }else if(item.validation.type === 'number'){
            if((item.value === null || item.validation.size > parseFloat(item.value)) && item.required){
              this.errorMessage = item.label + ' must be greater than equal to ' + item.validation.size
              return false
            }else{
              this.parameter[item.variable] = parseFloat(item.value)
            }
          }else if(item.validation.type === 'email'){
            if(AUTH.validateEmail(item.value) === false){
              this.errorMessage = item.label + ' is invalid'
              return false
            }else{
              this.parameter[item.variable] = item.value
            }
          } else if (item.validation.type === 'location_non_concatenated') {
            let exists = false
            for(var j = 0; j < inputs.length && !exists; j++) {
              let check = inputs[j]
              if(check.variable === 'route' && check.value !== null) {
                exists = true
              }
            }
            if(!exists) {
              this.errorMessage = item.label + ' is required'
              return false
            }
          } else if (item.validation.type === 'location_concatenated') {
            if((item.value === null || item.value === '') && item.required) {
              this.errorMessage = item.label + ' is required'
              return false
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
    dateFormatter(date){
      let d = new Date(date)
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      let year = d.getFullYear()

      if(month.length < 2){
        month = '0' + month
      }
      if(day.length < 2){
        day = '0' + day
      }
      return [year, month, day].join('-')
    },
    submit(){
      $('#loading').css({display: 'block'})
      if(this.validate()){
        this.addParams()
        let date = new Date(Date.now())
        console.log(this.dateFormatter(date))
        console.log('route', this.property.route)
        if(this.property.route === 'symptoms/create'){
          console.log(true)
          if(this.dateFormatter(date) < this.parameter.date){
            alert('Date is Advance')
            this.$parent.retrieve({created_at: 'desc'}, {column: 'created_at', value: ''})
          }else{
            console.log(false)
            this.APIRequest(this.property.route, this.parameter).then(response => {
              $('#loading').css({display: 'none'})
              if(response.data !== null){
                this.errorMessage = null
                this.hideModal()
                this.$parent.retrieve({created_at: 'desc'}, {column: 'created_at', value: ''})
              }else if(response.error !== null){
                for(let key of Object.keys(response.error.message)){
                  response.error.message[key][0] = 'Fields with (*) are required'
                  this.errorMessage = response.error.message[key][0]
                  break
                }
              }
            })
          }
        }else if(this.property.route === 'return'){
          this.errorMessage = null
          this.hideModal()
          this.$parent.retrieveModalValue(this.parameter)
          $('#loading').css({display: 'none'})
        }else{
          console.log(false)
          this.APIRequest(this.property.route, this.parameter).then(response => {
            $('#loading').css({display: 'none'})
            if(response.data !== null){
              this.errorMessage = null
              this.hideModal()
              this.$parent.retrieve({created_at: 'desc'}, {column: 'created_at', value: ''})
            }else if(response.error !== null){
              for(let key of Object.keys(response.error.message)){
                this.errorMessage = response.error.message[key][0]
                break
              }
            }
          })
        }
      }else{
        $('#loading').css({display: 'none'})
      }
    }
  }
}
</script>
