<template>
  <div class="Hello">
        <div class="footer_one">
            <div class="fto_left"><img :src="'http://pimg.damai.cn/perform/project/'+ibook.fold+'/'+ibook.projectId+'_n.jpg'" alt=""></div>
            <div class="fto_right">
                <h1>{{ibook.projectName}}</h1>
                <p>{{ibook.startTime}}</p>
                <p>{{ibook.venue}}</p>
                <p class="fto_right_px"><span>{{ibook.price}}</span>元起</p>
                <p class="fto_right_py">"平凡之路，且听且吟。再次相遇，此间少年。     "</p>
                <div class="fto_right_a"><div>9.3</div>折起</div>
            </div>
        </div>
  </div>
</template>
<script>
export default {
    name: 'Hello',
    data () {
        return {
        
        }
    },
    computed:{
        ibook(){
            return this.$store.getters.getdetail;
        }
    },
    methods:{
        
    },
    mounted(){
        
    }
    
}
</script>

<style lang='scss' scoped>
.Hello{
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
    table{
        font-size: 0.32rem;
    }  
}
</style>
