import Vue from 'vue'
import VueResource from 'vue-resource'
import router from './router'
import store from './vuex/store'
import auth from './auth'
import App from './components/App.vue'
import { racePhoto, driverPhoto, raceRecord } from './filters'

Vue.use(VueResource)
//Vue.http.options.root = 'http://localhost:3000/api'
Vue.http.options.root = 'http://tika.app/api'

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
    }
  })
})


router.start(App, 'app')

Vue.filter('racePhoto', racePhoto)
Vue.filter('driverPhoto', driverPhoto)
Vue.filter('raceRecord', raceRecord)
