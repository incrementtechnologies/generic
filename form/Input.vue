<template>
  <div class="input-holder">
    <label>{{label}}</label>
    <input :type="'text'"
    v-bind:value="input"
    :placeholder="this.placeholder ? this.placeholder : 'Start typing'"
    v-on:input="$emit('input', $event.target.value)"
     v-if="type === 'text' || !type">
     <date-picker
        v-if="type === 'date'"
        v-model="input"
        @input="$emit('input', input)"
        :type="'date'"
        :value-type="'YYYY-MM-DD'"
        :use12h="true"
        :placeholder="this.placeholder"
        :format="'MMM D, YYYY'"
        :input-class="'form-control'"
        :input-attr="{style: 'height: 30px !important;border: 0px; padding-left: 0px; color: #999;'}"
      >
      </date-picker>
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

.mx-datepicker,
.mx-input-wrapper {
  width: unset;
  position: unset;
  display: unset;
}

</style>
<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
export default {
  mounted(){
  },
  data(){
    return {
      input: null
    }
  },
  components: {
    DatePicker
  },
  props: ['label', 'placeholder', 'type'],
  methods: {
  }
}
</script>
