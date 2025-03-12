import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ToyList } from '../cmps/ToyList'
import { loadToys, removeToy, setFilter } from '../store/actions/toyActions'
import '../assets/cmps/ToyIndex.css';

export function ToyIndex() {
    const toys = useSelector(state => state.toyModule.toys)
    const filterBy = useSelector(state => state.toyModule.filterBy)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        console.log('📢 Fetching toys with filter:', filterBy)
        dispatch(loadToys()) 
    }, [filterBy, dispatch])

    function onDeleteToy(toyId) {
        console.log('🗑 Deleting toy:', toyId)
        dispatch(removeToy(toyId))
    }

    function handleFilterChange({ target }) {
        const field = target.name
        const value = target.value
        dispatch(setFilter({ ...filterBy, [field]: value }))
    }

    return (
        <section className="toy-index">
            <div className="filter-container">
                <input type="text" name="name" value={filterBy.name || ''} onChange={handleFilterChange} placeholder="Search by name"/>
                <input type="number" name="minPrice" value={filterBy.minPrice || ''} onChange={handleFilterChange} placeholder="Min price"/>
                <input type="number" name="maxPrice" value={filterBy.maxPrice || ''} onChange={handleFilterChange} placeholder="Max price"/>
                
                {/* 🔹 סינון לפי זמינות במלאי */}
                <select name="inStock" value={filterBy.inStock || 'all'} onChange={handleFilterChange}>
                    <option value="all">All</option>
                    <option value="true">In Stock</option>
                    <option value="false">Out of Stock</option>
                </select>
            </div>
            
            <button className="add-toy-btn" onClick={() => navigate('/edit')}>➕ Add New Toy</button>
            <ToyList toys={toys} onDeleteToy={onDeleteToy} />
        </section>
    )
}
