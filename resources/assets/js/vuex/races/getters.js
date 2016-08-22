export function getAllRaces (state) {
  return state.races.all
}

export function getCurrentRace (state) {
  return state.races.current
}

export function getEditorView (state) {
  return state.races.editorView
}
