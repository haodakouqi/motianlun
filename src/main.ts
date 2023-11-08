/*
 * @Date: 2022-05-22 20:44:25
 * @Description: 
 */
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css' // 引入基于断点的隐藏类

import 'normalize.css' // css初始化
import './style/reset.scss' // 公共css
import './style/common.scss' // 公共css
import App from './App.vue'
import store from './store'
import router from './router'
import i18n from './locale'
import GlobalMethod from "./utils/methods";
import gltableColumn from "@/components/gltableColumn"
import glExportBtn from "@/components/glExportBtn"
import glDownloadBtn from "@/components/glDownloadBtn"

// 引入注册脚本
import 'virtual:svg-icons-register'
import SvgIcon from "@/components/SvgIcon.vue"



/** 权限路由处理主方法 */
// getAuthRoutes().then(() => {
// })
const app = createApp(App)
app.use(ElementPlus, { size: store.state.app.elementSize })

/**
 * @description: 全员注册 element图标
 * @param {*}
 */
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.component("gltableColumn", gltableColumn)
app.component("glExportBtn", glExportBtn)
app.component("glDownloadBtn", glDownloadBtn)
app.component("SvgIcon", SvgIcon)
app.use(store)
app.use(router)
app.use(i18n)
// app.config.performance = true
app.provide("$glMethod", GlobalMethod);

app.mount('#app')

