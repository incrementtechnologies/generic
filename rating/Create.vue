<template>
  <div class="modal" id="submitRatingModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{title}}</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body" style="height: 250px;">
          <span class="error text-center text-danger">
            <label v-if="errorMessage !== null">
              <b>Opps!</b>
              {{errorMessage}}
            </label>
          </span>
          <span class="star-holder" id="rate">
            <i
              v-bind:class="{'far': active === 0 || i > active, 'fas text-warning': i <= active}"
              v-for="i in 5"
              v-on:click="makeActive(i)"
              class="fa-star"
            ></i>
            <br>Click the stars
          </span>
          <span class="star-holder" id="reviewed">
            <i
              v-bind:class="{'far': stars === 0 || i > stars, 'fas text-warning': i <= stars}"
              v-for="i in 5"
              class="fa-star"
            ></i>
            <br>You've submitted reviews already.
          </span>
        </div>
        <div id="modalfooter" class="modal-footer">
          <button
            type="button"
            class="btn btn-danger"
            data-dismiss="modal"
            v-on:click="cancel()"
          >Cancel</button>
          <button type="button" class="btn btn-primary" v-on:click="create()">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.error {
  width: 100%;
  float: left;
  height: 25px;
}
.star-holder {
  width: 100%;
  float: left;
  text-align: center;
  margin-top: 50px;
}

#rate {
  display: block;
}

#reviewed {
  display:none;
}
.fa-star {
  font-size: 50px;
}
.fa-star:hover {
  cursor: pointer;
}
@media (max-width: 991px) {
}
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
export default {
  data() {
    return {
      user: AUTH.user,
      active: 0,
      stars: 0,
      errorMessage: null,
      title: 'Submit Rating',
      payload: null,
      payloadValue: null,
      payload1: null,
      payloadValue1: null
    }
  },
  methods: {
    redirect(parameter) {
      ROUTER.push(parameter)
    },
    makeActive(index) {
      this.active = index
    },
    cancel() {
      this.payload = null
      this.payloadValue = null
      this.active = 0
      $('#submitRatingModal').modal('hide')
    },
    show(payload, payloadValue, payload1, payloadValue1) {
      this.payload = payload
      this.payloadValue = payloadValue
      this.payload1 = payload1
      this.payloadValue1 = payloadValue1
      this.retrieve()
      $('#submitRatingModal').modal('show')
    },
    create() {
      if (this.active > 0) {
        let parameter = {
          payload: this.payload,
          payload_value: this.payloadValue,
          account_id: this.user.userID,
          value: this.active,
          payload_1: this.payload1,
          payload_value_1: this.payloadValue1,
          status: 'all'
        }
        this.APIRequest('ratings/create', parameter).then(response => {
          if (response.error.length > 0) {
            this.errorMessage = response.error.message
          } else if (response.data > 0) {
            this.errorMessage = null
            $('#submitRatingModal').modal('hide')
            this.retrieve()
          } else {
            this.errorMessage = null
            $('#submitRatingModal').modal('hide')
            this.retrieve()
          }
        })
      } else {
        this.errorMessage = 'No stars are selected.'
      }
    },
    retrieve() {
      let parameter = {
        condition: [
          {
            value: this.payload,
            column: 'payload',
            clause: '='
          },
          {
            value: this.payloadValue,
            column: 'payload_value',
            clause: '='
          },
          {
            value: this.payload1,
            column: 'payload_1',
            clause: '='
          },
          {
            value: this.payloadValue1,
            column: 'payload_value_1',
            clause: '='
          }
        ],
        account_id: this.user.userID
      }
      this.APIRequest('ratings/retrieve', parameter).then(response => {
        console.log('retrieve ratings: ', response.data)
        if (response.data !== null) {
          this.errorMessage = null
          this.stars = response.stars
          document.getElementById('modalfooter').style.display = 'none'
          document.getElementById('rate').style.display = 'none'
          document.getElementById('reviewed').style.display = 'block'
          this.title = 'Rating Submitted'
        }else{
          document.getElementById('modalfooter').style.display = 'block'
          document.getElementById('rate').style.display = 'block'
          document.getElementById('reviewed').style.display = 'none'
          this.errorMessage = null
          this.active = 0
        }
      })
    }
  }
}
</script>
