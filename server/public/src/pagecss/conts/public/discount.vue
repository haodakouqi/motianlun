<template>
<div class="discount">
  <span class="num">{{disc}}</span><span>折起</span>
</div>
</template>

<script>
  import Vue from 'vue';
  let names = 'discount';
  export default Vue.component(names, {
    name: names,
    props:['disc']
  })
</script>

<style scoped lang="scss">
.discount{
  width:0.45rem;
  height:0.45rem;
  border-radius:50%;
  background-image: linear-gradient(315deg,#ff1d41,#ee0e87);
  span{
    font-size:0.1rem;
    color:#fff;
    text-align: center;
    display: block;
  }
  .num{
    font-size:0.18rem;
  }
}
</style>
