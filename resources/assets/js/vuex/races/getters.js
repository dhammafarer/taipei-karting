export function getAllRaces (state) {
  return state.races.all
}

export function getCurrentRace (state) {
  //return state.races.current
  return state.races.all.filter(race => race.id == state.races.currentId)[0]
}

export function getEditorView (state) {
  return state.races.editorView
}
