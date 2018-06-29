<template>
  <div class="Hello">
     <div class="swiper-container">
          <div class="swiper-wrapper">
              <div class="swiper-slide"><h1>第一个</h1></div>
              <div class="swiper-slide"><h1>第二个</h1></div>
              <div class="swiper-slide"><h1>第三个</h1></div>
          </div>
      </div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: 'Hello',
  data () {
    return {
     
    }
  },
  methods:{
    Qswiper(){
        var mySwiper = new Swiper(".swiper-container", {
            direction: "horizontal",
            loop: true,
            // 如果需要分页器
            //设置自动播放
          autoplay: {
              delay: 3000,
              stopOnLastSlide: false,
              disableOnInteraction: true
          }
       });
    }
  },
  mounted(){
    this.Qswiper();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>

</style>
