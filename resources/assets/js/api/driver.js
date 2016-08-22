import Vue from 'vue'

export default {
  fetchAll () {
    return Vue.http.get('drivers')
      .then(response => response.json(), console.log)
  }
}
