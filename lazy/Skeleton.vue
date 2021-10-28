<template>
  <ul>
    <li class="loading" v-for="(i, index) in size" :key="index" :style="'height: ' + height">
      <span class="bar" ></span>
    </li>
  </ul>
</template>
<script>
import VueSkeletonLoader from 'skeleton-loader-vue'
export default {
  components: { VueSkeletonLoader },
  props: ['size', 'height']
}
</script>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
.loading {
  width: 100%;
  margin-bottom: 10px;
  background: #eee;
  -webkit-animation: pulse 1s infinite ease-in-out;
          animation: pulse 1s infinite ease-in-out;
}
ul{
  list-style: none;
  width: 100%;
  margin: 0;
  padding: 0;
}
.loading {
  position: relative;

  .bar {
    background-color: $gray;
    border-radius: 7px;
    width: 100%;
  }
  &:after {
      position: absolute;
      transform: translateY(-50%);
      top: 50%;
      left: 0;
      content: "";
      display: block;
      width: 100%;
      height: 24px;
      background-image: linear-gradient( 100deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0) 80% );
      background-repeat: no-repeat;
      animation: loading 1s infinite;
  }
}
</style>
