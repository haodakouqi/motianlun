<template>
    <div class="LfindYant">
        <header>
            <top></top>
        </header>
        <ul>
            <li v-for="(item,index) in achild" :key='index'>
                <img :src="item.posterUrl">
                <p>{{item.bannerName}}</p>
            </li>
        </ul>
    </div>  
</template>
<script>
import top from '../components/Ltop'
export default {
    name:'LfindYant',
    data(){
        return{
            life:false,
            achild:{},
            city:"6101",
            time:(new Date()).getTime()
        }
    },
    components:{
        top
    },
    methods:{
        initData(city,time){
            fetch(`http://localhost:8410/qpa/qfind?city=${city}&time=${time}`)
            .then(res=>res.json())
            .then(data=>{
                this.life=true;
                this.achild=JSON.parse(data).body.result.data;
                console.log(JSON.parse(data));
                
            })
        }
    },
    mounted(){
        this.initData(this.city,this.time)
    }
}
</script>
<style lang="scss" scoped>
.LfindYant{
    display: flex;
    flex-direction: column;
    height: 100%;width:100%;
    header{
        height: 0.55rem;
    }
    ul{
        padding-bottom:0.65rem; flex:1;overflow-y: scroll;
        li{
            display:flex;
            flex-direction: column;
            padding:0 0.13rem;
            p{
                font-size:0.14rem;
                margin:0.07rem 0 0.17rem 0;
            }
        }

    }
}
</style>

