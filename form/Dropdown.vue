<template>
  <div class="input-holder-dropdown">
    <div class="dropdown-holder">
      <label>{{label}}</label>
      <select 
        v-bind:value="input"
        :placeholder="this.placeholder ? this.placeholder : 'Start typing'"
        @change="onSelect"
        >
        <option v-for="(item, index) in data" :value="item.payload" :key="index">{{item.title}}</option>
      </select>
    </div>
  </div>
</template>
<style scoped>
.input-holder-dropdown{
  border-color: #ccc;
  width: 100%;
  float: left;
}

.dropdown-holder{
  border: solid 1px #eee;
  border-radius: 5px;
  padding: 5px;
  min-height: 50px;
  overflow-y: hidden;
  max-height: 60px;
}

label{
  margin: 0px;
  width: 100%;
  float: left;
  color: #555;
  font-size: 12px;
}

select{
  border: 0px;
  height: 30px;
  color: #999;
  width: 100%;
  float: left;
}

select:focus{
  outline: none;
}

</style>
<script>
export default {
  mounted(){
    this.input = this.$attrs.value
  },
  data(){
    return {
      input: ''
    }
  },
  props: ['label', 'placeholder', 'data'],
  methods: {
    onSelect($event){
      let input = $event.target.value
      this.input = input
      this.$emit('input', input)
    }
  }
}
</script>
