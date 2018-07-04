import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import qindex from '@/pages/q-index/qindex'
import qperformance from '@/pages/q-performance/qperformance'
import search from '@/pages/search'
import qdetail from '@/pages/qdetail'

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
          name: 'qperformance',
          component: qperformance,
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
    }
  ]
})
