<template>
  <div class="home-lbt-middle">
    <div class="title">
      <h3>新演推荐</h3>
      <span>查看更多</span>
    </div>
    <div class="swiper-container lbt2 swiper-no-swiping">
      <div class="swiper-wrapper">
        <div class="swiper-slide lbt-slide" v-for="obj in unitData2"><img :src="'http://pimg.damai.cn/perform/project/'+obj.fold+'/'+obj.projectId+'_n.jpg'" alt=""></div>
      </div>
    </div>
    <div class="page">
      <div class="detail" v-for="obj1 in unitData2">
        <p class="message">{{obj1.projectName}}</p>
        <p class="ptime"><span class="time">{{obj1.startTime}}</span><span class="price">{{obj1.price}}元起</span></p>
      </div>
    </div>
    <div class="allback">
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  // import '../../../node_modules/swiper/dist/css/swiper.css';
  // import $ from 'jquery';
    export default {
        name: "home-lbt-middle",
      data(){
          return {
            mySwiper:''
          }
      },
      props:['unitData2'],
      watch: {
        unitData2: function(newVal,oldVal){
          this.$nextTick(()=>{
            this.mySwiper.init();
            this.init();
            console.log('可以拿到数据了');
          });
        }
      },
      methods:{
        init(){
            let src = $('.lbt-slide').eq(0).find('img').attr('src');
            // console.log($('.lbt-slide').eq(0));
            $('.home-lbt-middle').css('background','url('+ src +')');
        },
        autoswiper(){
         this.mySwiper =  new Swiper('.lbt2', {
           init:false,
            loop:true,
           preloadImages: true,
           updateOnImagesReady : true,
           autoplay: {
             delay: 5000
           },
              observer:true,//修改swiper自己或子元素时，自动初始化swiper
              observeParents:true,//修改swiper的父元素时，自动初始化swiper
              effect: 'coverflow',
              grabCursor: true,
              centeredSlides: true,
              slidesPerView: 3,
              coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows : true
              },
            on:{
              slideChangeTransitionStart: function(){
                $('.detail').each((k, v)=>{
                  $(v).stop(true).hide(300);
                });
              },
              slideChangeTransitionEnd:function () {
                $('.detail').eq(this.activeIndex).stop(true).show(300);
                let src = $('.lbt-slide').eq(this.activeIndex).find('img').attr('src');
                $('.home-lbt-middle').css('background','url('+ src +')');
                $('.home-lbt-middle').css('backgroundSize','cover');
                // console.log(this.activeIndex);
              },
              touchStart(){
                $('.detail').each((k, v)=>{
                  $(v).stop(true).hide(300);
                });
              },
              touchEnd(){
                $('.detail').eq(this.activeIndex).stop(true).show(300);
                let src = $('.lbt-slide').eq(this.activeIndex).find('img').attr('src');
               $('.home-lbt-middle').css('background','url('+ src +')');
                $('.home-lbt-middle').css('backgroundSize','cover');
              }
            }
            })
        }
      },
      mounted(){
          this.$nextTick(()=>{
            this.autoswiper();
          });
      }
    }
</script>

<style scoped lang="scss">
  .home-lbt-middle{
    width:100%;
    height:3.48rem;
    position: relative;
    .allback{
      position: absolute;
      top:0;
      width:100%;
      height:3.48rem;
    }
    .title{
      display:-webkit-flex;
      -webkit-justify-content: space-between;
      -webkit-align-items: center;
      height:0.50rem;
      padding:0 0.2rem 0.15rem;
      h3{
        font-size:0.16rem;
        color:#fff;
      }
      span{
        font-size:0.12rem;
        color:#c4c4c4;
      }
    }
    .lbt2{
      width:100%;
      height:2.1rem;
      img{
        width:1.5rem;
        height: 100%;
      }
    }
    .page{
      background: rgba(0,0,0,.3);
      .detail {
        display:none;
        padding-top: 0.22rem;
        .message {
          font-size: 0.12rem;
          color: #fff;
          text-align: center;
          line-height: 0.24rem;
          width:100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ptime {
          font-size: 0.1rem;
          color: #fff;
          display: -webkit-flex;
          -webkit-justify-content: center;
          -webkit-align-items: center;
          height: 0.2rem;
          .time {
            margin-right: 0.28rem;
          }
        }
      }
      .detail:nth-of-type(1){
        display: block;
      }
    }
  }
</style>
