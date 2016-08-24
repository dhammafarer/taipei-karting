import R from 'ramda'
import {
} from '../mutation-types'

const state = {
  all: [],
}

const mutations = {
  [SET_EDITOR_VIEW] (state, view) {
    state.editorView = view
  }
}

export default {
  state,
  mutations
}
