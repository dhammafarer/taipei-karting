import R from 'ramda'
import {
  RECEIVE_DRIVERS,
  SET_CURRENT_DRIVER
} from '../mutation-types'

const state = {
  all: [],
  current: {},
}

const mutations = {
  [RECEIVE_DRIVERS] (state, drivers) {
    state.all = drivers
  },
  [SET_CURRENT_DRIVER] (state, driver) {
    state.current = driver
  }
}

export default {
  state,
  mutations
}
