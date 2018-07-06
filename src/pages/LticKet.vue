<template>
    <div class="LticKet">
        <header :style="{background:'rgba(255, 255, 255,'+num+')'}">
            <top :msg='msg'></top>
        </header>
        <section v-ascroll="{color:this,book:value}">
             <ticketart ref="ticketart"></ticketart>
        </section>
    </div>
</template>
<script type="text/ecmascript-6">
import top from '../components/Ltop.vue'
import ticketart from '../components/ticket-art.vue'
export default {
    name:'LticKet',
    data () {
        return {
            msg:'',
            value:'1',
            num:"0"
        }
    },
    components:{
        top,
        ticketart
    },
    computed:{
        Tcity(){
            return this.$store.getters.getlocation;
        }
    },
    directives:{
        ascroll:{
            inserted(el,binding){
                el.addEventListener('scroll', function(){
                    if(this.scrollTop>20){
                        binding.value.color.num = "1";
                    }else{
                        binding.value.color.num = "0";
                    }
                }, false)
            }
        }
    },
    methods: {
            find(){
                // this.$router.push({name:'find'})
            },
            turn(){
                // this.$router.push({name:'turn'})
            }
            // getParams(){
            //     let routerParams=this.$route.params.value
            //     this.msg=routerParams
            //     this.value=routerParams
            //     this.$refs.ticketart.$emit('getParams',this.value);
            // }
        },
    mounted(){
        // this.getParams()
    },
    watch:{
        '$router':'getParams'
    }
}
</script>
<style lang="scss" scoped>
.LticKet{
    height: 100%;width:100%;
    display: flex;
    flex-direction: column;
    header{
        width:100%;height: 0.55rem;position: fixed;
        top:0rem;
        transition: all 0.5s;
    }
    section{
        width:100%;overflow-y: scroll;flex: 1;
    }
}
</style>
