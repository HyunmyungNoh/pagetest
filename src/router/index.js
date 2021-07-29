import Vue from 'vue'
import Router from 'vue-router'
import simplePage from '@/components/SimplePagination'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SimplePagination',
      component: simplePage
    }
  ]
})
