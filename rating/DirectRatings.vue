<template>
  <span v-if="ratings !== null">
    <i v-bind:class="{'far': ratings.stars === 0 || i > ratings.stars, 'fas text-warning': i <= ratings.stars}" class="fa-star" v-for="i in 5"></i> <label v-if="ratings.size > 50">({{ratings.avg.toFixed(1)}})</label>
  </span>
</template>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import axios from 'axios'
export default {
  mounted(){
  },
  data(){
    return {
      user: AUTH.user,
      config: CONFIG
    }
  },
  props: ['ratings'],
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    }
  }
}
</script>
<style scoped>
.rating-holder{
  width: 100%;
  float: left;
}
.text{
  float: left;
}
.fa-star{
  padding-right: 5px;
  font-size: 16px;
}
.fa-star:hover{
  cursor: pointer;
}

</style>
