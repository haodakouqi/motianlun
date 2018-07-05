<template>
    <nav>
      <home-nav-list v-for="(obj,index) in mockdatas" :key="index" :title="obj.title" :icon="obj.icon"></home-nav-list>
    </nav>
</template>

<script>
  import homeNavList from './home-nav-list'
    export default {
        name: "home-nav",
      components:{
        "home-nav-list":homeNavList
      },
      props:['mockdatas']
    }
</script>

<style scoped lang="scss">
nav{
  padding:0.2rem 0;
  background:white;
  display: -webkit-flex;
  -webkit-flex-wrap: wrap;
}
</style>
