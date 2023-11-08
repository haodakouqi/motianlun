<!-- 微信号-->
<template>
  <el-dialog
    title="联系商务"
    v-model="visible"
    width="400px"
    modal-class="callMeDialog"
  >
    <div class="callMeDialog-main">
      <el-image style="width: 216px" :src="callMe" fit="cover" />
      <p class="fs-14">扫码添加微信专属客服，联系我们</p>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, watch, computed } from 'vue'
import callMe from "@/assets/images/callMe.png";
export default defineComponent({
  props: {
    platform: [Number]
  },
  setup(props, ctx) {
    const visible = ref(false)
   
    return {
      visible, callMe
    }
  }
});
</script>

<style lang="scss">
.callMeDialog {
  .el-dialog__header {
    text-align: center;
    // display: none;
  }
  .el-dialog__body {
    // padding: 0;
    .callMeDialog-main {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .el-image {
        margin: 60px 0;
      }
    }
  }
}
</style>
