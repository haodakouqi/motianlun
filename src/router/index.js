import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Qindex from '@/pages/Qindex/Qindex'
import Qperformance from '@/pages/Qperformance/Qperformance'

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
    }
  ]
})
