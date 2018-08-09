<template>
  <div class="Ymy">
      <ymyheader></ymyheader>
      <ymydan></ymydan>
      <ymysection></ymysection>
  </div>
</template>

<script type="text/ecmascript-6">
import ymyheader from '../components/Ymy/Ymyheader';
import ymydan from '../components/Ymy/ymydan';
import ymysection from '../components/Ymy/ymysection';
export default {
    name:'Ymy',
    data() {
        return {
            
        }
    },
    components: {
        ymyheader,
        ymydan,
        ymysection
    }
}
</script>

<style lang="scss" scoped>
.Ymy{
    height: 100%;width: 100%;
    overflow-y: scroll;
}
</style>
