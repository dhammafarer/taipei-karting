import Vue from 'vue'

export default {
  fetchAll () {
    return Vue.http.get('drivers')
      .then(response => response.json())
  },

  fetch (id) {
    return Vue.http.get('drivers/' + id)
      .then(response => response.json())
  },

  checkName (name) {
    return Vue.http.post('drivers/check-name', { name: name })
      console.log('checking name')
      .then(response => response.json())
  }
}
