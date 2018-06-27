<!-- qioajie -->
<template>
  <div class="Qindex">
      <section>
         <router-view/>
      </section>
      <footer>
         <h1>这是底部</h1>
      </footer>
  </div>
</template>

<script>
export default {
    name:"Qindex",
    data () {
        return {
           
        };
    },
    methods:{
      
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
    footer{
        height: 0.6rem;
    }
}
</style>