import '../assets/cmps/ToyPreview.css'
import { Link } from 'react-router-dom';

export function ToyPreview({ toy, onDeleteToy }) {
    if (!toy) return <p>❌ Error: Toy data is missing</p>;

    return (
        <li className="toy-card">
            <img src={toy.imgUrl} alt={toy.name} className="toy-img" />
            <Link to={`/toy/${toy._id}`} className="toy-link">
                <h3>{toy.name}</h3>
                <p>Price: ${toy.price}</p>
                <p>Labels: {Array.isArray(toy.labels) ? toy.labels.join(', ') : 'No labels'}</p>
                <p className={toy.inStock ? 'in-stock' : 'out-of-stock'}>
                    {toy.inStock ? '✅ In Stock' : '❌ Out of Stock'}
                </p>
            </Link>
            <div className="toy-btns">
                <Link to={`/edit/${toy._id}`} className="edit-btn">✏️ Edit</Link>
                <button className="delete-btn" onClick={() => onDeleteToy(toy._id)}>🗑 Delete</button>
            </div>
        </li>
    );
}