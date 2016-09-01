import Vue from 'vue'
import VueResource from 'vue-resource'
import router from './router'
import store from './vuex/store'
import App from './components/App.vue'
import { racePhoto, driverPhoto, raceRecord } from './filters'

Vue.use(VueResource)
//Vue.http.options.root = 'http://localhost:3000/api'
Vue.http.options.root = 'http://tika.app/api'

router.start(App, 'app')

Vue.filter('racePhoto', racePhoto)
Vue.filter('driverPhoto', driverPhoto)
Vue.filter('raceRecord', raceRecord)
