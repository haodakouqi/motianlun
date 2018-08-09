<template>
    <div class="home-lbt-top">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide"><img src="https://img1.tking.cn/assets/img/7wbfCQfZsC.jpg" alt=""></div>
          <div class="swiper-slide"><img src="https://img1.tking.cn/assets/img/y7kQd3hZ75.jpg" alt=""></div>
          <div class="swiper-slide"><img src="https://img1.tking.cn/assets/img/Bk7QYFJh4A.jpg" alt=""></div>
          <div class="swiper-slide"><img src="https://img2.tking.cn/assets/img/QFMBdksibF.jpg" alt=""></div>
          <div class="swiper-slide"><img src="https://img0.tking.cn/assets/img/Kwjb5B7R62.jpg" alt=""></div>
          <div class="swiper-slide"><img src="https://img1.tking.cn/assets/img/SCzRK86ir4.jpg" alt=""></div>
        </div>
      </div>
    </div>
</template>

<script>
  import Swiper from 'swiper';
  export default {
      name: "home-lbt-top",
    data(){
      return {
        picData:{}
      }
    },
    methods:{
        autoswiper(){
          new Swiper('.swiper-container', {
            loop: true,
            autoplay:{
            delay: 8000,
              stopOnLastSlide: false,
              disableOnInteraction: true,
          }//可选选项，自动滑动
          })
        }
    },
    mounted(){
        this.autoswiper();
    }
  }
</script>

<style scoped lang="scss">
.home-lbt-top{
  width:100%;
  height:1.5rem;
  .swiper-container{
    width:100%;
    height:1.5rem;
    img{
      width:100%;
    }
  }
}
</style>
