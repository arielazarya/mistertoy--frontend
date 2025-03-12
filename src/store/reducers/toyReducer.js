const initialState = {
    toys: [],
    filterBy: { name: '', minPrice: '', maxPrice: '', inStock: 'all', sortBy: '' }
}

export function toyReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TOYS':
            return { ...state, toys: action.toys }

        case 'REMOVE_TOY':
            return { ...state, toys: state.toys.filter(toy => toy._id !== action.toyId) }

        case 'ADD_TOY':
            return { ...state, toys: [...state.toys, action.toy] }

        case 'UPDATE_TOY':
            return {
                ...state,
                toys: state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            }

        case 'SET_FILTER':
            return { ...state, filterBy: action.filterBy }

        default:
            return state
    }
}