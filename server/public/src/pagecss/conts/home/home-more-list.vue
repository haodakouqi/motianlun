<template>
    <a href="javascript:;" class="homeMoreList" :style="'background:url('+moreData.pic+')'">
      {{moreData.message}}
    </a>
</template>

<script>
    export default {
        name: "home-more-list",
      props:['moreData']
    }
</script>

<style scoped lang="scss">
.homeMoreList{
  display: -webkit-flex;
  -webkit-align-items: center;
  -webkit-justify-content: center;
  height:0.82rem;
  width:1.65rem;
  margin-right:0.15rem;
  -webkit-background-size: cover;
  background-size: cover;
  font-size:0.16rem;
  color:#fff;
  -webkit-flex-shrink: 0;
}
</style>
