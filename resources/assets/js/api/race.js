import Vue from 'vue'

export default {
  fetchAll () {
    return Vue.http.get('races')
      .then(response => response.json(), console.log)
  },

  fetch (id) {
    return Vue.http.get('races/' + id)
      .then(response => response.json(), console.log)
  },

  create (data) {
    return Vue.http.post('races', data)
      .then(response => response.json(), console.log)
  },

  update (id, data) {
    return Vue.http.post('races/' + id, data)
      .then(response => response.json(), console.log)
  },

  updateDrivers (id, addedIds, removedIds) {
    return Vue.http.post('races/' + id + '/updateDrivers', { addedIds: addedIds, removedIds: removedIds })
      .then(response => response.json(), console.log)
  },

  updateRecords (id, data) {
    return Vue.http.post('races/' + id + '/updateRecords', { records: data })
      .then(response => response.json(), console.log)
  }
}
