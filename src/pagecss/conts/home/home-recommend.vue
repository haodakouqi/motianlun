<template>
<div class="home-recommend">
  <h3>场馆合集</h3>
  <div class="main">
    <home-recommend-list v-for="(obj,index) in recommendData" :key="index" :recommendObj="obj"></home-recommend-list>
  </div>
</div>
</template>

<script>
  import homeRecommendList from './home-recommend-list'
    export default {
        name: "home-recommend",
      components:{
        homeRecommendList
      },
      props:['recommendData']
    }
</script>

<style scoped lang="scss">
.home-recommend{
  padding-top:0.2rem;
  h3{
    font-size:0.15rem;
    color:#150000;
    line-height: 0.22rem;
    padding-left:0.12rem;
  }
  .main{
    width:100%;
    display: -webkit-flex;
    -webkit-flex-shrink: 0;
    -webkit-flex-wrap: nowrap;
    overflow-x: auto;
  }
}
</style>
