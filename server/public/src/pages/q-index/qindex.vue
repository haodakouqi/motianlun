<!-- qioajie -->
<template>
  <div class="Qindex">
      <section>
         <router-view/>
      </section>
      <footer>
            <ul>
                <li :class="{'fied':0 == number}" @click="goTo('MtlHome',0)">
                    <i class="iconfont icon-zhuye"></i>
                    <p>精选</p>
                </li>
                <li :class="{'fied':1 == number}" @click="goTo('qperformance',1)">
                    <i class="iconfont icon-geju"></i>
                    <p>演出</p>
                </li>
                <li :class="{'fied':2 == number}" @click="goTo('LfindYant',2)">
                    <i class="iconfont icon-faxian"></i>
                    <p>发现</p>
                </li>
                <li :class="{'fied':3 == number}" @click="goTo('LticKet',3)">
                    <i class="iconfont icon-next"></i>
                    <p>转票</p>
                </li>
                <li :class="{'fied':4 == number}" @click="goTo('Ymy',4)">
                    <i class="iconfont icon-wode"></i>
                    <p>我的</p>
                </li>
            </ul>
      </footer>
  </div>
</template>

<script>
export default {
    name:"qindex",
    data () {
        return {
           number:0
        };
    },
    methods:{
        goTo(a,b){
            this.$router.push({name:a});
            this.number = b;
        }
    },
    mounted(){
    
    },

}

</script>
<style lang='scss' scoped>
.Qindex{
    height: 100%;width: 100%;
    display: flex;flex-direction: column;
    font-size: 0.25rem;
    section{
        height: 100%;width: 100%;
    }
    footer {
        position: fixed;
        bottom: 0rem;
        height: 0.54rem;
        width: 100%;
        z-index: 9999;
        background: #ffffff; 
            ul {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: space-around;
                align-content: center; 
            li {
                text-align: center; 
                .iconfont {
                display: block;
                font-size: .23rem;
                margin-top: .08rem;
                color: #878787; 
                }
                p {
                font-size: .12rem;
                line-height: 0.23rem;
                color: #878787; 
                }
            }
            .fied {
                .iconfont {
                color: #f9185a;
                }
                p {
                color: #f9185a; 
                }
            }
        }
    }
}
</style>