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
  '/login': {
    name: 'login',
    component: require('./components/LoginPage.vue')
  },
  '/races/:id': {
    name: 'races.show',
    component: require('./components/RacesShow.vue'),
    subRoutes: {
      '/edit': {
        name: 'races.edit',
        component: require('./components/RacesEdit.vue'),
        auth: true
      }
    }
  },
  '/races': {
    name: 'races.index',
    component: require('./components/RacesIndex.vue'),
    subRoutes: {
      'races/create': {
        name: 'races.create',
        component: require('./components/RacesCreate.vue'),
        auth: true
      }
    }
  },
  '/drivers/:id': {
    name: 'drivers.show',
    component: require('./components/DriversShow.vue'),
    subRoutes: {
      '/edit': {
        name: 'drivers.edit',
        component: require('./components/DriversEdit.vue'),
        auth: true
      }
    }
  },
  '/drivers': {
    name: 'drivers.index',
    component: require('./components/DriversIndex.vue'),
    subRoutes: {
      'drivers/create': {
        name: 'drivers.create',
        component: require('./components/DriversCreate.vue'),
        auth: true
      }
    }
  }
})

export default router
