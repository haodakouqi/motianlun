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
            <div class="sec_choose" :class="{'sec_active':'0'==showx}" @click='Qchange("0",["西安","演唱会"])'>
                <div class="box"><span>全部</span></div>
            </div>
            <div class="sec_choose" :class="{'sec_active':'1'==showx}" @click='Qchange("1",["香港","演唱会"])'>
                <div class="box"><span>演唱会</span></div>
            </div>
            <div class="sec_choose" :class="{'sec_active':'2'==showx}" @click='Qchange("2",["上海","话剧歌剧"])'>
                <div class="box"><span>话剧歌剧</span></div>
            </div>
            <div class="sec_choose" :class="{'sec_active':'3'==showx}" @click='Qchange("3",["广州","音乐会"])'>
                <div class="box"><span>音乐会</span></div>
            </div>
            <div class="sec_choose" :class="{'sec_active':'4'==showx}" @click='Qchange("4",["香港","体育赛事"])'>
                <div class="box"><span>体育赛事</span></div>
            </div>
            <div class="sec_choose" :class="{'sec_active':'5'==showx}" @click='Qchange("5",["纽约","舞蹈芭蕾"])'>
                <div class="box"><span>舞蹈芭蕾</span></div>
            </div>
            <div class="sec_choose" :class="{'sec_active':'6'==showx}" @click='Qchange("6",["东京","儿童亲子"])'>
                <div class="box"><span>儿童亲子</span></div>
            </div>
            <div class="sec_choose" :class="{'sec_active':'7'==showx}" @click='Qchange("7",["深圳","展览休闲"])'>
                <div class="box"><span>展览休闲</span></div>
            </div>
            <div class="sec_choose" :class="{'sec_active':'8'==showx}" @click='Qchange("8",["西安","曲艺杂谈"])'>
                <div class="box"><span>曲艺杂谈</span></div>
            </div>
          </div>
      </section>
      <nav>
          <div class="nav_box">
              <span>推荐排序</span>
          </div>
          <div class="nav_box">
              <span>全部时间</span>
          </div>
          <div class="nav_ico"></div>
      </nav>
      <footer ref="viewBox" v-ascroll>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <achild></achild>
                </div>
                <div class="swiper-slide">
                    <bchild></bchild>
                </div>
                <div class="swiper-slide">
                    <cchild></cchild>
                </div>
                <div class="swiper-slide">
                    <dchild></dchild>
                </div>
                <div class="swiper-slide">
                    <echild></echild>
                </div>
                <div class="swiper-slide">
                    <fchild></fchild>
                </div>
                <div class="swiper-slide">
                    <gchild></gchild>
                </div>
                <div class="swiper-slide">
                    <hchild></hchild>
                </div>
                <div class="swiper-slide">
                    <ichild></ichild>
                </div>
          </div>
        </div>
        <div class="backTop" id="p" @click="backTop">
            <span>头</span>
        </div>
      </footer>
  </div>
</template>

<script>
import Swiper from "swiper";
import achild from './achild';
import bchild from './bchild';
import cchild from './cchild';
import dchild from './dchild';
import echild from './echild';
import fchild from './fchild';
import gchild from './gbook';
import hchild from './hbook';
import ichild from './ibook';
export default {
    name:"Qperformance",
    data () {
        return {
            showx:"0",
            Qcity:["西安","演唱会"],
            life:true
        };
    },
    directives:{
        ascroll:{
            inserted(el){
                var p =document.getElementById('p');
                el.addEventListener('scroll', function(){
                    if(this.scrollTop>1000){
                        p.style.display="block";
                    }else{
                        p.style.display="none";
                    }
                }, false)
            }
        }
    },
    methods:{
        backTop(){
            console.log(this.$refs.viewBox.scrollTop);
            this.$refs.viewBox.scrollTop = 0;
        },
        Qchange(Fa,city){
            this.mySwiper_data.slideTo(Fa, 1000, false);
            this.showx=Fa;
            this.Qcity =city; 
            this.$store.dispatch('tianjia',{city});
        },
       Qswiper(){
            var that =this;
            var a =this.Qcity;
            var mySwiper = new Swiper(".swiper-container", {
                direction: "horizontal",
                on: {
                    slideChangeTransitionStart: function(){
                        that.showx = this.activeIndex;
                        // that.$store.dispatch('tianjia',{a});
                    },
                },
            });
            this.mySwiper_data = mySwiper;
        }
    },
    created() {
        
    },
    mounted(){
        this.Qswiper();
        console.log(this.$store);
    },
    components: {
        achild,
        bchild,
        cchild,
        dchild,
        echild,
        fchild,
        gchild,
        hchild,
        ichild,
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
        display: flex;height: 0.37rem;position: relative;
        line-height: 0.37rem;
        border-top:1px solid #f8f8fa;
        border-bottom:2px solid #f8f8fa;box-shadow:3px 3px 3px #f8f8fa;
        .nav_box{
            width: 50%;text-align: center
        }
        .nav_ico{
            position: absolute;width: 1px;height: 0.18rem;background: #f2f2f2;
            top:0.09rem;left: 1.87rem;
        }
    }
    footer{
        flex: 1;overflow-y: scroll;
        .backTop{
            position: fixed;bottom:0.8rem;right: 0.4rem;background: blue;
            z-index: 88;display: none;width: 0.4rem;height: 0.4rem;line-height: 0.4rem;
            text-align: center;border-radius:100%;
            span{
                color:red;
            }
    }
    }
}
</style>