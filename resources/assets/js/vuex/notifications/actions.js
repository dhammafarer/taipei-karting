import * as types from '../mutation-types'

export const addNotification = ({ dispatch }, notification) => {
  console.log('adding notification')
    dispatch(types.ADD_NOTIFICATION, notification)
}

export const closeNotification = ({ dispatch }, notification) => {
    dispatch(types.REMOVE_NOTIFICATION, notification)
}
