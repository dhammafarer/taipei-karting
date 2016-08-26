import driver from '../../api/driver'
import * as types from '../mutation-types'

export const fetchAllDrivers = ({ dispatch }) => {
  return driver.fetchAll()
    .then(response => dispatch(types.RECEIVE_DRIVERS, response.data))
}

export const fetchCurrentDriver = ({ dispatch }, id) => {
  return driver.fetch(id)
    .then(response => dispatch(types.SET_CURRENT_DRIVER, response.data))
}
