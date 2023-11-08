// import type { Route } from './index.type'
import Layout from '@/layout/index.vue'
import { defineAsyncComponent } from 'vue'

export const noPage = defineAsyncComponent(() => import('@/views/login/404.vue'));
const route = [
  // {
  //   path: "/",
  //   redirect: "/home"
  // },
  {
    path: '/',
    name: "home",
    component: () => import('@/views/home/index.vue'),
    hideMenu: true,
    meta: { title: '首页', hideTabs: true }
  },
  {
    path: '/login',
    name: "login",
    component: () => import('@/views/login/login.vue'),
    hideMenu: true,
    meta: { title: '登录', hideTabs: true }
  },
  {
    path: '/serviceAgreement',
    name: "serviceAgreement",
    component: () => import('@/views/login/serviceAgreement.tsx'),
    hideMenu: true,
    meta: { title: '服务条款', hideTabs: true }
  },
  {
    path: '/privacyAgreement',
    name: "privacyAgreement",
    component: () => import('@/views/login/privacyAgreement.tsx'),
    hideMenu: true,
    meta: { title: '隐私协议', hideTabs: true }
  },
  {
    path: "/back",
    component: Layout,
    meta: {
      "title": "",
      "icon": "sfont system-home"
    },
    children: [
      {
        "path": "/dashboard",
        "name": "dashboard",
        "meta": {
          "title": "首页",
          "icon": "sfont system-home",
          "hideClose": true
        },
        component: () => import('@/views/dashboard/index.vue')
      },
      {
        path: '/menuList',
        name: "menuList",
        component: () => import('@/views/systemManage/menuList/index.vue'),
        hideMenu: true,
        meta: { title: '菜单', hideTabs: true }
      },
      // {
      //   path: '/test',
      //   name: "test",
      //   component: () => import('@/views/zzzz/test.vue'),
      //   hideMenu: true,
      //   meta: { title: '测试', hideTabs: true }
      // },
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/404',
    hideMenu: true,
    meta: { title: '系统目录' },
    children: [
      {
        path: '/404',
        component: noPage,
        meta: { title: '404', hideTabs: true }
      },
      {
        path: '/401',
        component: defineAsyncComponent(() => import('@/views/login/401.vue')),
        meta: { title: '401', hideTabs: true }
      },
      {
        path: '/redirect/:path(.*)',
        component: defineAsyncComponent(() => import('@/views/login/redirect.vue')),
        meta: { title: '重定向页面', hideTabs: true }
      }
    ]
  },
]

export default route