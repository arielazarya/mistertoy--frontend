import '../assets/cmps/ToyEdit.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveToy } from '../store/actions/toyActions';

export function ToyEdit() {
    const { toyId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toyFromStore = useSelector(state =>
        state.toyModule.toys.find(toy => toy._id === toyId)
    );

    const [toy, setToy] = useState(toyFromStore || { name: '', price: 0, inStock: true });
    const [error, setError] = useState('');

    useEffect(() => {
        if (toyId && !toyFromStore) {
            console.log('❌ Toy not found in store, redirecting...');
            navigate('/');
        }
    }, [toyId, toyFromStore, navigate]);

    function handleChange({ target }) {
        const field = target.name;
        let value = target.type === 'number' ? +target.value : target.value;

        if (field === 'price' && (isNaN(value) || value < 0)) {
            setError('⚠️ Price must be a valid number and not negative.');
        } else {
            setError('');
        }

        if (field === 'inStock') value = target.checked; 

        setToy(prevToy => ({ ...prevToy, [field]: value }));
    }

    function onSaveToy() {
        if (!toy.name.trim()) {
            setError('⚠️ Name cannot be empty.');
            console.log('❌ Error: Name cannot be empty.');
            return;
        }
        if (isNaN(toy.price) || toy.price < 0) {
            setError('⚠️ Price must be a valid number and not negative.');
            console.log('❌ Error: Invalid price.');
            return;
        }

        console.log('💾 Saving toy:', toy);
        dispatch(saveToy(toy));
        navigate('/');
    }

    return (
        <section className="toy-edit">
            <h1>{toyId ? 'Edit Toy' : 'Add Toy'}</h1>
            {error && <p className="error-msg">{error}</p>}
            
            <input type="text" name="name" value={toy.name} onChange={handleChange} placeholder="Toy name" />
            <input type="number" name="price" value={toy.price} onChange={handleChange} placeholder="Toy price" />
            
            {/* 🔹 שדה בחירה אם הצעצוע במלאי או לא */}
            <label>
                <input type="checkbox" name="inStock" checked={toy.inStock} onChange={handleChange} />
                In Stock
            </label>

            <button onClick={onSaveToy}>Save</button>

            {/* 🔹 כפתור חזרה לרשימת הצעצועים */}
            <button className="back-btn" onClick={() => navigate('/')}>🔙 Back to List</button>
        </section>
    );
}