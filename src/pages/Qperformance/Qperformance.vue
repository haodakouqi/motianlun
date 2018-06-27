<!-- qioajie -->
<template>
  <div class="Qperformance">
      <header>
            <div class="header_left">西安 </div>
            <div class="header_right">
              <input v-model="input" placeholder="请输入内容"/>
            </div>
      </header>
      <section>
          <div class="section_index">
            <div class="sec_choose">
                <div class="box"><span>全部</span></div>
            </div>
            <div class="sec_choose">
                <div class="box"><span>演唱会</span></div>
            </div>
            <div class="sec_choose">
                <div class="box"><span>话剧歌剧</span></div>
            </div>
            <div class="sec_choose">
                <div class="box"><span>音乐会</span></div>
            </div>
            <div class="sec_choose">
                <div class="box"><span>体育赛事</span></div>
            </div>
            <div class="sec_choose">
                <div class="box"><span>舞蹈芭蕾</span></div>
            </div>
            <div class="sec_choose">
                <div class="box"><span>儿童亲子</span></div>
            </div>
            <div class="sec_choose">
                <div class="box"><span>儿童亲子</span></div>
            </div>
            <div class="sec_choose">
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

      <footer>
        <mt-tab-container v-model="active">
          <mt-tab-container-item id="tab1">
            <div class="footer_one">
              <div class="fto_left"><img src="./Q0.jpg" alt=""></div>
              <div class="fto_right">
                <h1>【西安站】 《2018年旅游年票一卡通》</h1>
                <p>2018.01.01-2018.12.31</p>
                <p>陕西各大景区</p>
                <div class="fto_right_a">9.3折起</div>
              </div>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="tab2">
            <h1>diyiic</h1>
          </mt-tab-container-item>
          <mt-tab-container-item id="tab3">
            <h1>diyiic</h1>
          </mt-tab-container-item>
        </mt-tab-container>
      </footer>
  </div>
</template>

<script>
export default {
    name:"Qperformance",
    data () {
        return {
            input:"",
            active:"tab1"
        };
    },
    methods:{
        __initfetch(){
            fetch('http://localhost:8410/qperformance')
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
            })
        }
    },
    mounted(){
        this.__initfetch();
    },

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
                margin:0 0.26rem;
                span{
                    display: inline-block;font-size: 0.14rem;white-space: nowrap;
                }
            }
        }
    }
    nav{
        display: flex;background: #c6c6c6;
    }
    footer{
      flex: 1;
      .footer_one{
        display: flex;position: relative;
        h1{
          color:red;
        }
        .fto_right_a{
          position: absolute;top:0.2rem;right:0.1rem;
          border-radius: 50%;background: red;
          width: 0.42rem;height: 0.42rem;line-height: 0.42rem;
        }
      }
    }
}
</style>