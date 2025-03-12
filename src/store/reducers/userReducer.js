const initialState = {
    user: {
        name: 'Guest',
        balance: 100,
    }
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.user }

        case 'UPDATE_BALANCE':
            return { ...state, user: { ...state.user, balance: action.balance } }

        default:
            return state
    }
}