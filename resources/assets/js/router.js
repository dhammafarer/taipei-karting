import Vue from 'vue'
import VueRouter from 'vue-router'
import VueValidator from 'vue-validator'
import HomePage from './components/HomePage.vue'
import RacesIndex from './components/RacesIndex.vue'
import RacesShow from './components/RacesShow.vue'
import RacesEdit from './components/RacesEdit.vue'
import RacesCreate from './components/RacesCreate.vue'
import DriversIndex from './components/DriversIndex.vue'

Vue.use(VueRouter)
Vue.use(VueValidator)

const router = new VueRouter()

router.map({
  '/': {
    name: 'home',
    component: HomePage
  },
  '/races': {
    name: 'races.index',
    component: RacesIndex,
    subRoutes: {
      '/create': {
        name: 'races.create',
        component: RacesCreate
      }
    }
  },
  '/race/:id': {
    name: 'races.show',
    component: RacesShow,
    subRoutes: {
      '/edit': {
        name: 'races.edit',
        component: RacesEdit
      }
    }
  },
  '/drivers': {
    name: 'drivers',
    component: DriversIndex
  }
})

export default router
