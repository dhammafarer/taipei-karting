import R from 'ramda'

export function getAllRaces (state) {
  return state.races.all
}

export function getCurrentRace (state) {
  console.log('getting current race')
  return R.find(R.propEq('id', state.races.currentId), state.races.all)
}

export function getEditorView (state) {
  return state.races.editorView
}
