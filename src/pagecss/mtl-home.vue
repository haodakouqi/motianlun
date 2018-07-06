<template>
  <div class="mtl_home">
    <div class="home_top">
          <top :datas="addressdata" :honetop="number"></top>
    </div>
    <div class="home_bottom"  v-ascroll="{color:this}">
      <home-lbt-top></home-lbt-top>
      <home-nav :mockdatas="datamock"></home-nav>
      <home-unit :unitData="dataunit" :title="titlemsg1" :disccc="9.1"></home-unit>
      <home-lbt-middle :unitData2="dataunit"></home-lbt-middle>
      <home-unit :unitData="dataunit1" :title="titlemsg2" :disccc="9.8"></home-unit>
      <home-comments :commentData="datacomment1"></home-comments>
      <home-unit :unitData="dataunit2" :title="titlemsg3" :disccc="9.5"></home-unit>
      <home-comments :commentData="datacomment2"></home-comments>
      <home-unit :unitData="dataunit3" :title="titlemsg4" :disccc="9.3"></home-unit>
      <home-more :moreData="datamock"></home-more>
      <home-recommend :recommendData="datarecommend"></home-recommend>
      <home-introduce :dataIntroduce="introducedata"></home-introduce>
    </div>
  </div>
</template>

<script>
  import top from './conts/public/top'
  import homeLbtTop from './conts/home/home-lbt-top'
  import homeLbtMiddle from './conts/home/home-lbt-middle'
  import homeNav from './conts/home/home-nav'
  import homeUnit from './conts/home/home-unit'
  import homeComments from './conts/home/home-comments'
  import homeRecommend from './conts/home/home-recommend'
  import homeMore from './conts/home/home-more'
  import homeIntroduce from './conts/home/home-introduce'
  import getMock from '../apis/getMock'
  import getData from '../apis/getData'
  import getMock1 from '../apis/getMock1'
  import getMock2 from '../apis/getMock2'
  export default {
    name: "home",
    data(){
        return{
          datamock: [],
          dataunit:{},
          dataunit1:{},
          dataunit2:{},
          dataunit3:{},
          datacomment1:{},
          datacomment2:{},
          datacomment3:{},
          titlemsg1:"近期热门",
          titlemsg2:"演唱会",
          titlemsg3:"歌剧话剧",
          titlemsg4:"爱看展",
          datarecommend:[],
          introducedata:{},
          addressdata:'',
          number:0
        }
    },
    directives:{
      ascroll:{
          inserted(el,binding){
              // var p =document.getElementById('p');
              el.addEventListener('scroll', function(){
                      // p.style.display="block";
                      binding.value.color.number = this.scrollTop;
                      // console.log(binding.value.color.number)
              }, false)
          }
      }
    },
    computed:{
        Tcity(){
            return this.$store.getters.getlocation;
        }
    },
    // watch:{
    //   Tcity:function(nval,old){
    //     this.unitData(nval);
    //     console.log(nval);
    //   }
    // },
    components:{
      homeIntroduce,
      homeMore,
      "top":top,
      'home-lbt-top':homeLbtTop,
      'home-lbt-middle':homeLbtMiddle,
      'home-nav':homeNav,
      'home-unit':homeUnit,
      'home-comments':homeComments,
      'home-recommend':homeRecommend
    },
    methods:{
      mockData(){
        getMock( (data)=> {
          this.datamock = data;
        });
      },
      unitData(address){
          if (!address){
            address = "西安"
          }
        getData(address,'演唱会',data =>{
          this.dataunit = JSON.parse(data).body.suggest;
        });
        getData(address,'演唱会',data =>{
          this.dataunit1 = JSON.parse(data).body.suggest;
        });
        getData(address,'歌剧',data =>{
          this.dataunit2 = JSON.parse(data).body.suggest;
        });
        getData(address,'展览',data =>{
          this.dataunit3 = JSON.parse(data).body.suggest;
        });
        getData(address,'演唱会',data =>{
          this.introducedata = JSON.parse(data).body.suggest;
          console.log(this.introducedata);
        })
      },
      commentData(){
          getMock1((data)=>{
            this.datacomment1 = data[0];
            this.datacomment2 = data[1];
            this.datacomment3 = data[2];
            console.log(this.datacomment1);
          })
      },
      recommendData(){
          getMock2(data =>{
            this.datarecommend = data;
          })
      }
      ,changedata(){
        if (this.Tcity){
          this.unitData(this.Tcity);
        }
      }
    },
    mounted(){
      this.mockData();
      this.unitData();
      this.commentData();
      this.recommendData();
      this.changedata();
    }
  }
</script>

<style scoped lang="scss">
.mtl_home{
  width:100%;height:100%;
  display: flex;
  flex-direction: column;
  .home_top{
    height: 0.5rem;
  }
  .home_bottom{
    flex: 1;overflow-y: scroll;
  }
}
</style>
