<template>
  <el-scrollbar>
    <el-menu
      class="layout-menu global-scrollbar"
      :mode="mode"
      :default-active="activeMenu"
      :class="isCollapse? 'collapse': ''"
      :collapse="isCollapse"
      :collapse-transition="true"
      :unique-opened="expandOneMenu"
    >
      <menu-item v-for="(menu, key) in resourcesTree" :key="key" :menu="menu" />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import MenuItem from './MenuItem.vue'
export default defineComponent({
  props: {
    mode: {
      type: String,
      default: "vertical"
    }
  },
  components: {
    MenuItem
  },
  setup(props) {
    const { mode } = props
    const store = useStore()
    const isCollapse = computed(() => store.state.app.isCollapse)
    const expandOneMenu = computed(() => store.state.app.expandOneMenu)
    const resourcesTree = computed(() => {
      return [
        {
          meta: { 
            title: '首页', icon: 'sfont system-home', hideClose: true
          },
          path: "/dashboard"
        },
        ...store.state.user.resourcesTree
      ]
    })
    const route = useRoute()
    const activeMenu: any = computed(() => {
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    });
    onMounted(() => {
    })
    return {
      isCollapse,
      expandOneMenu,
      resourcesTree,
      activeMenu,
      mode,
    }
  }
})
</script>

<style lang="scss">
  .el-scrollbar {
    background-color: var(--el-menu-bg-color);
    flex: 1;
  }
  .layout-menu {
    width: 100%;
    border: none;
  }
</style>