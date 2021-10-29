<template>
  <ul>
    <li class="loading" v-for="(i, index) in size" :key="index" :style="styleData">
      <span class="bar" ></span>
    </li>
  </ul>
</template>
<script>
import VueSkeletonLoader from 'skeleton-loader-vue'
export default {
  components: { VueSkeletonLoader },
  props: ['size', 'styleData']
}
</script>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
.loading {
  width: 100%;
  margin-bottom: 10px;
  background: #eee;
  -moz-animation: showHide 5s ease-in alternate infinite; /* Firefox */
  -webkit-animation: showHide 5s ease-in alternate infinite; /* Safari and Chrome */
  -ms-animation: showHide 5s ease-in alternate infinite; /* IE10 */
  -o-animation: showHide 5s ease-in alternate infinite; /* Opera */
  animation: showHide 5s ease-in alternate infinite;
}

@-webkit-keyframes showHide { /* Chrome, Safari */
    0% {width:100%}
    40% {width:60%}
    60% {width:40%;}
    100% {width:100%;}
}
@-moz-keyframes showHide { /* FF */
    0% {width:100%}
    40% {width:60%}
    60% {width:40%;}
    100% {width:100%;}
}
@-ms-keyframes showHide { /* IE10 */
    0% {width:100%}
    40% {width:60%}
    60% {width:40%;}
    100% {width:100%;}
}
@-o-keyframes showHide { /* Opera */
    0% {width:100%}
    40% {width:60%}
    60% {width:40%;}
    100% {width:100%;}
}
@keyframes showHide {
    0% {width:100%}
    40% {width:60%}
    60% {width:40%;}
    100% {width:100%;}
}

ul{
  list-style: none;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
