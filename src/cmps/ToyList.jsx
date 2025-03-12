import '../assets/cmps/ToyList.css'
import { useSelector } from 'react-redux'
import { ToyPreview } from './ToyPreview'

export function ToyList({ onDeleteToy }) {
    const toys = useSelector(state => state.toyModule.toys)

    console.log('📢 Rendering ToyList - Toys:', toys)

    if (!toys.length) return <p>No toys to show...</p>

    return (
        <section className="toy-list">
            {toys.map(toy => (
                <ToyPreview key={toy._id} toy={toy} onDeleteToy={onDeleteToy} />
            ))}
        </section>
    )
}