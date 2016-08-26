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

export const clearCurrentDriver = ({ dispatch }) => {
  return dispatch(types.CLEAR_CURRENT_DRIVER)
}

export const createDriver = ({ dispatch }, formData) => {
  return driver.create(formData)
    .catch(err => dispatch(types.ADD_NOTIFICATION,
      {title: 'Error!', body: 'The driver could not be saved.', type: 'danger'})
    )
    .then(response => {
      dispatch(types.ADD_DRIVER, response.data)
      dispatch(types.ADD_NOTIFICATION,
        {title: 'Success!', body: 'Driver has been created!', type: 'success'})
    })
}

export const updateDriver = ({ dispatch }, id, formData) => {
  return driver.update(id, formData)
    .catch(err => dispatch(types.ADD_NOTIFICATION,
      {title: 'Error!', body: 'Failed to update driver data.', type: 'danger'})
    )
    .then(response => {
      dispatch(types.REPLACE_DRIVER, response.data)
      dispatch(types.ADD_NOTIFICATION,
        {title: 'Success!', body: 'Driver data updated.', type: 'success'})
    })
}
