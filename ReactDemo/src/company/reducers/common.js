import * as types from '../common/ActionTypes'

const initialState = {
    //菜单权限
    userMenu: {
        search: false,
        input: false,
        follow: false,
        indexRedirect: '/'
    }
}

export default function common(state = initialState, action) {
    switch (action.type) {
        case types.SET_USER_MENU:
            return Object.assign({}, state, {
                userMenu: action.userMenu
            })

        default:
            return state
    }
}
