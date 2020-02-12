<template v-if="property !== null">
  <div class="modal fade" id="selectLocationModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-md" role="document">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title" id="exampleModalLabel">Select Location</h5>
          <button type="button" class="close" @click="hideModal()" aria-label="Close">
            <span aria-hidden="true" class="text-white">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <vue-google-autocomplete
              ref="address"
              id="map"
              classname="form-control"
              placeholder="Please type your address"
              v-on:placechanged="getAddressData"
              country="sg"
          >
          </vue-google-autocomplete>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="hideModal()">Cancel</button>
            <button type="button" class="btn btn-primary" @click="submit()">Use</button>
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
import VueGoogleAutocomplete from 'vue-google-autocomplete'
export default {
  mounted(){
    this.$refs.address.focus()
  },
  data(){
    return {
      user: AUTH.user,
      config: CONFIG,
      errorMessage: null,
      parameter: null,
      address: ''
    }
  },
  components: {
    VueGoogleAutocomplete
  },
  methods: {
    hideModal(){
      $('#selectLocationModal').modal('hide')
    },
    getAddressData(addressData, placeResultData, id) {
      console.log(addressData)
      this.address = addressData
    }
  }
}
</script>
