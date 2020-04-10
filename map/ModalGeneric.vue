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
        <div class="modal-content">
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
export default {
  props: ['place_data'],
  data(){
    return{
      map: null
    }
  },
  components: {
    googlemap: require('./Generic')
  },
  methods: {
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
    }
  },
  mounted() {
    this.map = new window.google.maps.Map(this.$refs['map'], {
      center: { lat: Number(this.place_data[0].latitude), lng: Number(this.place_data[0].longitude) },
      zoom: 10
    })
    this.place_data.forEach(el => {
      var infowindow = new window.google.maps.InfoWindow({
        content: `<b>${el.route}, ${$el.locality}, ${el.country}</b>`
      })
      var marker = new window.google.maps.Marker({
        position: { lat: Number(el.latitude), lng: Number(el.longitude) },
        map: this.map,
        icon: {
          url: `http://maps.google.com/mapfiles/ms/icons/red-dot.png`
        }
      })
      marker.addListener('click', function() {
        infowindow.open(this.map, marker)
      })
    })
  }
}
</script>

<style scoped>
#map {
  height: 600px;
  background: gray;
}
.modal-full {
  min-width: 80%;
  margin-left: 80;
}
</style>
