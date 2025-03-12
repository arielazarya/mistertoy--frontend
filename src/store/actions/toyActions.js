import { toyService } from '../../services/toyService';

export function loadToys() {
    return async (dispatch, getState) => {
        try {
            const { filterBy } = getState().toyModule
            console.log('📢 Fetching toys with filter:', filterBy)

            let toys = await toyService.query()

            // 🔹 סינון לפי שם
            if (filterBy.name) {
                toys = toys.filter(toy => toy.name.toLowerCase().includes(filterBy.name.toLowerCase()))
            }

            // 🔹 סינון לפי מחיר
            if (filterBy.minPrice) {
                toys = toys.filter(toy => toy.price >= +filterBy.minPrice)
            }
            if (filterBy.maxPrice) {
                toys = toys.filter(toy => toy.price <= +filterBy.maxPrice)
            }

            // 🔹 סינון לפי זמינות במלאי
            if (filterBy.inStock === 'true') {
                toys = toys.filter(toy => toy.inStock)
            } else if (filterBy.inStock === 'false') {
                toys = toys.filter(toy => !toy.inStock)
            }
            // אם inStock שווה ל- "all", הצג את הכל

            dispatch({ type: 'SET_TOYS', toys })
        } catch (err) {
            console.error('❌ Cannot load toys', err)
        }
    }
}

export function removeToy(toyId) {
    return async (dispatch) => {
        try {
            console.log('🗑 Removing toy:', toyId);
            await toyService.remove(toyId);
            dispatch({ type: 'REMOVE_TOY', toyId });
        } catch (err) {
            console.error('❌ Cannot remove toy', err);
        }
    };
}

export function saveToy(toy) {
    return async (dispatch) => {
        try {
            const toyToSave = {
                ...toy,
                imgUrl: toy.imgUrl || 'https://i1.sndcdn.com/artworks-000208578302-w733zd-t500x500.jpg' // תמונת ברירת מחדל אם אין תמונה
            };

            const savedToy = await toyService.save(toyToSave);

            dispatch({
                type: toy._id ? 'UPDATE_TOY' : 'ADD_TOY',
                toy: savedToy
            });

            console.log('✅ Toy saved:', savedToy);
        } catch (err) {
            console.error('❌ Cannot save toy', err);
        }
    };
}

export function setFilter(filterBy) {
    return (dispatch) => {
        console.log('🔍 Setting filter:', filterBy);
        dispatch({ type: 'SET_FILTER', filterBy });
    };
}