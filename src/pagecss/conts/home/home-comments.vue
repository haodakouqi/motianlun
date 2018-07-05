<template>
    <div class="comments" :style="'background:url('+commentData.bgpic+')'">
      <p class="name">{{commentData.name}}</p>
      <p class="title">{{commentData.title}}</p>
      <div class="detail1">
        <img :src="commentData.pic" alt="">
        <span class="detailname">{{commentData.detailname}}</span>
        <span>评论了</span>
        <span class="detailmain">{{commentData.detail}}</span>
      </div>
      <span class="yinhao"></span>
    </div>
</template>

<script>
    export default {
        name: "home-comments",
      props:['commentData']
    }
</script>

<style scoped lang="scss">
.comments{
  width:3.32rem;
  background:red;
  padding:0.1rem;
  position:relative;
  margin:0 auto;
  margin-bottom:0.2rem;
  margin-top:0.08rem;
  border-radius: 0.04rem;
  .name{
    font-size:0.16rem;
    font-weight: 900;
    line-height: 0.3rem;
    color:#efebed;
    margin-bottom:0.06rem;
  }
  .title{
    width:100%;
    font-size:0.14rem;
    color:#efebed;
    line-height: 0.18rem;
    padding-bottom:0.16rem;
    border-bottom:1px solid #eaeaeb;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 2; /** 显示的行数 **/
    overflow: hidden;  /** 隐藏超出的内容 **/
  }
  .detail1{
    display: -webkit-flex;
    -webkit-align-items: center;
    padding-top:0.06rem;
    img{
      height:0.26rem;
      width:0.26rem;
      border-radius:50%;
      margin-right:0.1rem;
    }
    span{
      font-size:0.12rem;
      color:#efebed;
    }
    .detailname{
      margin-right:0.05rem;
    }
    .detailmain{
      margin-left:0.1rem;
      width:1.6rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .yinhao{
    position:absolute;
    top:0.1rem;
    right:0.1rem;
    width:0.39rem;
    height:0.32rem;
    background:url(../../../assets/img/home_yin.png);
    background-size: cover;
  }
}
</style>
