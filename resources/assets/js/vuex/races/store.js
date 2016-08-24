import R from 'ramda'
import {
  RECEIVE_RACES,
  ADD_RACE,
  REPLACE_RACE,
  SET_CURRENT_RACE,
  SET_CURRENT_RACE_ID,
  CLEAR_CURRENT_RACE,
  SET_EDITOR_VIEW
} from '../mutation-types'

const state = {
  all: [],
  current: { records: [] },
  currentId: null,
  editorView: null
}

const mutations = {
  [RECEIVE_RACES] (state, races) {
    state.all = races
  },
  [ADD_RACE] (state, race) {
    state.all.push(race)
  },
  [REPLACE_RACE] (state, race) {
    state.all[R.findIndex(R.propEq('id', race.id), state.all)] = race
  },
  [SET_CURRENT_RACE] (state, race) {
    state.current = race
  },
  [SET_CURRENT_RACE_ID] (state, id) {
    state.currentId = null
    state.currentId = parseInt(id)
  },
  [CLEAR_CURRENT_RACE] (state) {
    state.current = { records: [] }
  },
  [SET_EDITOR_VIEW] (state, view) {
    state.editorView = view
  }
}

export default {
  state,
  mutations
}
