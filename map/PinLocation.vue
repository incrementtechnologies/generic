<template>
  <!-- 
    INSTRUCTION
    Author: KENNETTE CANALES
    EMAIL: KENNETTECANALES@GMAIL.COM
    Install: vue-browser-geolocation
    Options:
    property = {
      height: 100px;
      ...
    }
    Add this to the attribute and declare managedLocation method
    @onSelect="managedLocation"

    Sample Data

    {
      country: "Philippines"
      latitude: 10.30616934471578
      locality: "Cebu City"
      longitude: 123.90497943599851
      region: "Cebu"
      route: "572 Imus Ave"
    }
    
   -->
  <div>
    <div class="form-group">
      <button class="btn btn-danger" @click="pinLocation()">Pin Location</button>
      <button class="btn btn-primary" @click="useLocation()">Use Location</button>
    </div>
    <div id="map" ref="map" :style="property"></div>
  </div>
</template>
<style scoped>
#map {
  height: 300px;
  width: 100%;
  background: gray;
}
</style>
<script>
import VueGeolocation from 'vue-browser-geolocation'
import Vue from 'vue'
Vue.use(VueGeolocation)
export default {
  mounted() {
    this.$getLocation({}).then(coordinates => {
      this.setInitialView(coordinates)
    })
  },
  data(){
    return{
      map: null,
      location: null,
      selectedLocation: null
    }
  },
  props: ['property'],
  components: {
    googlemap: require('./GoogleMap')
  },
  methods: {
    pinLocation(){
      this.$getLocation({}).then(coordinates => {
        this.setInitialView(coordinates)
      })
    },
    useLocation(event){
      if(this.selectedLocation === null){
        return
      }
      this.$emit('onSelect', this.selectedLocation)
    },
    showModal(){
      $('#mapmodal').modal('show')
    },
    hideModal(){
      $('#mapmodal').modal('hide')
    },
    getMap(callback) {
      let vm = this
      function checkForMap() {
        if (vm.map) callback(vm.map)
        else setTimeout(checkForMap, 200)
      }
      checkForMap()
    },
    storeLocation(location){
      this.selectedLocation = location
    },
    setMarker(locationSet){
      if(locationSet != null){
        this.location = locationSet
      }
      console.log('[]dsf', this.location)
      if(this.location == null){
        return
      }
      var infowindow = new window.google.maps.InfoWindow({
        content: 'Custom Location'
      })
      var marker = new window.google.maps.Marker({
        position: { lat: Number(this.location.latitude), lng: Number(this.location.longitude) },
        draggable: true,
        map: this.map,
        icon: {
          url: `http://maps.google.com/mapfiles/ms/icons/red-dot.png`
        }
      })
      marker.addListener('click', function() {
        infowindow.open(this.map, marker)
      })
      window.google.maps.event.addListener(marker, 'dragend', () => {
        let position = marker.getPosition()
        let geocoder = new window.google.maps.Geocoder()
        geocoder.geocode({latLng: position}, (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK){
            // $("#mapSearchInput").val(results[0].formatted_address);
            let address = results[0].formatted_address.split(', ')
            let location = {
              route: address.length === 4 ? address[0] : null,
              locality: address.length === 4 ? address[1] : address[0],
              region: address.length === 4 ? address[2] : address[1],
              country: address.length === 4 ? address[3] : address[2],
              longitude: position.lng(),
              latitude: position.lat()
            }
            this.storeLocation(location)
          }else{
            this.storeLocation(null)
          }
        })
      })
    },
    setInitialView(location){
      if(this.location == null){
        this.location = {
          longitude: location.lng,
          latitude: location.lat
        }
      }
      this.map = new window.google.maps.Map(this.$refs['map'], {
        center: { lat: Number(this.location.latitude), lng: Number(this.location.longitude) },
        zoom: 8
      })
      this.setMarker()
    },
    geocodePosition(position){
      let geocoder = new window.google.maps.Geocoder()
      geocoder.geocode({latLng: position}, function(results, status){
        if (status === window.google.maps.GeocoderStatus.OK){
          // $("#mapSearchInput").val(results[0].formatted_address);
          console.log(results[0].formatted_address)
        }else{
        }
      })
    }
  }
}
</script>
