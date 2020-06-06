<template>
  <div class="input-holder">
    <label>{{label}}</label>
    <input type="text"
    v-bind:value="input"
    :placeholder="this.placeholder ? this.placeholder : 'Start typing'"
    v-on:input="$emit('input', $event.target.value)"
    >
  </div>
</template>
<style scoped>
.input-holder{
  border-radius: 5px;
  min-height: 50px;
  overflow-y: hidden;
  border-color: #ccc;
  width: 100%;
  float: left;
  border: solid 1px #eee;
  padding: 5px;
  max-height: 60px;
}

label{
  margin: 0px;
  width: 100%;
  float: left;
  color: #555;
  font-size: 12px;
}

input{
  border: 0px;
  line-height: 30px;
  color: #999;
  width: 100%;
  float: left;
}

input:focus{
  outline: none;
}

</style>
<script>
export default {
  mounted(){
  },
  data(){
    return {
      input: null
    }
  },
  props: ['label', 'placeholder'],
  methods: {
  }
}
</script>
