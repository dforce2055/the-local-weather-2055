import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PricingView from '../views/PricingView.vue'
import SingUp from '../views/SingUp.vue'
import CityView from '../views/CityView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Home',
    }
  },
  {
    path: '/weather/:country/:state/:city',
    name: 'city',
    component: CityView,
    meta: {
      title: 'City',
    }
  },
  {
    path: '/pricing',
    name: 'pricing',
    component: PricingView,
    meta: {
      title: 'Pricing',
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: {
      title: 'About',
    }
  },
  {
    path: '/singup',
    name: 'singup',
    component: SingUp,
    meta: {
      title: 'Sing Up',
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0 })
      }, 500)
    })
  },
})

router.beforeEach((to, from, next) => {
  const appName = process.env.VUE_APP_NAME
  document.title = `${to.meta.title} | ${ appName }`
  next()
})

export default router
