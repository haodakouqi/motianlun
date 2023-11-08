/*
 * @Author: luoxi
 * @Date: 2022-01-25 09:51:12
 * @LastEditors: luoxi
 * @LastEditTime: 2022-01-25 12:25:51
 * @FilePath: \vue-admin-box\src\router\index.ts
 * @Description: 
 */
/**
 * @description 所有人可使用的参数配置列表
 * @params hideMenu: 是否隐藏当前路由结点不在导航中展示
 * @params alwayShow: 只有一个子路由时是否总是展示菜单，默认false
 */
import { reactive } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import i18n from '@/locale'
// import NProgress from '@/utils/system/nprogress'
import { changeTitle } from '@/utils/system/title'
import { getAuthRoutes } from './permission/authRoutes'
// NProgress.configure({ showSpinner: false })

// 引入不需要权限的modules
import defaultComponent from './defaultComponent'

/** 
 * @name 初始化必须要的路由
 * @description 使用reactive属性使得modules可以在路由菜单里面实时响应，搞定菜单回显的问题
 * @detail 针对modules的任何修改，均会同步至菜单级别，记住，是针对变量名为：moduels的修改
 **/
const modules = [
  ...defaultComponent
]

const { t } = i18n.global

const router = createRouter({
  history: createWebHistory(),
  routes: modules
})

// 未授权时可访问的白名单
const whiteList = ['login', 'privacyAgreement', 'serviceAgreement', 'home']

/**
 * @description: 路由跳转前的监听操作 (警告：next 和 return 只能存在一个)
 * @param {*}
 */
router.beforeEach(async(to, _from) => {
  // console.log(`%c beforeEach`, 'color:#4278ff;', to)
  to.meta.title ? (changeTitle(to.meta.title)) : "" // 动态title
  
  // NProgress.start();
  const token = localStorage.getItem("token");
  // 非白名单 需要登录
  if (!whiteList.includes(to.name)) {
    if (token) {
      if (to.name === 'login') {
        return { name: 'dashboard' }
      }
      if (!store.state.user.userInfo.loginName) {
        await store.dispatch("user/initData");
        await getAuthRoutes();
        return to.fullPath
      }
    } else {
      return { name: 'login' }
    }
  }
});

// 路由跳转后的监听操作
router.afterEach((to, _from) => {
  // NProgress.done()
});

export default router
