<template>
    <ul>
        <li v-for="(n,index) in findmsg" :key='index'>
            <img :src="n.src">
            <p>{{n.des}}</p>
        </li>
    </ul>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    name:'findart',
    computed: {...mapGetters(['findmsg'])} 
}
</script>
<style lang="scss" scoped>
ul{
   padding-bottom:0.65rem; 
}
    li{
        display:flex;
        flex-direction: column;
        padding:0 0.13rem;
        p{
            font-size:0.14rem;
            margin:0.07rem 0 0.17rem 0;
        }
    }
</style>

