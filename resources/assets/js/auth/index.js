import Vue from 'vue'
import router from '../router'

export default {
  user: {
    authenticated: false
  },

  authenticate (creds, redirect) {
    return Vue.http.post('authenticate', creds)
      .then(response => response.json())
      .then((json) => {
        localStorage.setItem('jwt', json.token)
        this.user.authenticated = true
        if (redirect) router.go(redirect)
      })
  },

  logout () {
    localStorage.removeItem('jwt')
    this.user.authenticated = false
  },

  checkAuth () {
    let jwt = localStorage.getItem('jwt')
    if (jwt) this.user.authenticated = true
    else this.user.authenticated = false
  },

  refreshToken() {
    return Vue.http.get('token')
      .then(response => response.json())
      .then((json) => {
        console.log('refreshing jwt')
        localStorage.setItem('jwt', json.token)
        this.user.authenticated = true
      })
  }
}
