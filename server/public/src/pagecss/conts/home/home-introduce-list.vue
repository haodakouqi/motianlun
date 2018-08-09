<template>
<div class="homeIntroduceList">
  <img :src="'http://pimg.damai.cn/perform/project/'+introduceData.fold+'/'+introduceData.projectId+'_n.jpg'" alt="">
  <div class="right">
    <p class="title">{{introduceData.projectName}}</p>
    <p class="time">{{introduceData.showTime}}</p>
    <p class="address">{{introduceData.venue}}</p>
    <p class="price"><span class="prices">{{introduceData.price}}</span><span>元起</span></p>
    <span class="discounts">
      <discount :disc="'9.4'"></discount>
    </span>
  </div>
</div>
</template>

<script>
  import '../public/discount'
    export default {
        name: "home-introduce-list",
      props:['introduceData']
    }
</script>

<style scoped lang="scss">
.homeIntroduceList{
  padding:0.08rem 0.12rem;
  display:-webkit-flex;
  // width: 100%;
  // box-sizing: border-box;
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
      right:0rem;
      width:0.45rem;
      height:0.45rem;
    }
  }
}
</style>
