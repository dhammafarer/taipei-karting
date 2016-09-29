import race from '../../api/race'
import * as types from '../mutation-types'

export const fetchAllRaces = ({ dispatch }) => {
  return race.fetchAll()
    .then(response => dispatch(types.RECEIVE_RACES, response.data))
}

// used to fetch a single race directly from the database
export const fetchCurrentRace = ({ dispatch }, id) => {
  return race.fetch(id)
    .then(response => dispatch(types.SET_CURRENT_RACE, response.data))
}

export const createRace = ({ dispatch }, formData) => {
  return race.create(formData)
    .catch(err => dispatch(types.ADD_NOTIFICATION, {title: 'Fail!', body: 'No new race, bud', type: 'danger'})
    )
    .then(response => {
      dispatch(types.ADD_RACE, response.data)
      dispatch(types.ADD_NOTIFICATION, {title: 'Success!', body: 'New race created!', type: 'success'})
    })
}

export const updateCurrentRaceId = ({ dispatch }, id) => {
  dispatch(types.SET_CURRENT_RACE_ID, id)
}

export const clearCurrentRaceId = ({ dispatch }) => {
  dispatch(types.CLEAR_CURRENT_RACE_ID)
}

export const setEditorView = ({ dispatch }, view) => {
  dispatch(types.SET_EDITOR_VIEW, view)
}

export const updateRace = ({ dispatch }, id, formData) => {
  return race.update(id, formData)
    .catch(err => dispatch(types.ADD_NOTIFICATION, {title: 'Error!', body: 'Something went wrong!', type: 'danger'})
    )
    .then(response => {
      dispatch(types.REPLACE_RACE, response.data)
      dispatch(types.ADD_NOTIFICATION, {title: 'Success!', body: 'Race data updated!', type: 'success'})
    })
}

export const deleteRace = ({ dispatch }, data) => {
  return race.destroy(data.id)
    .catch(err => {
      dispatch(types.ADD_NOTIFICATION,
        {title: 'Error!', body: 'Failed to delete race.', type: 'danger'})
      }
    )
    .then(response => {
      dispatch(types.DELETE_RACE, data)
      dispatch(types.ADD_NOTIFICATION,
        {title: 'Success!', body: 'Race has been deleted.', type: 'success'})
    })
}

export const updateRaceDrivers = ({ dispatch }, id, addedIds, removedIds) => {
  return race.updateDrivers(id, addedIds, removedIds)
    .catch(err => dispatch(types.ADD_NOTIFICATION, {title: 'Error!', body: 'Something went wrong!', type: 'danger'})
    )
    .then(response => {
      dispatch(types.REPLACE_RACE, response.data)
      dispatch(types.ADD_NOTIFICATION, {title: 'Success!', body: 'Race data updated!', type: 'success'})
    })
}

export const updateRaceRecords = ({ dispatch }, id, data) => {
  return race.updateRecords(id, data)
    .catch(err => dispatch(types.ADD_NOTIFICATION, {title: 'Error!', body: 'Something went wrong!', type: 'danger'})
    )
    .then(response => {
      dispatch(types.REPLACE_RACE, response.data)
      dispatch(types.ADD_NOTIFICATION, {title: 'Success!', body: 'Race data updated!', type: 'success'})
    })
}

// Socket.io actions
export const socketRaceUpdated = ({ dispatch }, data) => {
  return race.fetch(data.race.id)
    .then(response => {
      dispatch(types.REPLACE_RACE, response.data)
      dispatch(types.ADD_NOTIFICATION, {title: 'Live!', body: 'Race data updated!', type: 'success'})
    })
}
