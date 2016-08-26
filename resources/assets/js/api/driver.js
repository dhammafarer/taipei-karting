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

  create (driver) {
    return Vue.http.post('drivers', driver)
      .then(response => response.json())
  },

  update (id, driver) {
    return Vue.http.post('drivers/' + id, driver)
      .then(response => response.json())
  },

  destroy (id) {
    return Vue.http.delete('drivers/' + id)
  },

  checkName (name) {
    return Vue.http.post('drivers/check-name', { name: name })
      console.log('checking name')
      .then(response => response.json())
  }
}
