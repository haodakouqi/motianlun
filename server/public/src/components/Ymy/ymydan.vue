<template>
  <div>
      <div class="ddbox">
        <div class="mydd">
            <h4>我的订单</h4>
            <p>查看所有订单</p>
            <img class="rightbtn" src="../../assets/Yimg/riJ.jpg">
        </div>
        <div class="ddlist">
            <ul>
                <li>
                    <img src="../../assets/Yimg/dd1.jpg">
                    <p>待付款</p>
                </li>
                <li>
                    <img src="../../assets/Yimg/dd2.jpg">
                    <p>待配票</p>
                </li>
                <li>
                    <img src="../../assets/Yimg/dd3.jpg">
                    <p>配票中</p>
                </li>
                <li>
                    <img src="../../assets/Yimg/cart.jpg">
                    <p>待收票</p>
                </li>
                <li>
                    <img src="../../assets/Yimg/talk.jpg">
                    <p>待评论</p>
                </li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
.ddbox{
    background: #fff;
    width: 100%;
    margin-bottom: .1rem;
    .mydd{
        margin-left: .1rem;
        margin-right: .1rem;
        position: relative;
        height: .46rem;
        border-bottom: 1px solid #eaeaea;
        h4{
            font-size: .14rem;
            line-height: .46rem;
            position: absolute;
            left: 0;
            color: #696969;
        }
        p{
           font-size: .12rem;
           color: #aaaaaa;
           position: absolute;
           right: .2rem;
           line-height: .46rem;
        }
        .rightbtn {
            position: absolute;
            width: .09rem;
            height: .15rem;
            right: 0;
            top: 50%;
            margin-top: -.08rem;
        }
    }
    .ddlist{
        width: 100%;
        height: .81rem;
        ul{
            width: 100%;
            height: 100%;
            display: -webkit-flex;
            align-items: center;
            justify-content: space-around;
        li{
            img{
                width: .25rem;
                height: .21rem;
                margin-left: .05rem;
            }
            p{
                font-size: .12rem;
                color: #aaaaaa;
                line-height: .3rem;
            }
        }
        }
    }
}
</style>
