import Vue from 'vue'
import VueResource from 'vue-resource'
import router from './router'
import store from './vuex/store'
import auth from './auth'
import App from './components/App.vue'
import { racePhoto, driverPhoto, raceRecord, monthDay, monthYear, tba } from './filters'

Vue.use(VueResource)
Vue.http.options.root = 'http://192.168.1.81:3000/api'
//Vue.http.options.root = 'http://tika.app/api'

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

Vue.filter('racePhoto', racePhoto)
Vue.filter('driverPhoto', driverPhoto)
Vue.filter('raceRecord', raceRecord)
Vue.filter('monthDay', monthDay)
Vue.filter('monthYear', monthYear)
Vue.filter('tba', tba)
