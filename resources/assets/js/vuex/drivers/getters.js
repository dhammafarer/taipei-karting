import R from 'ramda'

export function getAllDrivers (state) {
  return state.drivers.all
}

export function getCurrentDriver (state) {
  return state.drivers.current
}
