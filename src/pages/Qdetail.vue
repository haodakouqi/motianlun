<template>
  <div class="Qdetail">
	<div class="header">
        <i class="iconfont icon-fanhui" @click="goTo('-1')"></i>
        <div class="topsttitl">
        	<span>{{ibook.showName}}</span>
        </div>
        <div class='topst1'>
            <i class="iconfont icon-shoucang"></i>
            <i class="iconfont icon-fenxiang"></i>
        </div>
    </div>
    <div class="mainbox">
        <div class="body1">
            <div class="body11">
                <div class="fto_left"><img :src="ibook.posterURL" alt=""></div>
                <div class="fto_right">
                    <h1>{{ibook.showName}}</h1>
                    <p>{{ibook.latestShowTime}}</p>
                    <p>{{ibook.venue}}</p>
                    <p class="fto_right_px"><span>{{ibook.minPrice}}</span>元起</p>
                    <p class="fto_right_py">{{ibook.advertise}}</p>
                    <div class="fto_right_a"><div>{{ibook.discount}}</div>折起</div>
                </div>
                <div class="body12" :style="{'background':'url('+ibook.posterURL+') center center'}"></div>
            </div>
        </div>
        <div class="body2">
            <div class="body21">
                <span>{{ibook.venueAddr}}</span>
                <p>{{ibook.venueName}}</p>
            </div>
            <div class="body22" @click="goIn('qDetailone')"><img src="../assets/img/address.jpg"></div>
        </div>
        <div class="body3">
            <img src="../assets/img/redbag.jpg">
        </div>
        <div class="body4">
            <img src="../assets/img/server.jpg">
        </div>
        <div class="body5">
            <div class="card">
                <div class="card1">
                    <img src="../assets/img/profilepicture.jpg">
                    <span>法斯宾德</span>
                </div>
                <div class='card2'>
                    <span>城墙·朴树·生如夏花</span>
                </div>
                <div class="card3">
                    <span>一个能花十年时间去放松、去沉淀的歌手，没有绯闻也没有新闻，朴树，低调又神秘。始终以低调的...</span>
                </div>
            </div>
        </div>
        <div class="body6">
            <p>演出介绍</p>
        </div>
        <div class="body7" :style="{height:book}">
            <p>他穿一件圆领白T恤，袖子挽起，修长的手熟练地拨动琴弦。他剪了短发，脸庞还是那么帅得深沉，即使在岁月的洗礼下沧桑了不少，也还是遮盖不住他如孩子一般的纯真。
            </p>
            <div class="body71">
                <img :src="ibook.posterURL" alt="">
            </div>
            <p>在生活中，他抽中南海，会捡掉在地上的烟，但不随便丢烟头；他不喝酒，更喜欢喝水和咖啡，喜欢吃什么，就会一连吃好几个月；他衣着随意，不挑牌子，但随便怎么穿，都能穿出一种独具风格的气质；他接受采访从不随意听从记者安排，想说什么就说，不想说，怎么问也不会说；他拍照从不轻易听摄影师摆弄，不换衣服，不摆造型，不假装笑，但每次封面出来，都很有型；他写歌总是发自内心，要么写，就写真实感觉，要么就不写；他父母都是北大教授，从不干涉儿子的决定，朴树一开始不想考大学（能上北大），父母希望他考，就考了首都师范大学，不到两年就朴树在退学，父母没干涉，甚至朴树在03年后好几年时间里，都不知道他在干什么；朴树的妻子很漂亮，她喜欢他的才华和诚恳，一起开过小店，日子简单充实；韩寒喜欢朴树，喜欢他的诚恳以及淡泊名利，在高晓松眼里，朴树一直是个阳光男孩。
            </p>
            <div class="body71">
                 <img src="../assets/img/pic2.jpg">
            </div>
            <p>在生活中，他抽中南海，会捡掉在地上的烟，但不随便丢烟头；他不喝酒，更喜欢喝水和咖啡，喜欢吃什么，就会一连吃好几个月；他衣着随意，不挑牌子，但随便怎么穿，都能穿出一种独具风格的气质；他接受采访从不随意听从记者安排，想说什么就说，不想说，怎么问也不会说；他拍照从不轻易听摄影师摆弄，不换衣服，不摆造型，不假装笑，但每次封面出来，都很有型；他写歌总是发自内心，要么写，就写真实感觉，要么就不写；他父母都是北大教授，从不干涉儿子的决定，朴树一开始不想考大学（能上北大），父母希望他考，就考了首都师范大学，不到两年就朴树在退学，父母没干涉，甚至朴树在03年后好几年时间里，都不知道他在干什么；朴树的妻子很漂亮，她喜欢他的才华和诚恳，一起开过小店，日子简单充实；韩寒喜欢朴树，喜欢他的诚恳以及淡泊名利，在高晓松眼里，朴树一直是个阳光男孩。
            </p>
        </div>
        <div class="QDbutton" v-fold='{color:this}'>
            <span>展开▼</span>
        </div>
        <div class="hbook" v-if="life">
            <div class="footer_one" v-for="(item,index) in achild" :key="index" >
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
    <div class="footer">
        <img src="../assets/img/bottombutton.jpg">
    </div>
  </div>
