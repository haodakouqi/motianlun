<template>
  <div>
    <header>
        <p @click="$router.back()">X</p>
        <img src="../../assets/Yimg/log.jpg">
    </header>

    <section>
        <div class="phonebox"><input type="text" name="" id="phone" v-model="phonenum" @click="phonebtn" placeholder="请输入手机号" maxlength="11" min="11"></div>
        <div class="paswbox"><input type="text" name="" id="password" v-model="oValue" @click="pasbtn" placeholder="请输入图形码"><input type = "button" id="code" v-model="codess" @click="createCode"/></div>
        <div class="possbox"><input type="text" name="" id="poss" placeholder="请输入验证码" maxlength="6" min="6"><input id="btnb" type="button" v-model="codeMsg"  @click="settime" :disabled="codeDisabled"></div>
        <div class="loginbox"><input type="button" name="" id="btn" @click="btnn(name,phonenum,1)" value="登录"></div>
        <p>未注册过的手机号将自动创建摩天轮账号</p>
    </section>

    <p id="errop">手机格式错误</p>
    <p id="erroimg">图形码错误</p>
    <p id="erroposs">验证码错误</p>

  </div>
</template>

<script type="text/ecmascript-6">
export default {
    name:'ylogin',
  data() {
    return {
    // 是否禁用按钮
    codeDisabled: false,
    // 倒计时秒数
    countdown: 60,
    // 按钮上的文字
    codeMsg: '获取验证码',
    // 定时器
    timer: null,
    // 验证码
    // code :'',
    //设置长度，这里看需求，我这里设置了4
    codeLength : 4, //验证码长度
    phonenum:"", //手机号
    codess:'',  //生成的图形验证码
    oValue:"",   //输入的图形验证码
    name:"username", //cookie名字
    }
  },
  components: {

  },
  methods: {
      goback(){
        this.$router.push({name:'Ymy'})
    },
      //生成验证码
      createCode(){
        var code="";
        //设置随机字符
        var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z');
        //循环codeLength 我设置的4就是循环4次
        for(var i = 0; i <this.codeLength; i++){
            //设置随机数范围,这设置为0 ~ 36
             var index = Math.floor(Math.random()*36);
             //字符串拼接 将每次随机的字符 进行拼接
             code += random[index]; 
        }
        //将拼接好的字符串赋值给展示的Value
        this.codess = code;
    },




      // 倒计时60秒切换

        settime() {
            // 验证码60秒倒计时
        if (!this.timer) {
            this.timer = setInterval(() => {
             if (this.countdown > 0 && this.countdown <= 60) {
                    this.countdown--;
                 if (this.countdown !== 0) {
                    this.codeMsg = "重新发送(" + this.countdown + ")";
                } else {
                    clearInterval(this.timer);
                    this.codeMsg = "获取验证码";
                    this.countdown = 60;
                    this.timer = null;
                    this.codeDisabled = false;
                }
             }
           }, 1000)
        }
      },
      //封装$函数
         $(id){
            return document.getElementById(id);
        },
             

    //手机号验证
    
       userAttest(){
            
            var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if(this.phonenum.length == 0) {
                document.getElementById("errop").style.display="block";
                return false;
            }
            if(this.phonenum.length < 11) {
                document.getElementById("errop").style.display="block";
                return false;
            }
            return true;
        },
        //验证码验证
        charAttest() {
            //  var oValue = document.getElementById('password').value.toUpperCase();
        if(this.oValue.toUpperCase() ==0){
            document.getElementById("erroimg").style.display="block";
            return false;
        }
        if(this.oValue.toUpperCase() != this.codess){
            document.getElementById("erroimg").style.display="block";
            this.oValue = ' ';
            this.createCode();
            return false;
        }
            return true;
        },
        //点击登录，开始验证
    phonebtn(){
        document.getElementById("errop").style.display="none";
    },
    pasbtn(){
        document.getElementById("erroimg").style.display="none";
        document.getElementById("errop").style.display="none";
    },
    btnn(){
         if(!this.userAttest()) {
            return false;
        }
        // if(!passwordAttest()) {
        //     return false;
        // }
        if(!this.charAttest()) {
            return false;
        }
        const user = this.phonenum;
        console.log(user);
        this.$store.dispatch('recordUser',user)
        this.$router.push({name:'Ymy'})
        // this.$store.commit('isLogin','100')   
        //登录后改变登录状态 isLogin = 1 ；
    }
    // btnn(name, value, day, path, domain) {
    //     if(!this.userAttest()) {
    //         return false;
    //     }
    //     // if(!passwordAttest()) {
    //     //     return false;
    //     // }
    //     if(!this.charAttest()) {
    //         return false;
    //     }
    //      var sCookie = name + '=' + encodeURIComponent(value);

    //         // 设置过期时间
    //         if(day) {
    //             var oDate = new Date();
    //             oDate.setDate(oDate.getDate() + day);
    //             sCookie = sCookie + ';expires=' + oDate;
    //         }

    //         // 设置路径
    //         if(path) {
    //             sCookie = sCookie + ';path=' + path;
    //         }

    //         // 设置域名
    //         if(domain) {
    //             sCookie = sCookie + ';domain=' + domain;
    //         }
    //         document.cookie = sCookie;
    //     // alert("验证成功!");
    //     // window.location.href="ware";
    //     this.$router.push({name:'Ymy'})
    // }

       


},
mounted() {
    this.createCode();
},


}


