<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang='scss'>
@import "./assets/common/public.scss";
@import '../node_modules/mint-ui/lib/style.css';

#app {
 height: 100%;
}
</style>
