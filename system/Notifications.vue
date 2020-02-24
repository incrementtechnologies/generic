<template>
  <div style="margin-top: 25px;" v-if="data !== null">
    <div class="alert alert-danger" role="alert" v-for="(item, index) in data" :key="index">
      <b class="alert-heading">{{item.title}}</b>
      <p>
        Hi <b>{{user.username}}!</b> {{item.description}}
      </p>
    </div>
  </div>
</template>
<style scoped>
.alert{
  margin-right: 1%;
}
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import axios from 'axios'
export default {
  mounted(){
    AUTH.checkPlan()
    this.retrieve()
  },
  data(){
    return {
      user: AUTH.user,
      config: CONFIG,
      data: null
    }
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    retrieve(){
      let parameter = {
        condition: [{
          column: 'device',
          clause: 'like',
          value: 'web' + '%'
        }],
        sort: {
          created_at: 'desc'
        }
      }
      this.APIRequest('system_notifications/retrieve', parameter).then(response => {
        if(response.data.length > 0){
          this.data = response.data[0]
        }else{
          this.data = null
        }
      })
    }
  }
}
</script>
