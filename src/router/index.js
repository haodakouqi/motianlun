import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import qindex from '@/pages/q-index/qindex'
import qperformance from '@/pages/q-performance/qperformance'
//李双江
import LfindYant from '@/pages/LfindYant'
import LticKet from '@/pages/LticKet'
// 崔璇
import search from '@/pages/search'
import qdetail from '@/pages/qdetail'
import qDetailone from '@/pages/qDetailone'
//陈少松
import MtlHome from '@/pagecss/mtl-home'
import Address from '../pagecss/Address'
import Dates from '../pagecss/mtl-date'
// 元杰
import Ymy from '@/pages/Ymy.vue'
import Ylogin from '../pages/Ylogin.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: qindex,
      children:[
        {
          path: '',
          name: 'MtlHome',
          component: MtlHome
        },
        {
          path: '/qperformance',
          name: 'qperformance',
          component: qperformance,
        },
        {
          path: '/lfindyant',
          name: 'LfindYant',
          component: LfindYant,
        },
        {
          path: '/lticket',
          name: 'LticKet',
          component: LticKet,
        },
        {
          path: '/Ymy',
          name: 'Ymy',
          component: Ymy
        }
      ]
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/search',
      name: 'search',
      component: search,
    },
    {
      path: '/qdetail',
      name: 'qdetail',
      component: qdetail,
    },
    {
      path: '/qdetailone',
      name: 'qDetailone',
      component: qDetailone,
    },
    
    {
      path:'/Address',
      name:'Address',
      component:Address
    },
    {
      path:'/date',
      name:'Date',
      component:Dates
    },
    {
      path: '/Ylogin',
      name: 'Ylogin',
      component: Ylogin
    }
  ]
})
