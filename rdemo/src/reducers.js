var initState = {
    name: 'King',
    age: 20
}

const reducers = (state=initState, action) => {

    switch(action.type){
        case 'CHANGE_NAME':
            return {
                ...state,
                name: action.name
            }
        case 'ADD_AGE':
            return {
                ...state,
                age: state.age + 1
            }
        case 'SUB_AGE':
            return {
                ...state,
                age: state.age - 1
            }
        default:
            return state
    }
}

export default reducers