<!-- achild -->
<template>
  <div>
    <div class="abook" v-if="life">
        <div class="footer_one" v-for="(item,index) in achild.body.result.data" :key="index">
            <div class="fto_left"><img :src="item.posterURL" alt=""></div>
            <div class="fto_right">
                <h1>{{item.showName}}</h1>
                <p>{{item.showDate}}</p>
                <p>{{item.venueName}}</p>
                <p class="fto_right_px" ref="index_a"><span>{{item | minprice_a(that,index)}} </span>元起</p>
                <p class="fto_right_py" ref="indexb">{{item.advertise | advertise_a(that,index)}}</p>
                <div class="fto_right_a" ref='index' ><div>{{item.discount | counter(that,index)}}</div>折起</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name:"abook",
    data () {
        return {
        that:this,
        life:false,
        achild:{},
        Qoffset:"1",
        Qcity:"全国",
        Qlength:"10",
        Qctl:"1101",
        Qtime:"1530516039442"
        };
    },
    mounted() {
        this.initfetch(this.Qoffset,this.Qcity,this.Qctl,this.Qtime,this.Qlength);
        
    },
    filters:{
        counter(value,that,indexs){
            let values = value*100;
            if(value== 1 || value== 0){
                that.$nextTick(function(){
                    that.$refs.index[indexs].style.display = "none";
                    // console.log(that.$refs.index[indexs].style);
                });
                return 0;
            }else{
                var book =(Math.floor(values))/10;
                return book;
            }
        },
        minprice_a(value,that,indexs){
            if(value.discount ==1 || value.discount ==0){
                that.$nextTick(function(){
                    that.$refs.index_a[indexs].innerHTML = '<span style="color:#4ac692;background:#ecf9f4;">未开售</span>';
                });
                return 0;
            }else{
                return value.minPrice;
            }
        },
        advertise_a(value,that,indexsa){
            if(value == ""){
                that.$nextTick(function(){
                    that.$refs.indexb[indexsa].style.display = "none";
                });    
                return 0;
            }else{
                return value;
            }
        }
    },
    methods: {
        initfetch(foffset,ft,fc,ftime,flength){
            fetch('http://localhost:8410/qpa/qsearch?offset='+foffset+'&keyword='+ft+'&city='+fc+'&time='+ftime+'&length='+flength)
            .then(res=>res.json())
            .then(data=>{
                this.life=true;
                this.achild=JSON.parse(data);
                // console.log(this.achild);
                
            })
        },
    }
}

</script>
<style lang='scss' scoped>
.abook{
    .footer_one{
        display: flex;border-bottom: 1px solid #f3f3f3;
        .fto_left{
            width: 0.92rem;height: 1.23rem;padding:0.12rem 0.12rem;
        }
        .fto_right{
            flex: 1;position: relative;
            h1{
                line-height: 0.23rem;
                font-size: 0.16rem;padding:0.1rem 0 0.13rem;font-weight: 600;
                color:#000000;
            }
            p{
                line-height: 0.22rem;font-size: 0.12rem;
            }
            .fto_right_px{
                font-size: 0.12rem;line-height: 0.36rem;
                border-bottom: 1px solid #f3f3f3;
                span{
                    color:#ff3c5c;font-size: 0.14rem;
                }
            }
            .fto_right_py{
                line-height: 0.17rem;font-size: 0.12rem;
                padding: 0.12rem 0;
            }
            .fto_right_a{
                position: absolute;top:0.6rem;right:0.1rem;
                border-radius: 50%;background: #fb1a50;
                width: 0.44rem;height: 0.44rem;line-height: 0.08rem;
                padding:0.04rem;text-align: center;
                color:rgba(254,175,196,.5);
                font-size: 0.12rem;
                div{
                    color:#ffffff;font-size: 0.18rem;
                    line-height: 0.26rem;font-weight: 600;
                }
            }
        }
    }  
}
</style>