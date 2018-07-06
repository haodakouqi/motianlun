<template>
    <div  class="Ltop" id="top-art">
        <img class="ser" src="../assets/img/ser.png"/>
        <a href="javascript:;" class="k1" @click="goTo('Address')"><span>{{Tcity}}</span><img src="../assets/img/down.png"></a>
        <input id="inp"  type="text" @click="goTo('search')" value="搜索明星、演出、赛事、场馆">
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
    computed:{
        Tcity(){
            return this.$store.getters.getlocation;
        }
    },
    methods: {
        goTo(a){
            this.$router.push({name:a});
        }
    }, 
    mounted(){
    }
   
}
</script>
<style lang='scss' scoped >
.Ltop{
    display:flex;
    align-items: center;
    padding:0.1rem 0.10rem;
    position: relative;
    a{
        font-size: 0.15rem;
        color:#000;
        display:flex;
        align-items: center;
        img{
            margin:0 0.12rem 0 0.05rem;
        }
        span{
            white-space: nowrap;
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


