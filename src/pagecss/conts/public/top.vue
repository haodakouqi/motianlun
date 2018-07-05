<template>
  <header>
    <div class="addr">
      <span @click="gotoaddress">{{address}}</span><!--<i></i>-->
    </div>
    <div class="title">
      <i class="iconfont icon-motianlun"></i>
      <span>摩天轮票务</span>
    </div>
    <div class="searchinput" ref="mtltop">
      <i class="iconfont icon-sousuo"></i>
      <input type="text" placeholder="火热演唱会正在抢购中">
    </div>
    <div class="iconlist">
      <i class="iconfont icon-weibiaoti-" @click="gotodate('Date')"></i>
      <i class="iconfont icon-bell" @click="gotodate('Ylogin')"></i>
    </div>
  </header>
</template>

<script>
    export default {
      name: "top",
      props:["datas","honetop"],
      data(){
          return {
            address:'定位中...'
          }
      },
      watch:{
        honetop:function(newval,old){
          //  console.log(newval);
           let el =this.$refs.mtltop;
            if (newval>100){
              el.style.top = '0.08rem';
              el.style.transition = 'all 1s';
              el.style.width = '2.3rem';
              el.style.marginLeft = '0.65rem';
              el.style.background = '#f2f2f2';
              el.previousElementSibling.style.width = '2.3rem';
              el.previousElementSibling.style.opacity = '0';
              el.previousElementSibling.style.transition = 'all 1s';
            }
            if (newval<=100){
              el.style.top = newval/100 + 'rem';
              // el.style.top = '1.8rem';
              el.style.transition = 'all 1s';
              el.style.width = '3.49rem';
              el.style.marginLeft = '0.12rem';
              el.style.background = 'white';
              el.previousElementSibling.style.width = 'auto';
              el.previousElementSibling.style.opacity = '1';
              el.previousElementSibling.style.transition = 'all 0.3s';
            }
            if (newval<=0){
              el.style.top = '1.8rem';
            }
        }
      },
      methods:{
        gotodate(a){
          this.$router.push({name:a});
        },
        gotoaddress(){
          this.$router.push({name:"Address"});
        },
        ready () {
          if (this.datas){
            console.log(1);
            this.address = this.datas;
          }else{
            let geolocation = new BMap.Geolocation()
            geolocation.getCurrentPosition((r) => {
              if (r.point) {
                this.address = r.address.city;
              }
            },()=>{
              this.address= '定位失败';
            })
          }
        }
      },
      mounted(){
          this.$nextTick(function () {
            console.log(this.datas);
            this.ready();
          });
      }
    }
</script>

<style scoped lang="scss">
header{
  width:100%;
  display:-webkit-flex;
  -webkit-justify-content: space-around;
  -webkit-align-items: center;
  height:0.5rem;
  position: relative;;
  z-index: 9999;
  background:#ffff;
  .iconfont{
    font-size:0.22rem;
  }
  .addr{
    display:-webkit-flex;
    -webkit-align-items: center;
    span{
      font-size:0.14rem;
      color:#442925;
    }
    i{
      display:block;
      width:0;
      height:0;
      border:0.04rem solid transparent;
      border-top-color:#000;
      margin-left:0.05rem;
      margin-top:0.06rem;
    }
  }
  .title{
    display:-webkit-flex;
    -webkit-justify-content: center;
    span{
      font-size:0.16rem;
      color:#090909;
      margin-left:0.05rem;
    }
    .icon-motianlun{
      color:#f80033;
    }
  }
  .searchinput{
    position:absolute;
    left:0;
    top:1.8rem;
    width:3.49rem;
    margin-left:0.12rem;
    box-shadow: 0 1px 6px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12);
    .icon-sousuo{
      position:absolute;
      left:0.3rem;
      top:25%;
      font-size:0.15rem;
      color:#ff0021;
      font-weight: 900;
    }
    input{
      display:block;
      border:none;
      width:100%;
      line-height: 0.37rem;
      text-align:center;
      outline:#cacaca;
    }
  }
  .iconlist{
    display:-webkit-flex;
    .iconfont{
      color:#000;
    }
    .icon-bell{
      margin-left:0.14rem;
    }
  }
}
</style>
