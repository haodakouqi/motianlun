<template>
  <div >
       <div class="sulist">
        <ul>
            <li>
                <p>地址管理</p>
                <img class="rightbtn" src="../../assets/Yimg/riJ.jpg">
            </li>
            <li>
                <p>想看的演出</p>
                <img class="rightbtn" src="../../assets/Yimg/riJ.jpg">
            </li>
            <li>
                <p>我的评论</p>
                <img class="rightbtn" src="../../assets/Yimg/riJ.jpg">
            </li>
            <li>
                <p>我的优惠券</p>
                <img class="rightbtn" src="../../assets/Yimg/riJ.jpg">
            </li>
            <li>
                <p>我的转票</p>
                <img class="rightbtn" src="../../assets/Yimg/riJ.jpg">
            </li>
        </ul>
    </div>

    <div class="nnbox">
        <img src="../../assets/Yimg/nn.jpg">
    </div>

    <div class="lastlist">
        <ul>
           <li>
                <p>常见问题</p>
                <img class="rightbtn" src="../../assets/Yimg/riJ.jpg">
            </li>
            <li>
                <p>联系客服</p>
                <img class="rightbtn" src="../../assets/Yimg/riJ.jpg">
            </li>
        </ul>
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
.sulist{
    width: 100%;
    background: #fff;
    margin-bottom: .1rem;
    ul{
       
        li{
            border-bottom: 1px solid #eaeaea;
            margin-left: .1rem;
            margin-right: .1rem;
            height: .46rem;
            position: relative;
            p{
                font-size: .14rem;
                position: absolute;
                left:0;
                color: #494949;
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
    }
}

.nnbox{
    width: 100%;
    height: 1.08rem;
    background: #fff;
    position: relative;
    margin-bottom: .1rem;
    img{
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -1.5rem;
        margin-top: -.435rem;
        display: block;
        width: 3rem;
        height: .87rem;
    }
}

.lastlist {
    width: 100%;
    background: #fff;
    margin-bottom: .1rem;
    ul {
        width: 100%;
        li {
            border-bottom: 1px solid #eaeaea;
            margin-left: .1rem;
            margin-right: .1rem;
            height: .46rem;
            position: relative;
            p {
                font-size: .14rem;
                position: absolute;
                left: 0;
                color: #494949;
                line-height: .46rem;
            }
            .rightbtn {
                position: absolute;
                width: .09rem;
                height: .15rem;
                right:0;
                top: 50%;
                margin-top: -.08rem;
            }
        }
    }
}
</style>
