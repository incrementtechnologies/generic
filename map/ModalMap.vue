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
            <googlemap></googlemap>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="hideModal()">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
export default {
  data(){
    return {
      GOOGLE_API_KEY: CONFIG.GOOGLE_API_KEY,
      results: {
        style: {}
      }
    }
  },
  components: {
    googlemap: require('./GoogleMap')
  },
  props: ['data', 'property'],
  methods: {
    hideModal(){
      $('#' + this.data.id).modal('hide')
    }
  }
}
</script>
