import race from '../../api/race'
import * as types from '../mutation-types'

export const fetchAllRaces = ({ dispatch }) => {
  return race.fetchAll()
    .then(races => dispatch(types.RECEIVE_RACES, races))
}

export const fetchCurrentRace = ({ dispatch }, id) => {
  return race.fetch(id)
    .then(race => dispatch(types.SET_CURRENT_RACE, race))
}

export const createRace = ({ dispatch }, formData) => {
  return race.create(formData)
    .then(race => dispatch(types.PREPEND_RACE, race))
}

export const setEditorView = ({ dispatch }, view) => {
  dispatch(types.SET_EDITOR_VIEW, view)
}

export const updateRace = ({ dispatch }, id, formData) => {
  return race.update(id, formData)
    .then(race => dispatch(types.SET_CURRENT_RACE, race))
}

export const updateRaceDrivers = ({ dispatch }, id, addedIds, removedIds) => {
  return race.updateDrivers(id, addedIds, removedIds)
    .then(race => dispatch(types.SET_CURRENT_RACE, race))
}

export const updateRaceRecords = ({ dispatch }, id, data) => {
  return race.updateRecords(id, data)
    .then(race => dispatch(types.SET_CURRENT_RACE, race))
}
