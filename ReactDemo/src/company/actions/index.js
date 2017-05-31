import * as types from '../common/ActionTypes'

export function setUserMenu(userMenu) {
    return {
        type: types.SET_USER_MENU,
        userMenu
    }
}