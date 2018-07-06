<template>
<div>
<header>
        <div class="setbox">
            <img src="../../assets/Yimg/sin.jpg" >
            <img src="../../assets/Yimg/set.jpg" >
        </div>
        <div class="userbb" @click="gologin">
            <div class="imgbox"></div>
            <div class="pbox">
                <p class="tpp">{{ userInfo}}</p>
                <p class="bpp">{{cookieword}}</p>
            </div>
            <img class="rightbtn" src="../../assets/Yimg/riJ.jpg">
        </div>
    </header>
    
    <div class="molibox">
        <img class="moliimg" src="../../assets/Yimg/moli.jpg">
        <p>加入摩天轮，获取魔力值</p>
        <img class="rightbtn" src="../../assets/Yimg/riJ.jpg">
    </div>
</div>
  
</template>

<script type="text/ecmascript-6">
export default {
    computed: {
    //   ...mapState(['userInfo'])  
    },
  data() {
    return {
        cookieword:"无需注册，快捷登录",
        userInfo:window.localStorage.getItem("locationusername")
    }
  },
  components: {

  },
  methods: {
      gologin(){
          this.$router.push({name:'Ylogin'})
        //   if(this.userInfo==='点击登录'){
        //       this.$router.push({name:'Ylogin'})
        //   }else{
        //       this.$router.push({name:'Ybb'})
        //   }
      }
  },
  created(){
           //获取cookie
 
            // var sCookie = document.cookie;
            // var aCookie = sCookie.split('; ');

  
            // for(var i = 0; i < aCookie.length; i++) {
            //   var aTemp = aCookie[i].split('=');

            //   if(aTemp[0] === "username") {
            //     var cookienumber = decodeURIComponent(aTemp[1]);
            //     // console.log(cookienumber.toString().replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'));
            //     //this.cookieshow = cookienumber.toString().replace(/(\d{3})\d{5}(\d{3})/, '$1*****$2');
            //     this.cookieshow = cookienumber.toString().replace(/(\d{3})\d{4}(\d{4})/, '$1*****$2');

            //   }
            //   if(cookienumber){
            //       this.cookieword="查看并编辑个人信息"
            //   }
            // }
            
        },
        mounted () {
            if(this.userInfo==='点击登录'){
                console.log(typeof(this.userInfo))
                this.cookieword="无需注册，快捷登录"
            }
            else{
                 this.cookieword="查看并编辑个人信息"
            }
        }
}
</script>

<style scoped lang="scss">
header{
    width: 100%;
    display: -webkit-flex;
    flex-direction: column;
    background: #fff;
    margin-bottom: .1rem;
    height: 1.1rem;
    .setbox{
        width: 100%;
        height: .4rem;
        line-height: .4rem;
        img{
            display: block;
            float:right;
            height: .2rem;
            width: .2rem;
            margin-right: .1rem;
            margin-top: .1rem;
        }
    }
    .userbb{
        width: 100%;
        height: .7rem;
        display: -webkit-flex;
        align-items: center;
        position: relative;
        .imgbox{
            width: .55rem;
            height: .55rem;
            border-radius: 50%;
            background: teal;
            margin-left: .1rem;
            margin-right: .1rem;
        }
        .pbox{
            .tpp{
                font-size: .14rem;
                line-height: .22rem;
                color: #331612;
            }
            .bpp{
                font-size: .12rem;
                color:#aaaaaa;
                line-height: .22rem;
            }
        }
        .rightbtn{
             position: absolute;
             width: .09rem;
             height: .15rem;
             right: .1rem;
             top: 50%;
             margin-top: -.08rem;
        }
    }
}


.molibox{
    background: #fff;
    height: .5rem;
    line-height: .5rem;
    position: relative;
    margin-bottom: .1rem;
    .moliimg{
        display: block;
        width: .6rem;
        height: .25rem;
        position: absolute;
        left: .1rem;
        top:50%;
        margin-top: -.12rem;
    }
    p{
        font-size: .14rem;
        color: #aaaaaa;
        position: absolute;
        right: .3rem;
        line-height: .5rem;
    }
    .rightbtn{
        position: absolute;
        width: .09rem;
        height: .15rem;
        right: .1rem;
        top: 50%;
        margin-top: -.08rem;
    }
}
</style>
