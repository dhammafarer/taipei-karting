import * as types from '../mutation-types'

export const fetchAllRaces = ({ dispatch }) => {
  return race.fetchAll()
    .then(response => dispatch(types.RECEIVE_RACES, response.data))
}
