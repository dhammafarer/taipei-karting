import R from 'ramda'

export function getAllDrivers (state) {
  return state.drivers.all
}

export function getCurrentDriver (state) {
  return R.find(R.propEq('id', state.drivers.currentId), state.drivers.all)
}
