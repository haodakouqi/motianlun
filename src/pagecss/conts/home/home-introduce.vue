<template>
    <div class="homeIntroduce">
      <h3>为你推荐</h3>
      <div class="main">
      <home-introduce-list v-for="(obj,index) in dataIntroduce" :key="index" :introduceData="obj"></home-introduce-list>
      </div>
    </div>
</template>

<script>
  import homeIntroduceList from './home-introduce-list'

    export default {
        name: "home-introduce",
      components:{
        homeIntroduceList
      },
      props:['dataIntroduce']
    }
</script>

<style scoped lang="scss">
  .homeIntroduce{
    h3{
      font-size: 0.16rem;
      color: #000;
      font-weight: 700;
      padding-left:0.12rem;
      line-height: 0.5rem;
    }
    .main{

    }
  }

</style>
