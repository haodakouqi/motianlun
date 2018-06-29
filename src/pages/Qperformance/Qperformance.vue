<!-- qioajie -->
<template>
  <div class="Qperformance">
      <header>
            <div class="header_left">西安 </div>
            <div class="header_right">
              <input placeholder="请输入内容"/>
            </div>
      </header>
      <section>
          <div class="section_index">
            <div class="sec_choose" :class="{'sec_active':'0'==showx}" @click='Qchange("0","西安")'>
                <div class="box"><span>全部</span></div>
            </div>
            <div class="sec_choose" :class="{'sec_active':'1'==showx}" @click='Qchange("1","北京","演唱会")'>
                <div class="box"><span>演唱会</span></div>
            </div>
            <div class="sec_choose" :class="{'sec_active':'2'==showx}" @click='Qchange("2","上海","话剧歌剧")'>
                <div class="box"><span>话剧歌剧</span></div>
            </div>
            <div class="sec_choose" :class="{'sec_active':'3'==showx}" @click='Qchange("3","广州","音乐会")'>
                <div class="box"><span>音乐会</span></div>
            </div>
            <div class="sec_choose" :class="{'sec_active':'4'==showx}" @click='Qchange("4","香港","体育赛事")'>
                <div class="box"><span>体育赛事</span></div>
            </div>
            <div class="sec_choose" :class="{'sec_active':'5'==showx}" @click='Qchange("5","纽约","舞蹈芭蕾")'>
                <div class="box"><span>舞蹈芭蕾</span></div>
            </div>
            <div class="sec_choose" :class="{'sec_active':'6'==showx}" @click='Qchange("6","东京","儿童亲子")'>
                <div class="box"><span>儿童亲子</span></div>
            </div>
            <div class="sec_choose" :class="{'sec_active':'7'==showx}" @click='Qchange("7","深圳","展览休闲")'>
                <div class="box"><span>展览休闲</span></div>
            </div>
            <div class="sec_choose" :class="{'sec_active':'8'==showx}" @click='Qchange("8","西安","曲艺杂谈")'>
                <div class="box"><span>曲艺杂谈</span></div>
            </div>
          </div>
      </section>
      <nav>
          <div class="nav_left">
            <select>
                <option value="bucuo">kankan</option>
            </select>
          </div>
          <div class="nav_right">
            
          </div>
      </nav>
      <footer v-if="life">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <h1>第1个</h1>
                    <div class="footer_one" v-for="(item,index) in Qdata.body.suggest" :key="index">
                        <div class="fto_left"><img :src="'http://pimg.damai.cn/perform/project/'+item.fold+'/'+item.projectId+'_n.jpg'" alt=""></div>
                        <div class="fto_right">
                            <h1>{{item.projectName}}</h1>
                            <p>{{item.startTime}}-{{item.showTime}}</p>
                            <p>{{item.venue}}</p>
                            <p class="fto_right_px"><span>{{item.price}}</span>元起</p>
                            <p class="fto_right_py">"平凡之路，且听且吟。再次相遇，此间少年。     "</p>
                            <div class="fto_right_a"><div>9.3</div>折起</div>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <h1>第2个</h1>
                </div>
                <div class="swiper-slide">
                    <h1>第3个</h1>
                </div>
                <div class="swiper-slide">
                    <h1>第4个</h1>
                </div>
                <div class="swiper-slide">
                    <h1>第5个</h1>
                </div>
                <div class="swiper-slide">
                    <h1>第6个</h1>
                </div>
                <div class="swiper-slide">
                    <h1>第7个</h1>

                </div>
                <div class="swiper-slide">
                    <h1>第8个</h1>

                </div>
                <div class="swiper-slide">
                    <h1>第9个</h1>

                </div>
          </div>
        </div>
      </footer>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
    name:"Qperformance",
    data () {
        return {
            mySwiper_data:'',
            showx:"1",
            Qdata:{},
            Qcity:"西安",
            Qctl:"演唱会",
            life:false
        };
    },
    methods:{
        Qchange(Fa,city,ctl){
            this.showx=Fa;
            this.Qcity=city;
            this.Qctl=ctl;
            this.mySwiper_data.slideTo(Fa, 1000, false);
            // this.__initfetch();
        },
       Qswiper(){
            var mySwiper = new Swiper(".swiper-container", {
                direction: "horizontal",
                on: {
                    slideChangeTransitionStart: function(){
                        alert(this.activeIndex);
                    },
                },
            });
            this.mySwiper_data = mySwiper;
        },
        __initfetch(){
            this.life=false;
            fetch('http://localhost:8410/qpa/data?city='+this.Qcity+'&'+this.Qctl)
            .then(res=>res.json())
            .then(data=>{
                // console.log(JSON.parse(data));
                this.life=true;
                this.Qdata = JSON.parse(data);
                console.log(this.Qdata);
                this.$nextTick(function(){
                    this.Qswiper();
                })
            })
        }
    },
    mounted(){
        this.__initfetch();
    }
}

</script>
<style lang='scss' scoped>
.Qperformance{
    height: 100%;width: 100%;
    display: flex;flex-direction: column;
    font-size: 0.1rem;
    header{
        display: flex;width: 100%;
        height: 0.31rem;padding:0.1rem 0;
        .header_left{
            width: 0.40rem;line-height: 0.31rem;
            font-size: 0.14rem;padding-left: 0.13rem;
        }
        .header_right{
            width: 2.98rem;margin:0 0.12rem;
            background:#f2f2f2;
            border-radius: 0.025rem;
            input{
                display: block;height: 100%;background:#f2f2f2;
                margin-left: 0.31rem;width: 40%;
            }
        }
    }
    section{
        width: 100%;height: 0.42rem;
        .secbook{
            width: 0;
        }
        .section_index{
            display: flex;overflow-x:scroll;height: 0.42rem;
            .sec_choose{
                margin:0 0.08rem;padding:0 0.07rem;line-height: 0.42rem;
                span{
                    display: inline-block;font-size: 0.12rem;white-space: nowrap;
                }
            }
            .sec_active{
                color:#ff4966;border-bottom:3px solid #ff4966;
            }
        }
    }
    nav{
        display: flex;background: #c6c6c6;
    }
    footer{
      flex: 1;overflow-y: scroll;
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
            }  
    }
}
</style>