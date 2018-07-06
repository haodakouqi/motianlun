<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{

    }
  },
  methods:{
    __location(){
      let geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition((r) => {
          let city_book = r.address.city;
          console.log(city_book);
          this.$store.state.locationState = city_book;
      })
    }
  },
  mounted(){
    this.__location();
  }
}
</script>

<style lang='scss'>
@import "./assets/common/public.scss";
// @import '../node_modules/mint-ui/lib/style.css';
@import "./assets/font/iconfont.css";
#app {
 height: 100%;width:100%;
 .mtl_home{
   span{
     display: block;
   }
 }
}
</style>
