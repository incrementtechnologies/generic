<template>
  <div>
    <div
      class="modal fade bd-example-modal-lg"
      id="mapmodal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-full" role="document">
        <div class="modal-content" :style="propStyle">
          <div class="modal-header bg-warning">
            <h5 class="modal-title" id="exampleModalLabel">Map Viewer</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="hideModal()">
              <span aria-hidden="true" class="text-white">&times;</span>
            </button>
          </div>
          <div class="modal-body" id="result">
            <div class="row">
              <div class="col-sm-12 col-lg-12">
                <div id="map" ref="map"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Jquery from 'jquery'
import AUTH from 'src/services/auth'
export default {
  props: ['place_data', 'propStyle'],
  mounted() {
    this.setMap()
    console.log(this.place_data, this.propStyle)
    // this.interval = setInterval(this.update, 1000)
  },
  data(){
    return{
      auth: AUTH,
      rider: AUTH.checkout.rider,
      interval: null
    }
  },
  components: {
  },
  computed: {
    'this.auth.checkout.rider'(to, from){
      console.log('to', to)
      console.log('from', from)
      this.update()
    }
  },
  methods: {
    showModal(){
      Jquery('#mapmodal').modal('show')
      console.log('mao ni ', this.place_data, this.propStyle)
    },
    hideModal(){
      this.interval = null
      Jquery('#mapmodal').modal('hide')
    },
    getMap(callback) {
      let vm = this
      function checkForMap() {
        if (vm.map) callback(vm.map)
        else setTimeout(checkForMap, 200)
      }
      checkForMap()
    },
    setMap(){
      AUTH.google.maps.map = new window.google.maps.Map(this.$refs['map'], {
        center: { lat: Number(AUTH.checkout.locations[0].latitude), lng: Number(AUTH.checkout.locations[0].longitude) },
        zoom: 15
      })
      this.update()
    },
    update(){
      AUTH.checkout.locations.forEach(el => {
        var infowindow = new window.google.maps.InfoWindow({
          content: `<b>${el.route}, ${el.locality}, ${el.country}</b>`
        })
        var marker = new window.google.maps.Marker({
          position: { lat: Number(el.latitude), lng: Number(el.longitude) },
          map: AUTH.google.maps.map,
          icon: {
            url: `https://maps.google.com/mapfiles/ms/icons/red-dot.png`
          }
        })
        marker.addListener('click', function() {
          infowindow.open(AUTH.google.maps.map, marker)
        })
        AUTH.google.maps.markers.push(marker)
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "~assets/style/colors.scss";
.modal{
  z-index: 100000 !important;
}
.text-primary{
  color: $primary !important;
}


.bg-warning{
  background: $warning !important;
  color: $white !important;
}
#map {
  height: 600px;
  background: gray;
}
.modal-full {
  min-width: 80%;
  margin-left: 80;
}
</style>
