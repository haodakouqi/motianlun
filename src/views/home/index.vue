<template>
  <div class="home">
    <div class="home-header-bg">
      <div class="home-header">
        <Logo :visible="true" />
        <div class="header-tab">
          <div
            v-for="t in tabList"
            :key="t.label"
            :class="['tab-item', activeTab === t.value ? 'active' : '']"
            @click="() => activeTab = t.value"
          >
            {{t.label}}
          </div>
        </div>

        <div class="heaer-btn">
          <el-button
            class="login"
            type="primary"
            size="large"
            @click="goPage(1)"
          >
            {{BtnName}}
          </el-button>
        </div>
      </div>
    </div>

    <homeNav v-if="activeTab === 'homeNav'" />
    <!-- <aboutUs /> -->
    <aboutUs v-if="activeTab === 'aboutUs'" />
    <homePrise v-if="activeTab === 'homePrise'" />
    <contactUs />
    <callMeDialog ref="callMeDialog" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, provide } from 'vue'
import { useRouter } from 'vue-router'
import { getToken } from "@/utils/methods";

import Logo from "@/components/Logo/index.vue";
import aboutUs from "./aboutUs.vue";
import homeNav from "./homeNav.vue";
import homePrise from "./homePrise.vue";
import contactUs from "./contactUs.vue";
import callMeDialog from "./callMeDialog.vue";
export default defineComponent({
  components: {
    Logo,
    homeNav,
    aboutUs,
    homePrise,
    contactUs,
    callMeDialog
  },
  setup(props, ctx) {
    const router = useRouter()
    const tabList = [
      { label: '首页', value: 'homeNav' },
      { label: '价格', value: 'homePrise' },
      { label: '关于我们', value: 'aboutUs' },
    ]
    const activeTab = ref('homeNav')

    const BtnPath = computed(() => getToken() ? "/dashboard" : "/login");
    const BtnName = computed(() => getToken() ? "进入工作台" : "登录/注册");

    function goPage(isLogin = 1) {
      console.log(`%c qjlog`, 'color:#4278ff;', BtnPath)
      if (getToken()) {
        router.push({
          path: BtnPath.value
        })
      } else {
        router.push({
          path: BtnPath.value,
          query: { isLogin: isLogin }
        })
      }
    }
    provide('goPage', goPage)

    const callMeDialog = ref();
    function OpenCallMeDialog(isLogin = 1) {
      callMeDialog.value.visible = true;
    }
    provide('OpenCallMeDialog', OpenCallMeDialog)
    onMounted(() => {
    })
    return {
      BtnName, 
      activeTab,
      tabList,
      goPage,
      callMeDialog, OpenCallMeDialog
    }
  }
})
</script>

<style lang="scss">
.home {
  .home-header-bg {
    width: 100%;
    position: sticky;
    top: 0;
		z-index: 1;
    background: #fff;
    .home-header {
      padding: 0 46px;
      display: flex;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      .header-tab {
        flex: 1;
        display: flex;
        align-items: center;
        padding: 0 53px;
        .tab-item {
          height: 72px;
          font-size: 16px;
          line-height: 72px;
          color: rgba(0, 0, 0, 1);
          vertical-align: top;
          cursor: pointer;
          border-bottom: 3px solid #fff;
        }
        .tab-item + .tab-item {
          margin-left: 60px;
        }

        .active {
          color: var(--el-color-primary);
          border-bottom: 3px solid var(--el-color-primary);
          // background: linear-gradient(360deg, rgba(38, 224, 203, 1), rgba(30, 90, 185, 1) 100%);
          // background-clip: text;
          // -webkit-background-clip: text;
          // -webkit-text-fill-color: transparent;  
        }
      }
      .heaer-btn {
        display: flex;
        .el-button {
          // height: 45px;
          border-radius: 6px;
          // padding: 12px 39px;
        }
        .login {
          // background: rgba(42, 130, 228, 1);
        }
        .resger {
          // color: var(--system-text-primary);
          color: var(--el-color-primary);
          // --el-button-border-color: var(--el-color-primary)
        }
      }
    }
  }
}
</style>