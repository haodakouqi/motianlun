<template>
  <div class="mycalendar">
    <div class="mycalendar_top">
      <span @click="gotoback">返回</span>
      <span>摩天轮</span>
    </div>
    <div class="mycalendar_section">
      <table cellpadding="0" cellspacing="0" id="1">
        <tr>
          <td>
            <div id="cal">
              <div id="top">
                <div class="select">
                  <select id="year-select"></select>&nbsp;年
                  <select id="month-select"></select>&nbsp;月
                </div>
                <div class="step">
                  <span id="prev"><</span>
                  <span id="next">></span>
                </div>
              </div>
              <ul id="wk">
                <li>一</li>
                <li>二</li>
                <li>三</li>
                <li>四</li>
                <li>五</li>
                <li><b>六</b></li>
                <li><b>日</b></li>
              </ul>
              <div id="cm"></div>
              <div id="bm">
                <div class="heavenly-branch">
                  <span id="heavenly"></span>年 &nbsp;
                  ［<span id="branch"></span>］
                </div>
                <a href="javascript:;;" id="now-date" style="visibility: visible">回到今天</a>
              </div>
            </div>
          </td>
        </tr>
      </table>
      <ul class="mycalendar_list">
        <li v-for="dates in dateData" @click="Qdetail(dates)">
          <date-list :datelist="dates"></date-list>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import DateList from './conts/date/date-list'
  import '../assets/js/calendar'
  import getTimeMsg from '../apis/gettimemsg'
    export default {
      name: "mtl-date",
      components:{
        DateList
      },
      data(){
          return {
            dateData:[],
            life:false
          }
      },
      watch:{
          '$route':'__init'
      },
      methods:{
          gotoback(){
            this.$router.go(-1);
          },
          Qdetail(item){
            this.$store.dispatch('Detail_a',{item});
            this.$router.push({name:'qdetail'});
          },
          __init(){
            let that = this;
            calendar.init({
              cellClickCallback: function(cell, datedata){
                console.log(cell);
                console.log('你点击的是'+ datedata.solarYear + '年' + datedata.solarMonth + '月' + datedata.solarDate + '日');
                let future = new Date(datedata.solarYear+"/"+datedata.solarMonth+"/"+datedata.solarDate).getTime();
                let now = new Date().getTime();
                that.getTimeData(future, now, data=>{
                  that.dateData = JSON.parse(data).body.result.data
                  console.log(that.dateData);
                });
              }
            });
          },
        getTimeData(now,time,cb){
          getTimeMsg(now, time,cb);
        },
        updatepage(){
          this.life =true;
            if (this.life){
              this.$router.go(0);
            }
        }
      },
      mounted(){
        this.__init();
      }
    }
</script>

<style scoped lang="scss">
  .mycalendar {
    height: 100%;width:100%;
    display: flex;
    flex-direction: column;
    .mycalendar_top {
      z-index: 2;
      width: 100%;
      display: -webkit-flex;
      -webkit-align-items: center;
      height: 0.44rem;
      background: #ffff;
      span {
        font-size: 0.13rem;
        color: #858585;
        margin-left: 0.1rem;
        margin-right: 0.1rem;
      }
      span:nth-of-type(2) {
        margin-left: 1.2rem;
      }
      input {
        display: block;
        padding-left: 0.32rem;
        width: 2.90rem;
        line-height: 0.32rem;
        border: none;
        border: 1px solid #dddddd;
        outline: none;
      }
      .iconfont {
        font-size: 0.16rem;
        color: #afafaf;
        position: absolute;
        left: 0.52rem;
        top: 0.13rem;
      }
    }
    .mycalendar_section{
      flex: 1;overflow-y: scroll;
      table{
        margin-top:0rem;
      }
      .mycalendar_list{
        width:100%;
        li{
          height: 1.38rem;
        }
      }
    }
  }
</style>
