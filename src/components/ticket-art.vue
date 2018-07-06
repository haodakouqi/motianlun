<template>
    <div class="ticketart">
        <img class="im" src="../assets/img/turn.jpg"/>
        <p class="p1">
            <a href="javascript:;">
                <img src="../assets/img/money.png"/>
                <span>我的转票</span>
            </a>
            <a href="javascript:;">
                <img src="../assets/img/give.png"/>
                <span>我要转票</span>
            </a>
        </p>
        <p class="p2">近期转票</p>
        <ul>
            <li v-for="(it,index) in turndata" :key="index">
                <img :src="'http://pimg.damai.cn/perform/project/'+it.fold+'/'+it.projectId+'_n.jpg'"/>
                <div>
                    <p>{{it.projectName}}</p>
                    <p class="tim">{{it.showTime}}</p>
                    <p class="tim">{{it.venue}}</p>
                    <a href="javascript:;">我要转票</a>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:'ticketart',
    data(){
        return{
            ctl:"演唱会",
            turndata:[]
        }
    },
    computed:{
        Tcity(){
            return this.$store.getters.getlocation;
        }
    },
    methods:{
        fetchDate(a,b){
			fetch('http://localhost:8410/qpa/data?city='+a+'&ctl='+b)
			.then(response=>response.json())
			.then(data=>{
                this.turndata=JSON.parse(data).body.suggest;
                console.log(JSON.parse(data));
			})	
		}
    },
    mounted(){
        this.fetchDate(this.Tcity,this.ctl);
        // this.$on('getParams',(data) => {
        //     this.mate = data;
        //     this.fetchDate();
        // });
    }
}
</script>
<style lang="scss" scoped>
.ticketart{
    // height: 100%;width:100%;
    .center{
        padding-bottom:0.6rem;
    }
    .im{
        width:100%;
        z-index:-1;
    }
    .p1{
        display:flex;
        padding:0.12rem 0.67rem;
        justify-content: space-between;
        border-bottom:1px solid #ccc;
        a{
            display:flex;
            flex-direction: column;
            align-items: center;
            img{
                margin-bottom:0.12rem;
            }
            span{
                font-size: 0.13rem;
                color:#737373;
            }
        }
    }
    .p2{
        font-size: 0.13rem;
        color:#737373;
        padding:0.15rem 0.13rem;
    }
    li{ 
        display:flex;
        padding:0 0.13rem 0.25rem;
        p{
            font-size: 0.13rem;
            padding-bottom:0.1rem;
        }
        img{
            margin-right:0.13rem;
            width:0.91rem;
            height:1.21rem;
        }
        .tim{
            color:#737373;
        }
        a{
            display:flex;
            width:0.55rem;
            padding:0.1rem 0.13rem;
            font-size: 0.13rem;
            background:#f51467;
            border-radius: 0.25rem;
            color:#fff;
            margin-left:1.62rem;
        }
    }
}
</style>


