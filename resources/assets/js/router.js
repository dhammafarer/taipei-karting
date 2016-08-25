import Vue from 'vue'
import VueRouter from 'vue-router'
import VueValidator from 'vue-validator'

Vue.use(VueRouter)
Vue.use(VueValidator)

const router = new VueRouter()

router.map({
  '/': {
    name: 'home',
    component: require('./components/HomePage.vue')
  },
  '/races': {
    name: 'races.index',
    component: require('./components/RacesIndex.vue'),
    subRoutes: {
      '/create': {
        name: 'races.create',
        component: require('./components/RacesCreate.vue')
      }
    }
  },
  '/race/:id': {
    name: 'races.show',
    component: require('./components/RacesShow.vue'),
    subRoutes: {
      '/edit': {
        name: 'races.edit',
        component: require('./components/RacesEdit.vue')
      }
    }
  },
  '/drivers': {
    name: 'drivers.index',
    component: require('./components/DriversIndex.vue'),
    subRoutes: {
      '/create': {
        name: 'drivers.create',
        component: require('./components/DriversCreate.vue')
      }
    }
  },
  '/driver/:id': {
    name: 'drivers.show',
    component: require('./components/DriversShow.vue'),
    subRoutes: {
      '/edit': {
        name: 'drivers.edit',
        component: require('./components/DriversEdit.vue')
      }
    }
  },
})

export default router