</template>

<script>
export default {
    name: 'qdetail',
    data () {
        return {
            that:this,
            book:"1rem",
            life:false,
            achild:{},
            offset:"0",
            length:"15",
            time:"1530516039442"
            
        }
    },
    computed:{
        ibook(){
            console.log('111');
            return this.$store.getters.getdetail;
        }
    },
    directives:{
        fold:{
            inserted(el,binding){
                el.addEventListener('click',function(){
                    console.log(el,binding.value.color.book)
                    if(binding.value.color.book == "1rem"){
                        binding.value.color.book = "auto";
                        el.firstElementChild.innerHTML="收回▲"
                    }else{
                        binding.value.color.book = "1rem";
                        el.firstElementChild.innerHTML="展开▼"
                    }
                }, false)
            }
        }
    },
    methods:{
        goTo(a){
            this.$router.go(a);
        },
        goIn(addres){
            this.$router.push({name:addres});
        },
        initData(Qoffset,Qid,Qtime,Qlength){
            fetch('http://localhost:8410/qpa/qconnect?offset='+Qoffset+'&id='+Qid+'&time='+Qtime+'&length='+Qlength)
            .then(res=>res.json())
            .then(data=>{
                this.life=true;
                this.achild=JSON.parse(data).body.result.data;
                console.log(this.achild);
                
            })
        }
    },
    mounted(){
        console.log(this.ibook);
        this.initData(this.offset,this.ibook.showOID,this.ibook.latestShowTime_long,this.length)
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
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/fonts/iconfont.css";
.Qdetail{
    height: 100%;width:100%;display:flex;
    flex-direction: column;
    .header{
        width: 3.75rem;height: 0.5rem;
        background:gray;color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.15rem 0 0.15rem;
        box-sizing:border-box;
        i{
            font-size: 0.26rem;
        }
        span{
            font-size:0.15rem;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
        }
        .topsttitl{
            display: flex;
            width: 1.875rem;
        
        }
        .topst1{
            display: flex;
            width: 0.6rem;
            justify-content: space-between;
        }
    }
    .mainbox{
        flex: 1;overflow-y: scroll;width:100%;
        .body1{
            .body11{
                display: flex;border-bottom: 1px solid #f3f3f3;color:#ffffff;
                position: relative;
                .fto_left{
                    width: 0.92rem;height: 1.23rem;padding:0.12rem 0.12rem;
                }
                .fto_right{
                    flex: 1;position: relative;z-index: 20;
                    h1{
                        line-height: 0.23rem;
                        font-size: 0.16rem;padding:0.1rem 0 0.13rem;font-weight: 600;
                        color:#ffffff;
                    }
                    p{
                        line-height: 0.22rem;font-size: 0.12rem;color:#f6f6f6;
                    }
                    .fto_right_px{
                        font-size: 0.12rem;line-height: 0.36rem;color:#f6f6f6;
                        span{
                            color:#ffffff;font-size: 0.14rem;
                        }
                    }
                    .fto_right_py{
                        line-height: 0.17rem;font-size: 0.12rem;
                        padding: 0.12rem 0;
                    }
                    .fto_right_a{
                        position: absolute;top:0.4rem;right:0.1rem;
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
                .body12{
                    height: 100%;width:100%;position: absolute;top: 0rem;z-index: -40;
                    opacity: 0.5;-webkit-filter: blur(0.1rem);background-size: cover;
                    filter: blur(0.05rem);
                    background-attachment: fixed;overflow: hidden;
                }
            }
            
        }
        .body2{
            background: white;
            width: 100%;
            height:0.6rem;
            width: 100%;
            padding:0.11rem 0 0.11rem 0.15rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            .body21{
                display: flex;
                flex-direction: column;
                /*align-items: flex-start;*/
                /*justify-content: space-between;*/
                border-bottom: 1px solid #f6f6f6;
                p{
                    font-size: 0.125rem;
                    /*display: flex;*/
                    color: #979797;
                }
                span{
                font-size: 0.125rem;
                color: #0d0000;
                }
            }
            .body22{
                width: 0.685rem;
                height: 0.53rem;
                img{
                    display: block;
                }
            }
        }
        .body3 img{
            width: 100%;
            height: 0.52rem;
            display: flex;
            border-bottom: 1px solid #f6f6f6;
        }
        .body4 img{
        width: 100%;
        height: 0.435rem;
        display: flex;
        }
        .body5{
            height: 1.625rem;
            display: flex;
            overflow: hidden;
            overflow-y: scroll;
            .card{
                width: 3.21rem;
                height: 1.1rem;
                padding: 0.125rem;
                background: white;
                border:1px solid #d5d5d5;
                border-radius: 8px;
                box-shadow: 3px 3px 0px #d1d1d1;
                margin-top: 0.15rem;
                margin-left: 0.14rem;
                display: flex;
                flex-direction: column;
                .card1{
                    width: 1rem;
                    height: 0.35rem;
                    display: flex;
                    align-items: center;
                    span{
                        font-size: 0.11rem;
                        color: #909090;
                    }
                    img{
                        width: 0.335rem;
                        height: 0.335rem;
                        border-radius: 50%;
                    }
                }
                .card2{
                    font-size: 0.13rem;
                    color: #0e0000;
                    line-height: 0.4rem;
                }
                .card3{
                    font-size: 0.125rem;
                    color: #676767;
                }
            }
        }
        .body6{
            width: 3.75rem;
            height: 0.6rem;
            background: white;
            color: #080000;
            font-size: 0.125rem;
            padding-left: 0.13rem;
            line-height: 0.6rem;
            box-sizing: border-box;
            display: flex;
        }
        .body7{
            width: 3.35rem;padding: 0 0.2rem;
            overflow: hidden;
            background: white;
            display: flex;flex-direction: column;
            /* box-shadow:0 17px 10px -8px #f21273; */
            p{
                font-size: 0.11rem;
                color: #606060;
                line-height: 0.23rem;
            }
            .body71{
                width: 100%; height: 100%;
                img{
                    width: aoto;height: auto;
                    display:block;
                }
            }
        }
        .QDbutton{
            height: 0.55rem;
            display: flex;
            align-items: center;
            justify-content: center;
            span{
                font-size:0.12rem;
                color: #ff0029;
            }
        }
        .hbook{
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
    }
    .footer{
        width:100%;height: 0.63rem;
        background: white;padding: 0 0.13rem 0 0.13rem;
        border-top: 1px solid #f5f5f6;
        display: flex;
        align-items: center;
        box-sizing:border-box;
        // box-shadow: 0 20px 20px red ;
    }
}
</style>
