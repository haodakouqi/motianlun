<template>
  <el-tooltip
    effect="dark"
    content="帮助中心"
    placement="bottom"
  >
    <a href="https://custifymedia.gitbook.io/manual" target="_blank" title="帮助中心">
      <el-icon><QuestionFilled /></el-icon>
    </a>
  </el-tooltip>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({

})
</script>

<style lang="scss" scoped>
  a {
    &:focus {
      outline: none;
    }
  }
  i {
    cursor: pointer;
    font-size: 18px;
    &:focus {
      outline: none;
    }
  }
</style>