import {
  RECEIVE_RACES,
  PREPEND_RACE,
  SET_CURRENT_RACE,
  CLEAR_CURRENT_RACE,
  SET_EDITOR_VIEW
} from '../mutation-types'

const state = {
  all: [],
  current: { records: [] },
  editorView: null
}

const mutations = {
  [RECEIVE_RACES] (state, races) {
    state.all = races
  },
  [PREPEND_RACE] (state, race) {
    state.all.unshift(race)
  },
  [SET_CURRENT_RACE] (state, race) {
    state.current = race
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