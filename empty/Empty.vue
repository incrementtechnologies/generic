<template>
  <div class="empty">
    <!-- <div class="icon"> -->
      <i class="fas fa-hourglass-start text-danger icon"></i>
    <!-- </div> -->
    <span class="description text-danger"><b>{{title}}</b></span>
    <span style="font-size: 15px;">{{action}}</span>
  </div>
</template>
<style>
  .empty{
    width: 100%;
    margin-top: 25px;
    margin-bottom: 25px;
    float: left;
    min-height: 350px;
    overflow-y: hidden;
    text-align: center;
    border: solid 1px #ddd;
  }

  .empty .icon{
    font-size: 100px;
    padding-top: 100px;
  }
  .empty span{
    width: 100%;
    float: left;
  }

  .empty .description{
    font-size: 24px;
  }
</style>
<script>
import ROUTER from '../../../../router'
import AUTH from '../../../../services/auth'
import CONFIG from '../../../../config.js'
import axios from 'axios'
export default {
  data(){
    return {
      user: AUTH.user,
      config: CONFIG
    }
  },
  props: ['title', 'action'],
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    }
  }
}
</script>
