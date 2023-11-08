<template>
  <div @click="goPage" class="logo-container">
    <img :src="logo" width="40" height="40" alt="">
    <h1 v-if="!isCollapse" class="ml-10">{{ systemTitle }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { systemTitle } from '@/config'
import logo from "@/assets/images/logo.png"
export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const router = useRouter()
    function goPage() {
      router.push({
        path: '/'
      })
    }
    const store = useStore()
    const isCollapse = computed(() => {
      if (props.visible) {
        return false
      } else {
        return store.state.app.isCollapse
      }
    })
    return {
      goPage,
      logo,
      isCollapse,
      systemTitle
    }
  }
})
</script>

<style lang="scss" scoped>
  .logo-container {
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--el-menu-bg-color);
    cursor: pointer;
    h1 {
      font-size: 18px;
      white-space: nowrap;
      color: var(--el-color-primary);
      // color: var(--el-menu-text-color);
      // background: linear-gradient(360deg, rgba(38, 224, 203, 1), rgba(30, 90, 185, 1) 100%);
      // background-clip: text;
      // -webkit-background-clip: text;
      // -webkit-text-fill-color: transparent;  
    }
  }
</style>