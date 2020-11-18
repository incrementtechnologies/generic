<template>
  <div class="modal fade" id="authenticateOTPInput" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{blockedFlag ? 'Blocked Account' : 'Authentication via OTP'}}</h5>
          <button type="button" class="close" @click="hideModal()" aria-label="Close">
            <span aria-hidden="true" class="text-primary">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <!-- Step 1 inputs -->
          <span v-if="errorMessage !== null" class="text-danger text-center">
              <label style="width: 100%;"><b>Oops! </b>{{errorMessage}}</label>
          </span>
          <span v-if="successMessage !== null" class="text-primary text-center incre-row" >
            <i class="fa fa-check text-primary" style="font-size: 75px"></i>
            <label class="text-primary incre-row">{{successMessage}}</label>
          </span>
          <div v-if="blockedFlag === false && successMessage === null">
            <div class="form-group text-center">
              <label for="exampleInputEmail1 text-gray incre-row" style="width: 100%;">
                Please enter the OTP Code sent to your email address.
              </label>
              <span class="incre-row text-center">
                <label>
                  <input type="text" :id="'otp-' + index" maxlength="1" v-for="(item, index) in otp" :key="index" class="form-control otp-form-control" v-model="item.code" @keypress="otpHandler(index)" :style="{'margin-left': index === 0 ? '2%' : 0}">
                </label>
              </span>
            </div>
            <div class="form-group text-gray text-center" style="width: 100%; float: left;">
              <label style="width: 100%; float: left;">Didn't received an email? Click the link below.</label>
              <label class="action-link text-primary" @click="generateOTP()" v-if="resendFlag === false">Resend</label>
              <label class="action-link text-primary" v-if="resendFlag === true">Resending ...</label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="hideModal()">{{blockedFlag ? 'Close' : 'Cancel'}}</button>
          <button type="button" class="btn btn-primary" @click="verifyOtp()" v-if="successFlag === false">Authenticate</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 12px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */


/* Create a custom radio button */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

.form-radio-item {
padding-bottom: 15px;
padding-top: 15px;
}

/* When the radio button is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #2196F3;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.container .checkmark:after {
  top: 9px;
  left: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}
.form-control{
  min-height: 30px !important;
  overflow-y: hidden;
}
.input-group{
  margin-bottom: 15px !important;
}
.input-group-addon{
  width: 100px !important;
  background: #22b173 !important;
  color: #fff !important;
}

.modal{
  color: black !important;
}

.fa-spin{
  animation-duration: 0.50s;
}

.transfer-details label{
  line-height: 30px;
}

.otp-form-control{
  margin-right: 1%;
  width: 15%;
  float: left;
  text-align: center;
}

@media (max-width: 991px){
}
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
export default {
  data(){
    return {
      user: AUTH.user,
      auth: AUTH,
      config: CONFIG,
      otpUseCounter: 0,
      characterCounterFlag: false,
      otp: [{
        code: null
      }, {
        code: null
      }, {
        code: null
      }, {
        code: null
      }, {
        code: null
      }, {
        code: null
      }],
      common: COMMON,
      errorMessage: null,
      otpData: null,
      otpInput: null,
      successFlag: false,
      blockedFlag: false,
      successMessage: null,
      resendFlag: false,
      otpCode: ''
    }
  },
  methods: {
    show(){
      this.initOtp()
      $('#authenticateOTPInput').modal('show')
    },
    hideModal(){
      $('#authenticateOTPInput').modal('hide')
    },
    redirect(parameter){
      ROUTER.push(parameter)
    },
    initOtp(){
      this.characterCounterFlag = false
      this.otpInput = null
      this.successFlag = false
      this.errorMessage = null
      this.otpCode = ''
      this.successMessage = null
      for (var i = 0; i < this.otp.length; i++) {
        this.otp[i].code = null
      }
    },
    otpHandler(index){
      if(index < 5){
        $('#otp-' + (index + 1)).show().focus()
        this.characterCounterFlag = false
      }else{
        this.characterCounterFlag = true
        setTimeout(() => {
          this.otpInput = ''
          this.otp.map((item, index) => {
            this.otpInput += item.code
          })
        }, 100)
      }
    },
    verifyOtp(){
      this.errorMessage = null
      for (var i = 0; i < this.otp.length; i++) {
        if(this.otp[i].code === null){
          this.errorMessage = 'Invalid Code!'
          return
        }else{
          this.otpCode += this.otp[i].code
        }
      }
      if(this.errorMessage === null){
        this.successOTP()
      }
    },
    successOTP(){
      this.hideModal()
      this.$parent.successOTP(this.otpCode)
    }
  }
}
</script>