</script>

<style scoped lang="scss">
header{
    width: 100%;
    height: 1.5rem;
    position: relative;
    p{
        font-size: .2rem;
        color:#aaaaaa;
        position: absolute;
        top: .1rem;
        right: .2rem;
    }
    img{
        display: block;
        width: .8rem;
        height: .93rem;
        position: absolute;
        top:.42rem;
        left: 50%;
        margin-left: -.4rem;
    }
}

section{
    width: 100%;
    height: auto;
    .phonebox{
        
        height: .47rem;
        margin-left: .2rem;
        margin-right: .2rem;
        border-bottom: 1px solid #eaeaea;
        position: relative;
        input{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            outline: none;
            border: none;
            font-size: .14rem;
            color: #aaaaaa;
        }
    }
    .paswbox{
        position: relative;
        height: .47rem;
        margin-left: .2rem;
        margin-right: .2rem;
        border-bottom: 1px solid #eaeaea;
        #password {
            position: absolute;
            left: 0;
            top: 0;
             width: 70%;
             height: 100%;
             outline: none;
             border: none;
             font-size: .14rem;
             color: #aaaaaa;
             border-bottom: 1px solid #eaeaea;
        }
        #code{
            position: absolute;
            left: 70%;
            top: 0;
            width: 30%;
            height: 100%;
            vertical-align: middle;
            outline: none;
            border: none;
            font-size: .22rem;
            background: #fff;
            color: #321612;
            border-bottom: 1px solid #eaeaea;
            background: deepskyblue;
        }
    }
    
    .possbox{
        position: relative;
        height: .47rem;
        margin-left: .2rem;
        margin-right: .2rem;
        #poss {
            position: absolute;
            left: 0;
            top: 0;
            width: 70%;
            height: 100%;
            outline: none;
            border: none;
            font-size: .14rem;
            color: #aaaaaa;
            border-bottom: 1px solid #eaeaea;
        }
        #btnb {
            position: absolute;
            left: 70%;
            top: 0;
            width: 30%;
            height: 100%;
            vertical-align: middle;
            outline: none;
            border: none;
            font-size: .14rem;
            background: #fff;
            color: #321612;
            border-bottom: 1px solid #eaeaea;
        }
    }
    .loginbox{
        position: relative;
        height: .41rem;
        margin-top: .2rem;
        margin-left: .2rem;
        margin-right: .2rem;
        input{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            box-shadow: 1px;
            border-radius: .1rem;
            background: #f11078;
            color: #fff;
            outline: none;
            border: none;
        }
    }
    p{
        width: 100%;
        text-align: center;
        font-size: .12rem;
        line-height: .24rem;
        color: #aaaaaa;
    }
}

#errop{
    position: fixed;
    display: none;
    bottom: .2rem;
    left: 30%;
    width: 1.5rem;
    height: .5rem;
    line-height: .5rem;
    color: #fff;
    background: #000;
    text-align: center;
    border-radius: .1rem;
    opacity: .8;
    font-size: .16rem;
}
#erroimg{
    position: fixed;
    display: none;
    bottom: .2rem;
    left: 30%;
    width: 1.5rem;
    height: .5rem;
    line-height: .5rem;
    color: #fff;
    background: #000;
    text-align: center;
    border-radius: .1rem;
    opacity: .8;
}
#erroposs{
    position: fixed;
    display: none;
    bottom: .2rem;
    left: 30%;
    width: 1.5rem;
    height: .5rem;
    line-height: .5rem;
    color: #fff;
    background: #000;
    text-align: center;
    border-radius: .1rem;
    opacity: .8;
}
</style>
