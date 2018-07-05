<template>
  <div class="home_address">
    <div class="address_top">
      <span @click="gotoback">返回</span>
      <span>摩天轮</span>
    </div>
    <div class="mainAddress">
      <div class="addresshistory" v-if="historylife">
        <h3>搜索历史</h3>
        <div class="historymain">
          <span v-for="historycity in historydata" :iid="historycity.iid" @click="saves(historycity.iid)">{{historycity.name}}</span>
        </div>
      </div>
      <div class="addresshot">
        <div class="hottop">
          <h3>热门城市</h3>
          <div class="hotmain">
            <span v-for="city in hotcity" :iid="city.iid" @click="saves(city.iid)" ref="hotcity">{{city.name}}</span>
          </div>
        </div>
        <div class="hotmiddle">
          <span v-for="az in azdata" @click="clickaz(az)" ref="azobj" :class="{active:azactive == az}">{{az}}</span>
        </div>
        <div class="hotbottom" v-if="mclife">
          <span v-for="obj in morecity" :class="{active:smalliid == obj.cityId}" @click="smallsave(obj.cityId)" ref="smallcitys" :iid="obj.cityId">{{obj.cityName}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import getMock3 from '../apis/getMock3'
  import getAddress from '../apis/getAddress'
  export default {
    name: "Address",
    data(){
      return {
        azdata:[],
        hotcity:[],
        mclife:false,
        historylife:false,
        historydata:[],
        morecity:[],
          azactive:'',
        smalliid:0
      }
    },
    methods:{
      gotoback(){
        this.$router.go(-1);
      },
      getmoreAddress(num,word){
        getAddress(num, word,(data)=>{
          this.morecity = JSON.parse(data).body;
          console.log(this.morecity);
          this.mclife = true;
        })
      },
      getAddress(){
        getMock3((data)=>{
          this.azdata = data.az;
          this.hotcity = data.hotcity;
          this.$nextTick(function () {
            this.initdata();
          })
        })
      },
      saves(iid){
        // localStorage.removeItem('savecitys');
        if (localStorage.getItem('savecitys')){
          let arr = JSON.parse(localStorage.getItem('savecitys'));
          //如果重复删除后添加到最后
          arr.forEach((v,k)=>{
            if (v == iid){
              arr.splice(k, 1);
            }
          });
          arr.push(iid);
          arr= JSON.stringify(arr);
          localStorage.setItem('savecitys',arr);

          let allcity = this.$refs.hotcity;
          let names = '';
          //获取最后添加的改变样式
          allcity.forEach(value =>{
            if (value.getAttribute('iid') == iid){
              names=  value.innerHTML;
            }
          });
          this.$router.push({name:"MtlHome",params:{str:names}});
        }else{
          localStorage.setItem('savecitys',"[]");
        }
      },
      initdata(){
        if (localStorage.getItem('savecitys') || localStorage.getItem('azdata') || localStorage.getItem('smallcity')){
          let arr = JSON.parse(localStorage.getItem('savecitys'));
          let small = JSON.parse(localStorage.getItem('smallcity'));
          let azadata = localStorage.getItem('azdata');
          this.azactive = azadata;
          this.historylife = true;
          let lastcity = arr[arr.length-1];
          // let smalllast = small[small.length-1];
          // this.smalliid = smalllast;
          // console.log(this.smalliid,smalllast);
          this.getmoreAddress(lastcity,azadata);
          let allcity = this.$refs.hotcity;
          //获取最后添加的改变样式
          allcity.forEach(value =>{
            if (value.getAttribute('iid') == lastcity){
              value.style.color = '#4499ff';
            };
          });
          //获取历史信息
          arr.forEach(v=>{
            allcity.forEach(value =>{
              if (value.getAttribute('iid') == v){
                let arrs = {iid:value.getAttribute('iid'),name:value.innerHTML};
                this.historydata.push(arrs);
              }
            });
          });

        }else{
          localStorage.setItem('savecitys',"[]");
          localStorage.setItem('azdata', "0");
        }
      },
      clickaz(az) {
        if (localStorage.getItem('savecitys')) {
          if (localStorage.getItem('azdata')) {
            localStorage.setItem('azdata', az);
            let arr = JSON.parse(localStorage.getItem('savecitys'));
            let lastcity = arr[arr.length-1];
           this.getmoreAddress(lastcity,az);
            this.azactive = az;
            console.log(this.azactive);
          } else {
            localStorage.setItem('azdata', "0");
          }
        } else {
          localStorage.setItem('savecitys', "[]");
        }
      },
      smallsave(iid){
        if (localStorage.getItem('smallcity')){
          let arr = JSON.parse(localStorage.getItem('smallcity'));
          //如果重复删除后添加到最后
          arr.forEach((v,k)=>{
            if (v == iid){
              arr.splice(k, 1);
            }
          });
          arr.push(iid);
          arr= JSON.stringify(arr);
          localStorage.setItem('smallcity',arr);

          let allcity = this.$refs.smallcitys;
          let names = '';
          //获取最后添加的改变样式
          allcity.forEach(value =>{
            if (value.getAttribute('iid') == iid){
              names=  value.innerHTML;
            };
          });
          this.$router.push({name:"MtlHome",params:{str:names}});
        }else{
          localStorage.setItem('smallcity',"[]");
        }
      }
    },
    mounted(){
      this.getAddress();
    }
  }
</script>

<style scoped lang="scss">
  .home_address{
    height: 100%;width:100%;
    display: flex;flex-direction: column;
    .address_top{
      width:100%;
      display:-webkit-flex;
      -webkit-align-items: center;
      height:0.44rem;
      background:#ffff;
      span{
        font-size:0.13rem;
        color: #858585;
        margin-left:0.1rem;
        margin-right:0.1rem;
        display: block;
      }
      span:nth-of-type(2){
        margin-left:1.2rem;
      }
      input{
        display:block;
        padding-left:0.32rem;
        width:2.90rem;
        line-height: 0.32rem;
        border:none;
        border:1px solid #dddddd;
        outline: none;
      }
      .iconfont{
        font-size:0.16rem;
        color:#afafaf;
        position:absolute;
        left:0.52rem;
        top:0.13rem;
      }
    }

    .mainAddress{
      padding-top:0.44rem;flex:1;overflow-y: scroll;
      background:#f2f2f2;
      .addresshistory{
        padding-left:0.22rem;
        h3{
          font-size:0.12rem;
          color:#999999;
          line-height:0.35rem;
        }
        .historymain{
          display: -webkit-flex;
          -webkit-flex-wrap: wrap;
          span{
            width:0.98rem;
            line-height: 0.4rem;
            text-align: center;
            background: white;
            font-size:0.12rem;
            color:#555555;
            border-radius:0.05rem;
            margin-top:0.12rem;
            margin-right:0.16rem;
          }
        }
      }
      .addresshot{
        .hottop{
          padding-left:0.22rem;
          padding-bottom: 0.1rem;
          h3{
            font-size:0.12rem;
            color:#999999;
            line-height:0.35rem;
          }
          .hotmain{
            display: -webkit-flex;
            -webkit-flex-wrap: wrap;
            span{
              width:0.98rem;
              line-height: 0.4rem;
              text-align: center;
              background: white;
              font-size:0.12rem;
              color:#555555;
              border-radius:0.05rem;
              margin-top:0.12rem;
              margin-right:0.16rem;
            }
          }
        }
        .hotmiddle{
          margin:0.08rem 0.12rem 0;
          border-top:1px solid #dddddd;
          background: white;
          padding-top:0.17rem;
          display: -webkit-flex;
          -webkit-flex-wrap: wrap;
          padding-left:0.17rem;
          span{
            width:0.56rem;
            line-height: 0.33rem;
            text-align: center;
            background: white;
            font-size:0.12rem;
            color:#555555;
            border-radius:0.05rem;
            margin-bottom:0.08rem;
            margin-right:0.08rem;
            border:1px solid #dddddd;
          }
          .active{
            color:#4499ff;
          }
        }
        .hotbottom{
          margin-top:0.1rem;
          display: -webkit-flex;
          -webkit-flex-wrap: wrap;
          padding-left:0.22rem;
          padding-bottom:0.1rem;
          span{
            width:0.98rem;
            line-height: 0.4rem;
            text-align: center;
            background: white;
            font-size:0.12rem;
            color:#555555;
            border-radius:0.05rem;
            margin-top:0.12rem;
            margin-right:0.16rem;
          }
          .active{
            color:#4499ff;
          }
        }
      }
    }
  }
</style>
