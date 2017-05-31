export const changeName = (name) => {
    return {
        type: 'CHANGE_NAME',
        name
    }
}

export const changeAge = (type) => {
    return {
        type: type === "+" ? 'ADD_AGE' : 'SUB_AGE'
    }
}