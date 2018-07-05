<template>
    <div  class="Ltop" id="top-art">
        <img class="ser" src="../assets/img/ser.png"/>
        <a href="javascript:;" class="k1" @click="goLink"><span>{{msg}}</span><img src="../assets/img/down.png"></a>
        <input id="inp"  type="text" @focus="goTo('search')" value="搜索明星、演出、赛事、场馆">
    </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name:'top',
    data(){
        return{
            msg:'北京'
        }
    },
    methods: {
        // ...mapActions(['fun1']),
        buffer(){
            // $(window).scroll(function(){
            // if($(window).scrollTop() > 100){
            //     $("#top-art").css({'background':'#ffffff'}).fadeIn(1000);
            //     $(".k1").css({'color':'#9a9a9a'}).fadeIn(1000);
            // } else {
            // var st =  Math.ceil(Math.ceil($(window).scrollTop()-10)/10);
            // var sts = st/10;
            //     if(sts < 0){
            //         sts = 0;
            //     }
            //     $("#top-art").css({'background':'rgba(250,250,250,'+sts+')','color':'transparent'}).fadeIn(1000);
            //     $(".k1").css({'color':'#000'}).fadeIn(1000);
            //     }
            // })
        },
        goTo(a){
            this.$router.push({name:a});
            // this.number = b;
        },
        goLink(){

        }
    }, 
    mounted(){
        this.buffer();
    }
   
}
</script>
<style lang='scss' scoped >
.Ltop{
    display:flex;
    align-items: center;
    padding:0.1rem 0.13rem;
    position: relative;
    a{
        font-size: 0.15rem;
        color:#000;
        display:flex;
        align-items: center;
        img{
            margin:0 0.12rem 0 0.05rem;
        }
    }
    input{
        width:2.32rem;
        border:none;
        background: #f2f2f2;
        border-radius: 0.05rem;
        padding:0.1rem 0.32rem;
        color:#9e9e9e;
    }
    .ser{
        position:absolute;
        top:0.195rem;
        left:0.78rem;
    }
}

</style>


