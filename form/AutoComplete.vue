<template>
  <div class="input-holder-autocomplete">
    <div class="autocomplete-holder">
      <label>{{label}}</label>
      <input type="text"
      v-bind:value="input"
      :placeholder="this.placeholder ? this.placeholder : 'Start typing'"
      v-on:input="showDropdown"
      >
    </div>
    <ul>
      <li v-for="(item, index) in sorted" @click="onSelect(item.title)">{{item.title}}</li>
    </ul>
  </div>
</template>
<style scoped>
.input-holder-autocomplete{
  border-color: #ccc;
  width: 100%;
  float: left;
  position: relative;
}

.autocomplete-holder{
  border: solid 1px #eee;
  border-radius: 5px;
  padding: 5px;
  min-height: 50px;
  overflow-y: hidden;
  max-height: 60px;
  position: relative;
}

label{
  margin: 0px;
  width: 100%;
  float: left;
  color: #555;
  font-size: 12px;
  position: relative;
}

input{
  border: 0px;
  line-height: 30px;
  color: #999;
  width: 100%;
  float: left;
  position: relative;
}

input:focus{
  outline: none;
}

ul{
  position: relative;
  width: 100%;
  margin: 0px;
  list-style: none;
  float: left;
  padding: 0px;
  background: white;
  padding: 5px;
  z-index: 10000;
}

ul li{
  width: 100%;
  float: left;
  line-height: 35px;
  padding-left: 5px;
  border-bottom: solid 1px #eee;
}

ul li:hover{
  background: #eee;
  cursor: pointer;
}

</style>
<script>
export default {
  mounted(){
  },
  data(){
    return {
      input: '',
      sorted: []
    }
  },
  props: ['label', 'placeholder', 'data'],
  methods: {
    showDropdown($event){
      let input = $event.target.value
      this.$emit('input', input)
      this.input = input
      if(this.data !== null){
        this.sorted = this.data.filter((item, index) => {
          return item.title.toLowerCase().includes(this.input.toLowerCase())
        })
      }
      if(input === ''){
        this.sorted = []
      }
    },
    onSelect(title){
      this.input = title
      this.sorted = []
    }
  }
}
</script>
