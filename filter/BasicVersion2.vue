<template>
  <div class="filter">
    <div class="input-group">
      <button class="btn btn-primary select-btn dropdown">
        <option class="dropdown-title" v-for="(item, index) in category" :value="index" :key="index">
          {{item.title}}
        </option>
      </button>
      <select class="btn btn-warning select-btn dropdown" v-model="sortValue" @change="changeSort" v-if="activeSort !== null">
        <option class="dropdown-title" v-for="(item, index) in activeSort" :value="index" :key="index">
          {{item.title}}
        </option>
      </select>
      <input :type="(activeSort !== null && (typeof activeSort[sortValue].input_type !== undefined && activeSort[sortValue].input_type !== 'undefined')) ? activeSort[sortValue].input_type : 'text'" class="form-control" v-model="searchValue" @keypress="keypressHandler" :placeholder="'Search ' + '...'">
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
.filter{
  width: 100%;
  float: left;
  height: 50px;
}
.form-control{
  height: 40px !important;
}
.input-group{
  margin-bottom: 10px !important;
}
.input-group-addon{
  width: 100px !important;
  background: #22b173 !important;
  color: #fff !important;
}
.input-group-title{
  width: 100px !important;
  background: #028170 !important;
  color: #fff !important;
}
.btn{
  border-radius: 0px !important;
  height: 40px !important;
}
.select-btn{
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
}
.dropdown {
  z-index: 0 !important;
}
@media (max-width: 650px){
  .dropdown {
      width: 20%;
  }
  .dropdown-title {
    font-size: 10px;
  }
}
.view-option{
    color: $primary;
    font-size: 40px;
    line-height: 20%;
    border: solid 1px #ccc;
    height: 40px;
    padding: 5px;
    font-size: 29px;
    i:hover{
    cursor: pointer;
    color: $secondary;
  }
}
@media (max-width: 992px){
  .view-option{
    display: none;
  }

  .input-group{
    width: 100% !important;
    min-height: 50px !important;
  }

  .btn, .form-control{
    float: left;
    width: 100% !important;
  }
}
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import axios from 'axios'
export default {
  mounted(){
    this.activeCategoryIndex = this.activeCategoryIndex !== null ? this.activeCategoryIndex : 0
    this.activeSortingIndex = this.activeSortingIndex !== null ? this.activeSortingIndex : 0
    this.activeCategory = this.category[this.activeCategoryIndex]
    this.activeSort = this.category[this.activeCategoryIndex].sorting
    this.filterValue = this.activeCategoryIndex
    this.sortValue = this.activeSortingIndex
  },
  data(){
    return {
      user: AUTH.user,
      config: CONFIG,
      searchValue: '',
      filterValue: null,
      sortValue: null,
      title: '',
      payload: '',
      payloadValue: '',
      SortOrder: '',
      sortData: {
        'title': 'asc'
      },
      activeCategory: null,
      activeSort: null,
      itemTemp: {
        'payload': 'title',
        'payload_value': 'asc',
        'title': 'Title ascending'
      },
      toggleStyle: 0,
      toggleFlag: false
    }
  },
  props: ['category', 'activeCategoryIndex', 'activeSortingIndex', 'grid'],
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    retrieve(){
      //
    },
    changeView(){
      if(this.toggleStyle < this.grid.length - 1 && this.toggleFlag === false){
        this.toggleStyle++
        if(this.toggleStyle === this.grid.length - 1){
          this.toggleFlag = true
        }
      }else if(this.toggleStyle > 0 && this.toggleFlag === true){
        this.toggleStyle--
        if(this.toggleStyle === 0){
          this.toggleFlag = false
        }
      }
      this.$emit('changeStyle', this.grid[this.toggleStyle])
    },
    selectCategory(){
      this.activeSort = this.category[this.filterValue].sorting
      this.activeCategory = this.category[this.filterValue]
      this.sortValue = this.filterValue
    },
    changeSort(){
      console.log('hi')
      let object = {}
      let filter = {
        column: this.activeSort[this.sortValue].payload,
        value: this.searchValue
      }
      object[this.activeSort[this.sortValue].payload] = this.activeSort[this.sortValue].payload_value
      let parameter = {
        sort: object,
        filter: filter
      }
      this.$emit('changeSortEvent', parameter)
    },
    keypressHandler(event){
      if(event.charCode === 13){
       // console.log(this.itemTemp)
        let item = this.itemTemp
        let object = {}
        let filter = {
          column: this.activeSort[this.sortValue].payload,
          value: this.searchValue
        }
        object[this.activeSort[this.sortValue].payload] = this.activeSort[this.sortValue].payload_value
        let parameter = {
          sort: object,
          filter: filter
        }
        this.$emit('changeSortEvent', parameter)
      }
    }
  }
}
</script>
