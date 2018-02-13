import Vue from 'vue'
import Router from 'vue-router'
import tPage from '@/components/titlePage'
import index from '@/components/index'
import detail from '@/components/detail'

Vue.use(Router)

export default new Router({
  routes: [
     {
      path: '/',
      name: 'tPage',
      component: tPage
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: detail
    }
  ]
})
