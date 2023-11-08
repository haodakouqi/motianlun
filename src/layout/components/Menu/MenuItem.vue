<template>
  <template v-if="!menu.hideMenu">
    <el-sub-menu v-if="showMenuType === 3" :index="menu.path">
      <template #title>
        <el-icon>
          <i class="menu-i" :class="menu.meta.icon" v-if="menu.meta.icon"></i>
        </el-icon>
        <span>{{ menu.meta.title }}</span>
      </template>
      <menu-item
        v-for="(item, key) in menu.children"
        :key="key"
        :menu="item"
      />
    </el-sub-menu>
  
    <template v-else-if="showMenuType === 2">
      <app-link v-for="t in menu.children" :key="t.path" :to="t.path" >
        <el-menu-item :index="t.path">
          <el-icon>
            <i class="menu-i" :class="t.meta.icon" v-if="t.meta.icon"></i>
          </el-icon>
          <template #title>{{ t.meta.title }}</template>
        </el-menu-item>
      </app-link>
    </template>

    <app-link v-else :to="menu.path">
      <el-menu-item :index="menu.path">
        <el-icon>
          <i class="menu-i" :class="menu.meta.icon" v-if="menu.meta.icon"></i>
        </el-icon>
        <template #title>{{ menu.meta.title }}</template>
      </el-menu-item>
    </app-link>
  </template>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import appLink from './Link.vue'
export default defineComponent({
  name: 'menu-item',
  props: {
    menu: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  components: {
    appLink
  },
  setup(props) {
    const menu = props.menu
    // todo: 优化if结构
    /**
     * @description: topMenu 表示动态路由注册 顶级菜单
     * @param {*}
     */
    const showMenuType = computed(() => { // 0: 无子菜单， 1：有1个子菜单， 2：显示上下级子菜单
      if (menu.children && menu.children.length > 0) {
        return menu.topMenu ? 2 : 3
      } else {
        return 1
      }
    })
    // console.log(`%c showMenuType`, 'color:#4278ff;', menu)
    return {
      showMenuType
    }
  }
})
</script>

<style lang="scss" scoped>
</style>