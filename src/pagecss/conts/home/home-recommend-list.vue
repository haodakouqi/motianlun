<template>
<div class="recommendList">
  <div class="top">
    <img :src="recommendObj.pic" alt="">
    <div class="right">
      <p class="address">{{recommendObj.address}}</p>
      <p class="num">{{recommendObj.num}}</p>
    </div>
  </div>
  <div class="bottom">
    <img :src="recommendObj.bigpic" alt="">
    <p class="title">{{recommendObj.title}}</p>
    <p class="time">{{recommendObj.time}}</p>
    <p class="price"><span class="prices">{{recommendObj.price}}</span><span>元起</span></p>
  </div>
</div>
</template>

<script>
    export default {
        name: "home-recommend-list",
      props:['recommendObj']
    }
</script>

<style scoped lang="scss">
.recommendList{
  width:3.08rem;
  padding:0.18rem;
  margin-right:0.1rem;
  .top{
    display: -webkit-flex;
    padding-bottom:0.28rem;
    img{
      width:0.46rem;
      height:0.46rem;
    }
    .right{
      margin-left:0.15rem;
      .address{
        width:2.42rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size:0.16rem;
        color: #323038;
        line-height: 0.25rem;
      }
      .num{
        font-size: 0.12rem;
        color: #95949d;
      }
    }
  }
  .bottom{
    img{
      width:2.96rem;
      height:0.96rem;
    }
    .title{
      color: #000;
      font-size: 0.16rem;
      line-height: 0.22rem;
      margin-top:0.1rem;
    }
    .time{
      font-size: 0.12rem;
      color: #95949d;
      line-height: 0.18rem;
      margin-top:0.08rem;
    }
    .price{
      font-size: 0.1rem;
      color: #95949d;
      display: -webkit-flex;
      -webkit-align-items: center;
      .prices{
        color: #ff1d41;
        font-size: 0.18rem;
        font-weight: 600;
      }
    }
  }
}
</style>
