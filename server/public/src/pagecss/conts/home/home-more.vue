<template>
    <div class="homeMore">
      <home-more-list v-for="(obj,index) in moreData" :key="index" :moreData="obj"></home-more-list>
    </div>
</template>

<script>
  import homeMoreList from './home-more-list'
    export default {
        name: "home-more",
      props:['moreData'],
      components:{
        homeMoreList
      }
    }
</script>

<style scoped lang="scss">
  .homeMore{
    width:100%;
    display: -webkit-flex;
    -webkit-flex-shrink: 0;
    -webkit-flex-wrap: nowrap;
    overflow-x: auto;
    padding:0.1rem 0;
  }
</style>
