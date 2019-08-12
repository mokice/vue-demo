import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '../components/recommend/recommend.vue'
import Singer from '../components/singer/singer.vue'
import SingerDetail from '../components/singer-detail/singer-detial.vue'
import RecommendDetail from '../components/recommend-detial/recommend-detail.vue'
import SerachDetail from '../components/search-detail/search-detail.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [{
        path: ':id',
        component: RecommendDetail
      }]
    },
    {
      path: '/singer',
      component: Singer
    },
    {
      path: '/singer/:mid',
      component: SingerDetail
    },
    {
      path: '/searchdetail',
      component: SerachDetail
    }
  ]
})
