<template>
    <div id="map" ref="map">  </div>
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
        content: `<b>${el.route}, ${el.locality}, ${el.country}</b>`
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
  background: gray
}
</style>
