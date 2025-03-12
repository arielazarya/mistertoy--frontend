export function setUser(user) {
    return (dispatch) => {
        dispatch({ type: 'SET_USER', user })
    }
}

export function updateBalance(balance) {
    return (dispatch) => {
        dispatch({ type: 'UPDATE_BALANCE', balance })
    }
}