import R from 'ramda'
import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from '../mutation-types'

const state = {
  all: [
    {title: 'Hi!', body: 'Application loaded!', type: 'success'},
  ]
}

const mutations = {
  [ADD_NOTIFICATION] (state, notification) {
    return state.all.push(notification)
  },
  [REMOVE_NOTIFICATION] (state, notification) {
    return state.all.splice(state.all.indexOf(notification), 1)
  }
}

export default {
  state,
  mutations
}
