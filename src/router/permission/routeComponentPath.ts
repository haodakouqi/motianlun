/*
 * @Date: 2023-03-10 19:34:30
 * @Description: 
 */
// import { createNameComponent } from './createNode';
import { defineAsyncComponent } from 'vue'
/** 导出所有路由，供后端配置使用 */
const allRoutes = {
  /** 首页 */
  dashboard: defineAsyncComponent(() => import('@/views/dashboard/index.vue')),
  /** 用户管理 */
  userList: defineAsyncComponent(() => import('@/views/userManage/userList/index.vue')),
  roleList: defineAsyncComponent(() => import('@/views/userManage/roleList/index.vue')),
  
  /** 客户管理 */
  customList: defineAsyncComponent(() => import('@/views/customManage/customList/index.vue')),
  accountList: defineAsyncComponent(() => import('@/views/customManage/accountList/index.vue')),
  
  channelList: defineAsyncComponent(() => import('@/views/channelManage/channelList/index.vue')),
  mediaAuth: defineAsyncComponent(() => import('@/views/channelManage/mediaAuth/index.vue')),
  
  accountProfit: defineAsyncComponent(() => import('@/views/financialManage/accountProfit/index.vue')),
  channelProfit: defineAsyncComponent(() => import('@/views/financialManage/channelProfit/index.vue')),
  profitReport: defineAsyncComponent(() => import('@/views/financialManage/profitReport/index.vue')),
  /** 系统管理 */
   /** 媒体列表 */
  mediaList: defineAsyncComponent(() => import('@/views/systemManage/mediaList/index.vue')),
  exchangeRateList: defineAsyncComponent(() => import('@/views/systemManage/exchangeRateList/index.vue')),

  memberList: defineAsyncComponent(() => import('@/views/userManage/memberList/index.vue')),

  // /** 文档 */
  // /** keepAlive使用说明 */
  // keepAlive: defineAsyncComponent(() => import('@/views/main/document/keepAlive.vue')),
  // /** 项目图标的说明 */
  // systemfont: defineAsyncComponent(() => import('@/views/main/document/systemfont.vue')),


  // /** 组件 */
  // /** 文本编辑器 */
  // wordEditor: defineAsyncComponent(() => import('@/views/main/components/wordEditor/index.vue')),
  // /** md编辑器 */
  // mdEditor: defineAsyncComponent(() => import('@/views/main/components/mdEditor/index.vue')),
  // /** 代码编辑器 */
  // codeEditor: defineAsyncComponent(() => import('@/views/main/components/codeEditor/index.vue')),
  // /** json编辑器 */
  // jsonEditor: defineAsyncComponent(() => import('@/views/main/components/jsonEditor/index.vue')),

  // /** 右键菜单 */
  // rightMenu: defineAsyncComponent(() => import('@/views/main/components/rightMenu/index.vue')),



  // /** 自定义指令 */
  // /** 拖拽指令：v-dragable */
  // dragable: defineAsyncComponent(() => import('@/views/main/directive/dragable.vue')),
  // /** 复制指令：v-copy */
  // copy: defineAsyncComponent(() => import('@/views/main/directive/copy.vue')),
  // /** 水印指令：v-waterMarker */
  // waterMarker: defineAsyncComponent(() => import('@/views/main/directive/waterMarker.vue')),
  // /** 长按指令：v-longpress */
  // longpress: defineAsyncComponent(() => import('@/views/main/directive/longpress.vue')),
  // /** 按钮防抖指令：v-debounce */
  // debounce: defineAsyncComponent(() => import('@/views/main/directive/debounce.vue')),

  // /** 点击外部区域：v-click-outside */
  // clickOutside: defineAsyncComponent(() => import('@/views/main/directive/clickOutside.vue')),
}

export default allRoutes