import R from 'ramda'
import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from '../mutation-types'

const state = {
  all: [{title: 'Fail!', body: 'Just Testing.', type: 'danger'}]
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
