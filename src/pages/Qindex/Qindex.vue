<!-- qioajie -->
<template>
  <div class="Qindex">
      <section>
         <router-view/>
      </section>
      <footer>
            <ul>
                <li :class="{'fied':0 == number}" @click="goTo('Cindex',0)">
                    <i class="iconfont icon-zhuye"></i>
                    <p>精选</p>
                </li>
                <li :class="{'fied':1 == number}" @click="goTo('Classify',1)">
                    <i class="iconfont icon-geju"></i>
                    <p>演出</p>
                </li>
                <li :class="{'fied':2 == number}" @click="goTo('Yshop',2)">
                    <i class="iconfont icon-faxian"></i>
                    <p>发现</p>
                </li>
                <li :class="{'fied':3 == number}" @click="goTo('Tmy',3)">
                    <i class="iconfont icon-next"></i>
                    <p>转票</p>
                </li>
                <li :class="{'fied':4 == number}" @click="goTo('Tmy',4)">
                    <i class="iconfont icon-wode"></i>
                    <p>我的</p>
                </li>
            </ul>
      </footer>
  </div>
</template>

<script>
export default {
    name:"Qindex",
    data () {
        return {
           number:1
        };
    },
    methods:{
        goTo(a,b){
            // this.$router.push({name:a});
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
        flex: 1;overflow-y:scroll;
    }
    footer {
        bottom: 0;
        height: 0.54rem;
        width: 100%;
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
                // background:#f9185a;
                }
                p {
                color: #f9185a; 
                }
            }
        }
    }
}
</style>