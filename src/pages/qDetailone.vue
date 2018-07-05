<template>
    <div class="qDetailone">   
        <div class="topst">
            <img src="../assets/img/leftbutton.jpg" alt="" @click="goTo('-1')">
            <p>{{ibook.venueAddr}}</p>
        </div>   
        <div class="section">
            <div id="allmap"></div>
            <div class="address">
                <img src="../assets/img/zuobiao.jpg" alt="">
                <div class="addresscont">
                    <span>{{ibook.venueName}}</span>
                    <p>{{ibook.venueAddr}}</p>
                </div>
                <img class="imgtwo" src="../assets/img/addressright.jpg" alt=""> 
            </div>
            <div class="footer_one">
                <div class="fto_left"><img :src="ibook.posterURL" alt=""></div>
                <div class="fto_right">
                    <h1>{{ibook.showName}}</h1>
                    <p>{{ibook.latestShowTime}}</p>
                    <p>{{ibook.venueAddr}}</p>
                    <p>{{ibook.venue}}</p>
                    <p class="fto_right_px"><span>{{ibook.minPrice}}</span>元起</p>
                    <p class="fto_right_py">{{ibook.advertise}}</p>
                    <div class="fto_right_a"><div>{{ibook.discount*10}}</div>折起</div>
                </div>
            </div>

            <div class="addressfooter">
                <img src="../assets/img/addressfooter.jpg" alt="">            
            </div>
        </div>
	</div>
</template>
<script>
export default {
    name: 'qDetailone',
    data () {
        return {
            username:"",
            password:"",
            isShow:false,
        }
    },
    computed:{
        ibook(){
            console.log('111');
            return this.$store.getters.getdetail;
        }
    },
    mounted(){
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(116.331398,39.897445);
        map.centerAndZoom(point,12);
        // 创建地址解析器实例
        var myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint(this.ibook.venueAddr, function(point){
            if (point) {
                map.centerAndZoom(point, 15);
                map.addOverlay(new BMap.Marker(point));
            }else{
                alert("您选择地址没有解析到结果!");
            }
        }, "北京市");
    },
    methods: {
        goTo(a){
            this.$router.go(a);
        }   
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" >
.qDetailone{
    height: 100%;width:100%;
    display: flex;flex-direction:column;
    .topst{
        width: 3.75rem;
        height: 0.5rem;
        background: white;
        display: flex;
        justify-content:left;
        align-items: center;
        z-index: 5;
        img{
            width: 0.75rem;
            height: 0.5rem;
        }
        p{
            font-size:0.16rem;
            color:#262626;
            width: 2.5rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

        }
    }
    .section{
        flex: 1;overflow-y: scroll;
        #allmap{
            width: 100%;
            height: 4rem;
        }
        .address{
            display: flex;
            align-content: center;
            justify-content: space-between;
            border-bottom: #eaeaeb 1px solid;
            img{
                width: 0.3rem;
                height: 0.59rem;
            }
            span{
                color: #535353;
                font-size: 0.12rem;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            p{
                font-size: 0.1rem;
                color: #989898;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .addresscont{
                display: flex;
                flex-direction: column;
                width: 2.8rem;
                // align-items: center;
                justify-content: center;
            }
        }
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
                    color:rgba(255,255,255,1);
                    font-size: 0.12rem;
                    div{
                        color:#ffffff;font-size: 0.18rem;
                        line-height: 0.26rem;font-weight: 600;
                    }
                }
            }
        }
        .addressfooter{
            border-top:1px solid #e6e6e7; 
            display: flex;
            img{
                width: 3.75rem;
                height: 0.85rem;
            }
        }
    }
}
</style>
