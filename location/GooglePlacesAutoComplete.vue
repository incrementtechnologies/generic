<template>
  <div class="google-autocomplete-holder">
    <input type="text" class="form-control" v-model="searchValue" :style="property.style" @keyup="getPlaces()" :placeholder="property.placeholder ? property.placeholder : 'Type location'">
    <span class="close-icon" @click="onCancel()" v-if="results !== null || selectedFlag === true">
      <i class="fas fa-times"></i>
    </span>
    <span class="results-holder" :style="property.results.style" v-if="results !== null">
      <label v-for="(item, index) in results" :key="index" @click="setSelectedItem(item)">
        {{item.name + ', ' + item.formatted_address}}
      </label>
    </span>
  </div>
</template>
<style lang="scss" scoped> 
@import "~assets/style/colors.scss";
.google-autocomplete-holder{
  position: relative;
}
.results-holder{
  width: 100%;
  position: static;
  background: white;
  z-index: 10000;
  border-bottom: solid 1px $gray;
  border-left: solid 1px $gray;
  border-right: solid 1px $gray;
}
label{
  width: 100%;
  float: left;
  border-bottom: solid 1px $gray;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 0px;
}

.close-icon{
  position: absolute;
  right: 10px;
  top: 10px;
  height: 30px;
  width: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 18px;
  background: $gray;
  color: white;
  border-radius: 50%;
}

.close-icon:hover{
  cursor: pointer;
  background: $primary;
}

label:hover{
  cursor: pointer;
  background: $gray;
}
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import COMMON from 'src/common.js'
// 1. add this your data
// 2. on your tag on view add props :property="property"
// 3. on result add @onSelect="yourMethod($vent)"
// property: {
//   style: {
//     height: '45px !important'
//   },
//   GOOGLE_API_KEY: CONFIG.GOOGLE_API_KEY,
//   results: {
//     style: {
//     }
//   }
// }
export default {
  mounted(){
  },
  data(){
    return {
      common: COMMON,
      user: AUTH.user,
      searchValue: null,
      results: null,
      selectedFlag: false
    }
  },
  props: ['property'],
  methods: {
    getPlaces(){
      if(this.searchValue === null || this.searchValue === ''){
        return
      }
      if(this.searchValue.length < 3){
        return
      }
      if(this.selectedFlag === true){
        return
      }
      let value = ''
      for (var i = 0; i < this.searchValue.length; i++) {
        if(this.searchValue[i] !== ' '){
          value += this.searchValue[i]
        }else{
          value += '%20'
        }
      }
      let url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + value + '&key=' + this.property.GOOGLE_API_KEY
      let parameter = {
        route: url
      }
      this.APIRequest('google_places/search', parameter).then(response => {
        if(response.data !== null){
          if(response.data.results !== null){
            this.results = response.data.results
          }
        }
      })
    },
    clear(){
      this.searchValue = null
      this.results = null
    },
    onCancel(){
      this.clear()
      this.$emit('onFinish', null)
      this.selectedFlag = false
    },
    setSelectedItem(item){
      let locationArray = item.formatted_address.split(', ')
      let country = locationArray[locationArray.length - 1]
      let region = locationArray[locationArray.length - 2]
      let locality = locationArray[locationArray.length - 3]
      let location = {
        latitude: item.geometry.location.lat,
        longitude: item.geometry.location.lng,
        route: item.name + ((locationArray.length > 3) ? ', ' + locationArray[0] : ''),
        locality: locality,
        country: country,
        region: region
      }
      this.searchValue = location.route
      this.results = null
      this.selectedFlag = true
      this.$emit('onFinish', location)
    }
  }
}
</script>
