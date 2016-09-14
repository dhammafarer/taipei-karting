import Vue from 'vue'

export default {
  fetchAll () {
    return Vue.http.get('races')
      .then(response => response.json())
  },

  fetch (id) {
    return Vue.http.get('races/' + id)
      .then(response => response.json())
  },

  create (race) {
    return Vue.http.post('races', race)
      .then(response => response.json())
  },

  update (id, race) {
    return Vue.http.post('races/' + id, race)
      .then(response => response.json())
  },

  destroy (id) {
    return Vue.http.delete('races/' + id)
  },

  updateDrivers (id, addedIds, removedIds) {
    return Vue.http.post('races/' + id + '/update-drivers', { addedIds: addedIds, removedIds: removedIds })
      .then(response => response.json())
  },

  updateRecords (id, data) {
    return Vue.http.post('races/' + id + '/update-records', { records: data })
      .then(response => response.json())
  }
}
