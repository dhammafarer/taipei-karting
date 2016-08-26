import R from 'ramda'
import {
  RECEIVE_DRIVERS,
  ADD_DRIVER,
  REPLACE_DRIVER,
  DELETE_DRIVER,
  SET_CURRENT_DRIVER,
  CLEAR_CURRENT_DRIVER
} from '../mutation-types'

const driverObj = { name: '', country: '', month: '', photo: '' }
const state = {
  all: [],
  current: driverObj,
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
    state.current = driver
  },
  [DELETE_DRIVER] (state, driver) {
    state.all.splice(state.all.indexOf(driver), 1)
  },
  [SET_CURRENT_DRIVER] (state, driver) {
    state.current = driver
  },
  [CLEAR_CURRENT_DRIVER] (state) {
    state.current = driverObj
  }
}

export default {
  state,
  mutations
}
