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
    return (
        <section className="toy-index">
            <div className='title'>
            <button className="add-toy-btn" onClick={() => navigate('/edit')}>➕ Add New Toy</button>
            </div>
            <ToyList toys={toys} onDeleteToy={onDeleteToy} />
        </section>
    )
}