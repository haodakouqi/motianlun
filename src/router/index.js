import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Qindex from '@/pages/Qindex/Qindex'
import Qperformance from '@/pages/Qperformance/Qperformance'
import Search from '@/pages/Search'
import Qdetail from '@/pages/Qdetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: Qindex,
      children:[
        {
          path: '',
          name: 'Qperformance',
          component: Qperformance,
        }
      ]
    },
    {
      path: '/Hello',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search,
    },
    {
      path: '/Qdetail',
      name: 'Qdetail',
      component: Qdetail,
    }
  ]
})
