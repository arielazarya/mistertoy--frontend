import { toyService } from '../../services/toyService'

export function loadToys() {
    return async (dispatch) => {
        try {
            const toys = await toyService.query()
            console.log('✅ Toys loaded from service:', toys)
            dispatch({ type: 'SET_TOYS', toys })
        } catch (err) {
            console.error('❌ Cannot load toys', err)
        }
    }
}

export function removeToy(toyId) {
    return async (dispatch) => {
        try {
            await toyService.remove(toyId)
            dispatch({ type: 'REMOVE_TOY', toyId })
        } catch (err) {
            console.error('❌ Cannot remove toy', err)
        }
    }
}

export function saveToy(toy) {
    return async (dispatch) => {
        try {
            const savedToy = await toyService.save(toy)
            if (toy._id) {
                dispatch({ type: 'UPDATE_TOY', toy: savedToy })
            } else {
                dispatch({ type: 'ADD_TOY', toy: savedToy })
            }
        } catch (err) {
            console.error('❌ Cannot save toy', err)
        }
    }
}

export function setFilter(filterBy) {
    return (dispatch) => {
        dispatch({ type: 'SET_FILTER', filterBy })
    }
}