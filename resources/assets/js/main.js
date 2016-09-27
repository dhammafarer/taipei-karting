import Vue from 'vue'
import VueResource from 'vue-resource'
import router from './router'
import store from './vuex/store'
import auth from './auth'
import App from './components/App.vue'
import * as filters from './filters'

Vue.use(VueResource)
//Vue.http.options.root = 'http://139.162.60.152/api'
Vue.http.options.root = 'http://localhost:3000/api'

Vue.http.interceptors.push((request, next) => {
  let token = localStorage.getItem('jwt')
  if (token) {
    request.headers = request.headers || {}
    request.headers.Authorization = 'Bearer ' + token
  }
  next()
})

Vue.http.interceptors.push((request, next) => {
  next((response) => {
    if (response.status === 401) {
      return auth.refreshToken()
        .then(() => {
          return Vue.http(request)
        })
        .catch(err => {
          auth.logout()
          return router.go('/login')
        })
    }
  })
})


router.start(App, 'app')

router.beforeEach((transition) => {
  if (transition.to.auth) {
    if (!auth.user.authenticated) {
      transition.redirect('/login')
    }
  }
  transition.next()
})

Vue.filter('racePhoto', filters.racePhoto)
Vue.filter('raceThumb', filters.raceThumb)
Vue.filter('circuitPhoto', filters.circuitPhoto)
Vue.filter('driverPhoto', filters.driverPhoto)
Vue.filter('driverThumb', filters.driverThumb)
Vue.filter('countryFlag', filters.countryFlag)
Vue.filter('raceRecord', filters.raceRecord)
Vue.filter('monthDay', filters.monthDay)
Vue.filter('monthYear', filters.monthYear)
Vue.filter('tba', filters.tba)
