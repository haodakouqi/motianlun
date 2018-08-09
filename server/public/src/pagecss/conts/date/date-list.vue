<template>
<div class="dataIntroduceList">
  <img :src="datelist.posterURL" alt="">
  <div class="right">
    <p class="title">{{datelist.showName}}</p>
    <p class="time">{{datelist.showDate}}</p>
    <p class="address">{{datelist.venueName}}</p>
    <p class="price"><span class="prices">{{datelist.minPrice}}</span><span>元起</span></p>
    <span class="discounts">
      <discount :disc="Math.trunc(datelist.discount*100)/10"></discount>
    </span>
  </div>
</div>
</template>

<script>
  import '../public/discount'
    export default {
        name: "home-introduce-list",
      props:['datelist']
    }
</script>

<style scoped lang="scss">
.dataIntroduceList{
  padding:0.08rem 0.12rem;
  display:-webkit-flex;
  height: 1.22rem;
  span{
    display: block;
  }
  img{
    width:0.9rem;
    height:1.22rem;
  }
  .right{
    padding-left:0.12rem;
    position: relative;
    .title{
      color: #000;
      font-size: 0.16rem;
      line-height: 0.22rem;
    }
    .time{
      font-size: 0.12rem;
      color: #95949d;
      line-height: 0.18rem;
      margin-top:0.1rem;
    }
    .address{
      font-size: 0.12rem;
      color: #95949d;
      line-height: 0.18rem;
      margin-bottom:0.1rem;
    }
    .price{
      display: -webkit-flex;
      font-size: 0.1rem;
      color: #95949d;
      -webkit-align-items: center;
      .prices{
        color: #ff1d41;
        font-size: 0.18rem;
        font-weight: 600;
        margin-right:0.04rem;
      }
    }
    .discounts{
      position:absolute;
      top:0.5rem;
      right:0;
      width:0.45rem;
      height:0.45rem;
    }

  }
}
</style>
