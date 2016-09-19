import R from 'ramda'
import {
  RECEIVE_DRIVERS,
  ADD_DRIVER,
  REPLACE_DRIVER,
  SET_CURRENT_DRIVER_ID,
  CLEAR_CURRENT_DRIVER_ID,
  DELETE_DRIVER
} from '../mutation-types'

const state = {
  all: [],
  currentId: null,
}

const mutations = {
  [RECEIVE_DRIVERS] (state, drivers) {
    state.all = drivers
  },
  [ADD_DRIVER] (state, driver) {
    state.all.push(driver)
  },
  [REPLACE_DRIVER] (state, driver) {
    state.all[R.findIndex(R.propEq('id', driver.id), state.all)] = driver
    if (state.currentId === driver.id) {
      state.currentId = null
      state.currentId = parseInt(driver.id)
    }
  },
  [SET_CURRENT_DRIVER_ID] (state, id) {
    state.currentId = null
    state.currentId = parseInt(id)
  },
  [CLEAR_CURRENT_DRIVER_ID] (state) {
    state.currentId = null
  },
  [DELETE_DRIVER] (state, driver) {
    state.all.splice(state.all.indexOf(driver), 1)
  }
}

export default {
  state,
  mutations
}
