<template>
  <div :title="$t('message.system.setting.name')" @click="drawerChange(true)">
    <i class="sfont system-shezhi"></i>
  </div>
  <el-drawer
    :title="$t('message.system.setting.name')"
    v-model="drawer"
    size="330px"
    :show-close="false"
    direction="rtl">
      <h3>{{ $t('message.system.setting.style.name') }}</h3>
      <div class="theme-box">
        <theme-icon
          v-model:active="themeData.style"
          v-for="(row, index) in themeStyle"
          :key="index"
          :name="index"
          :tip="$t(row.name)"
          :logo="row.menu['--el-menu-bg-color']"
          :menu="row.menu['--el-menu-bg-color']"
          :header="row.header.background"
          :main="row.container.background"
          :activeColor="row.page.color"
        ></theme-icon>
      </div>
      <!-- <h3>{{ $t('message.system.setting.primaryColor.name') }}</h3>
      <div class="theme-box">
        <theme-color
          v-model:active="themeData.primaryColor"
          v-model:activeTextColor="themeData.primaryTextColor"
          v-for="(item, key) in themeColorArr"
          :key="key"
          :color="item.color"
          :textColor="item.textColor"
          :tip="item.tip"
        ></theme-color>
      </div> -->
      <h3>{{ $t('message.system.setting.other.name') }}</h3>
      <div class="list">
        <div class="list-item" v-for="option in options" :key="option.name">
          <span>{{ $t(option.name) }}</span>
          <el-switch
            v-model="option.value"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="change(option)"
          >
          </el-switch>
        </div>
      </div>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import themeIcon from './theme/theme-icon.vue'
import themeColor from './theme/theme-color.vue'
import type { Colors } from '@/style/index'
import { themeStyle } from '@/style/index'

interface Option {
  name: string,
  value: boolean,
  store: string
}
interface themeData {
  style: string,
  primaryColor: string,
  menuType: string
}
export default defineComponent({
  components: {
    themeIcon,
    themeColor
  },
  setup() {
    const store = useStore()
    const { t } = useI18n()
    const themeColorArr = [
      { color: '#4d70ff', textColor: '#fff', tip: 'message.system.setting.primaryColor.blue' },
      { color: '#d60f20', textColor: '#fff', tip: 'message.system.setting.primaryColor.red' },
      { color: '#ac25e6', textColor: '#fff', tip: 'message.system.setting.primaryColor.violet' },
      { color: '#4dc86f', textColor: '#fff', tip: 'message.system.setting.primaryColor.green' },
      { color: '#13c2c2', textColor: '#fff', tip: 'message.system.setting.primaryColor.cyan' },
      { color: '#333', textColor: '#fff', tip: 'message.system.setting.primaryColor.black' }
    ]

    // 只取值，不做computed
    const themeData: themeData = reactive({
      style: store.state.app.theme.state.style,
      primaryColor: store.state.app.theme.state.primaryColor,
      menuType: store.state.app.theme.state.menuType
    })

    
    
    const setTheme = () => {
      const userTheme = themeStyle[themeData.style]
      const body = document.getElementsByTagName('body')[0]

      // 设置肤色
      body.setAttribute('data-theme', themeData.style)
      
      // 需要设置的颜色参照theme.scss，位置：assets/style/theme.scss
      const currentStyle = [
      ]
      for (let i in userTheme) {
        if (i === 'name') {
          continue;
        }
        const item: any = userTheme[i as keyof Colors]

        if (['elementPlus','menu'].includes(i)) {
          for (let y in item) {
            // body.style.setProperty(y, `${item[y]} !important`)
            // document.documentElement.style.setProperty(y, `${item[y]} !important`)
            currentStyle.push(`${y}:${item[y]}`)
          }
        }

        if (['header', 'container', 'page'].includes(i)) {
          for (let y in item) {
            let cssVarName = '--system-' + i + '-' + y.replace(/([A-Z])/g, "-$1").toLowerCase()
            // body.style.setProperty(cssVarName, item[y])
            currentStyle.push(`${cssVarName}: ${item[y]}`)
          }
        }
      }

      const style = document.createElement("style");
      style.innerText = `:root{${currentStyle.join(';')}}`;
      document.head.appendChild(style);
    }
    // 监听数据的变化
    watch(themeData, (newVal) => {
      const theme = {
        state: {
          ...themeData
        }
      }
      store.commit('app/stateChange', {
        name: 'theme',
        value: theme
      })
      setTheme()
    })


    let drawer = ref(false)
    const options = reactive([
      { name: 'message.system.setting.other.showLogo', value: store.state.app.showLogo, store: 'showLogo' },
      // { name: 'message.system.setting.other.showBreadcrumb', value: store.state.app.showTabs, store: 'showTabs' },
      { name: 'message.system.setting.other.keepOnlyOneMenu', value: store.state.app.expandOneMenu, store: 'expandOneMenu' }
    ])
    const drawerChange = (value: boolean) => {
      drawer.value = value
    }
    const change = (option: Option) => {
      store.commit(`app/stateChange`, { name: option.store, value: option.value })
    }
    setTheme()
    return {
      drawer,
      options,
      themeData,
      themeStyle,
      themeColorArr,
      drawerChange,
      change
    }
  }
})
</script>

<style lang="scss" scoped>
  i {
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }
  
  .list {
    padding: 0 20px;
    &-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      span {
        font-size: 16px;
      }
    }
  }
  h3 {
    margin-top: 40px;
    margin-bottom: 20px;
    color: rgba(0,0,0,.85);
    font-size: 14px;
    line-height: 22px;
    text-align: left;
    padding: 0 20px;
    &:first-child {
      margin-top: 0;
    }
  }
  .theme-box {
    text-align: left;
    padding-left: 20px;
  }
</style>