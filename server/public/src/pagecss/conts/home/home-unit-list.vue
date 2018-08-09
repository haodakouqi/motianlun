<template>
  <div class="Cshong">
    <a href="javascript:;">
      <img :src="'http://pimg.damai.cn/perform/project/'+unitobj.fold+'/'+unitobj.projectId+'_n.jpg'" alt="">
      <p class="title">{{unitobj.projectName}}</p>
      <p class="time">{{unitobj.showTime}}</p>
      <p class="price"><span>{{unitobj.price}}</span>元起</p>
      <span class="discounts">
        <discount2 :disc="discc"></discount2>
      </span>
    </a>
  </div>
</template>

<script>
  import '../public/discount2'
    export default {
        name: "home-unit-list",
      props:['unitobj','discc']
    }
</script>

<style scoped lang="scss">
.Cshong{
  a{
    width:1.16rem;
    display: -webkit-flex;
    -webkit-flex-direction: column;
    flex-direction: column;
  -webkit-align-items: center;
    margin-left:0.08rem;
    position: relative;
    // flex-shrink: 0;
    display: block;
    img{
      width:1.04rem;
      height:1.48rem;
      border-radius:0.03rem;
    }
    p{
      padding-left:0.1rem;
      width:100%;
    }
    .title{
      line-height: 0.16rem;
      color:#000000;
      font-size:0.12rem;
      word-break: break-all;
      text-overflow: ellipsis;
      display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
      -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
      -webkit-line-clamp: 2; /** 显示的行数 **/
      overflow: hidden;  /** 隐藏超出的内容 **/
    }
    .time{
      line-height: 0.22rem;
      color:#b1b1b1;
      font-size:0.1rem;
    }
    .price{
      line-height: 0.2rem;
      color:#b1b1b1;
      font-size:0.1rem;
      display: -webkit-flex;
      span{
        color:#ff0000;
        margin-right:0.05rem;
      }
    }
    .discounts{
      position:absolute;
      left:0.1rem;
      top:-0.06rem;
    }

  }
}
</style>
