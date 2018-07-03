<template>
  <div class="Slayout">
    <header>
        <div class="header_box">
            <i class="iconfont icon-sousuo"></i>
            <form action="javascript:;" name="search-form">
                <input type="search" placeholder="搜索明星、演出、场馆"  v-model="datas" class="txt"   @keydown="searchDir($event)" @input="listShow">
            </form>
        </div>
        <span @click="goTo('-1')">取消</span>
    </header>
    <!-- search-list -->
    <div class="main">
        <ul id="list" ref="list">
            <li v-for="(p,index) in achild" :key="index">
                <h3>{{p.showName}}</h3>
                <p>
                    <span id="addressLeft">{{p.venueName}}</span>
                    <span id="timeRight">{{p.lastShowTime}}</span>
                </p>
            </li>
        </ul>

        <ul id="search_dir" ref="search_dir">
            <li  v-for="(p,index) in achild" :key="index">
                <div class="dir_l">
                    <img :src="p.posterURL">
                </div>
                <div class="dir_r">
                    <h3>{{p.showName}}</h3>
                    <p class="time">
                        <span id="timeRight">{{p.showDate}}</span><br/>
                        <span id="addressLeft">{{p.venueName}}</span>
                    </p>
                    <p class="checked">
                        <span class="yushou" ref="yushou">{{p.showStatus.displayName}}</span>
                    </p>
                    <p class="price">
                        <strong>{{p.minPrice}}</strong>元起
                    </p>
                    <p class="special">
                        “{{p.advertise}}”
                    </p>
                    <p class="zhekou" ref="zhekou">
                        <span class="number">{{p.discount | cheaper(that,index)}}</span><br/>
                        折起
                    </p>
                </div>
            </li>
        </ul>
        <!-- hot-search -->
        <section  ref="section">
            <h3>热门搜索</h3>
            <div class="famous_star">
                <a href="javascript:;">张学友</a>
                <a href="javascript:;">五月天</a>
                <a href="javascript:;">林俊杰</a>
                <a href="javascript:;">周杰伦</a>
                <a href="javascript:;">德云社</a>
                <a href="javascript:;">偶像练习生</a>
                <a href="javascript:;">乐华七子</a>
                <a href="javascript:;">王力宏</a>
                <a href="javascript:;">张韶涵</a>
                <a href="javascript:;">莫文蔚</a>
            </div>
        </section>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
    name :'Search',
    data() {
        return {
            that:this,
            aasd:null,
            Ntime:new date(),
            life:false,
            datas:"",
            achild:{},
            Qoffset:"1",
            Qkey:"全国",
            Qlength:"10",
            Qctl:"1101",
            Qtime:"1530516039442"
        }
    },
    directives:{
        keypress:{
            inserted(el,binding){
               el.addEventListener('keydown',function(e){
                   var keycode = e.keycode;
                   let serachName = el.value;
                   if(keycode == "13"){
                       e.preventDefault();
                       console.log(el,binding)
                   }
               })
            }
        }
    },
    methods:{
        goTo(a){
            this.$router.go(a);
        },
        initfetch(foffset,ft,fc,ftime,flength){
            fetch('http://localhost:8410/qpa/qsearch?offset='+foffset+'&keyword='+ft+'&city='+fc+'&time='+ftime+'&length='+flength)
            .then(res=>res.json())
            .then(data=>{
                this.life=true;
                this.achild=JSON.parse(data).body.result.data;
                // console.log(JSON.parse(data));
                console.log(this.datas);
                
            })
        },
        listShow(){
            console.log(this.datas);
            this.$refs.list.style.display = 'block';
            this.$refs.section.style.display = 'none';
            this.$refs.search_dir.style.display = 'none';
            this.initfetch(this.Qoffset,this.datas,this.Qctl,this.Qtime,this.Qlength);
        },
        searchDir(ev){
            // console.log(ev);
            if(ev.keyCode == "13" ){
                this.$refs.list.style.display = 'none';
                this.$refs.section.style.display = 'none';
                this.$refs.search_dir.style.display = 'block';
                this.initfetch(this.Qoffset,this.datas,this.Qctl,this.Qtime,this.Qlength);
            }
        }
    },
    watch:{
        datas:function(data,oldData){
                if(data == ''){
                    this.$refs.list.style.display = 'none';
                    this.$refs.section.style.display = 'block';
                    // console.log(data);
                }
        }
    },
    filters:{
        cheaper : function(value,that,indexs){
            let values = value * 100;
            if(value ==1 || value == 0){
                    that.$nextTick(function(){
                        that.$refs.zhekou[indexs].style.display = 'none';
                    });
            }else{
                var salerye = (Math.floor(values))/10;
                return salerye;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.Slayout{
    display: flex;flex-direction: column;height: 100%;width: 100%;
    header{
        height:0.5rem;width:100%;background: #ffffff;
        display: flex;border-bottom: 1px solid #fafafa;
        .header_box {
            height:0.32rem;
            width:3.06rem;
            border:none;
            border-radius: 3px;
            background:#f2f2f2;
            font-size: 0.14rem;
            color:#acacac;
            margin:0.09rem 0.12rem;
            position: relative;
            i{
                position: absolute;top:0.05rem;left:0.08rem;display: block;font-size: 0.18rem;
            }
            form{
                display:block;padding-left:0.3rem;
                input{
                    border:none;width: 100%;
                    background:#f2f2f2;
                    line-height: 0.32rem;
                    outline: none;
                }
            }
        }
        span{
            font-size: 0.16rem;
            color:#000;
            line-height: 0.5rem;
            font-weight: 900;
        }
    }
    .main{
        flex: 1;overflow-y: scroll;
        // search-list
        #list{
            margin:0 0.12rem;
            display: none;
            li{
            background: #fff;
            border-bottom: 1px solid #eaeaeb;
                h3{
                    text-indent: 0.1rem;
                    padding-right: 0.1rem;
                    padding-top: 0.1rem;
                    line-height:0.21rem ;
                    font-size: 0.14rem;
                    color: #090909;
                }
                p{
                line-height: 0.26rem;
                padding-bottom: 0.05rem;
                color:#94939c;
                font-size: 0.12rem;
                display: flex;
                justify-content: space-between;
                }
            }
        }
        // search_dir
        #search_dir{
            margin:0 0.12rem;
            display: none;
            li{
            background: #fff;
            border-bottom: 1px solid #eaeaeb;
            display: flex;
                .dir_l{
                    img{
                    margin-top: 0.15rem;
                    margin-right: 0.14rem;
                    width: 0.76rem;
                    height:1.08rem;
                    }
                }
                .dir_r{
                    color:#94939c;
                    font-size: 0.12rem;
                    position: relative;
                    h3{
                    text-indent: 0.1rem;
                    padding-right: 0.1rem;
                    padding-top: 0.1rem;
                    line-height:0.21rem ;
                    font-size: 0.14rem;
                    color: #090909;
                    }
                .time{
                    line-height: 0.18rem;
                    padding-bottom: 0.03rem;
                    }
                    .checked{
                    padding:0.07rem 0;
                    span{
                        background: #ffedf0;
                        display: inline-block;
                        width: 0.38rem;
                        height:0.16rem;
                        text-align: center;
                        line-height: 0.16rem;
                    }
                        .yushou{
                        color:#ff6206;
                        }
                        .check{
                        color:#ff2443;
                        }
                    }
                    .price{
                    line-height: 0.3rem;
                    strong{
                        color:#ff1036;
                        font-size: 0.16rem;
                    }
                    }
                    .special{
                    border-top: 2px solid #fafafb;
                    line-height: 0.16rem;
                    padding-top: 0.05rem;
                    padding-bottom: 0.05rem;
                    padding:0.05rem;
                    //   background: url(../../static/special.png) no-repeat left center;
                    }
                    .zhekou{
                    width: 0.4rem;
                    height:0.4rem;
                    background: #f31371;
                    border-radius: 50%;
                    color:#fff;
                    font-size: 12px;
                    -webkit-transform: scale(0.8);
                    text-align: center;
                    line-height: 0.14rem;
                    position: absolute;
                    right:0;
                    top:0.68rem;
                    span{
                        font-size: 0.18rem;
                        line-height: 0.22rem;
                        }
                    }
                }

            }
        }

        // hot-search
        section{
            padding-left:0.16rem;
            padding-right:0.12rem;
            color:#838383;
            font-size: 0.12rem;
            h3{
                font-weight: 100;
                line-height: 0.42rem;
            }
            .famous_star {
                display: flex;
                flex-wrap: wrap;
                a{
                    padding:0.1rem 0.09rem;
                    border:1px solid #eaeaeb;
                    border-radius: 3px;
                    color:#838383;
                    margin-bottom: 0.08rem;
                    margin-right: 0.08rem;
                }
            }
        }
    }
    
}

</style>
