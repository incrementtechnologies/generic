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
          <div class="modal-header">
            <h5 class="modal-title">Modal</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body" id="result">
            <div class="row">
              <div class="col-sm-12 col-lg-12">
                <div id="map" ref="map"></div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="hideModal">close</button>
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
    console.log(this.place_data)
    this.map = new window.google.maps.Map(this.$refs['map'], {
      center: { lat: Number(this.place_data[0].latitude), lng: Number(this.place_data[0].longitude) },
      zoom: 8
    })
    this.place_data.forEach(el => {
      var color
      if(el.negtive_size > 0) {
        color = 'green'
      }
      if(el.pum_size > 0) {
        color = 'blue'
      }
      if(el.pui_size > 0) {
        color = 'yellow'
      }
      if(el.positive_size > 0) {
        color = 'red'
      }
      if(el.death_size > 0) {
        color = 'purple'
      }
      var infowindow = new window.google.maps.InfoWindow({
        content: `<b><br>DEATH : ${el.death_size}<br>POSITIVE : ${el.positive_size}<br>PUI : ${el.pui_size}<br>PUM : ${el.pum_size}<br>NEGATIVE : ${el.negative_size}<br>ROUTE : ${el.route + ', ' + el.locality + ', ' + el.country}.</b>`
      })
      var marker = new window.google.maps.Marker({
        position: { lat: Number(el.latitude), lng: Number(el.longitude) },
        map: this.map,
        icon: {
          url: `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`
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
