<template>
  <a href="javascript:;">
    <i :class="'iconfont '+icon"></i>
    <p>{{title}}</p>
  </a>
</template>

<script>
    export default {
        name: "home-nav-list",
      props:['title','icon']
    }
</script>

<style scoped lang="scss">
a{
  display:-webkit-flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  -webkit-align-items: center;
  width:0.935rem;
  margin-top:0.24rem;
  .iconfont{
    font-size:0.3rem;
    color:#f8276f;
    font-weight: 900;
  }
  p{
    font-size:0.1rem;
    color:#3f3f3f;
    margin-top:0.05rem;
  }
}
</style>
