<template>
  <div class="home-unit">
    <div class="unit_title">
      <h3>{{title}}</h3>
      <span>查看更多</span>
    </div>
    <div class="unit_main">
    <home-unit-list v-for="(obj,index) in unitData" :key="index" :unitobj="obj" :discc="disccc"></home-unit-list>
    </div>
  </div>
</template>

<script>
  import homeUnitList from './home-unit-list'
    export default {
        name: "home-unit",
      components:{
        "home-unit-list":homeUnitList
      },
      props:['unitData','title','disccc']
    }
</script>

<style scoped lang="scss">
  .home-unit{
    .unit_title{
      display: -webkit-flex;
      -webkit-justify-content: space-between;
      -webkit-align-items: center;
      height:0.48rem;
      h3{
        font-size:0.16rem;
        color:#040000;
        padding-left:0.12rem;
      }
      span{
        font-size:0.12rem;
        color:#ff1a3e;
        padding-right:0.12rem;
      }
    }
    .unit_main{
      padding:0.06rem 0;
      display: -webkit-flex;
      -webkit-flex-wrap: nowrap;
      -webkit-flex-shrink: 0;
      overflow-x: auto;
    }
  }
</style>
