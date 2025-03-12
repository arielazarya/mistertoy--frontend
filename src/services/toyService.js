import bazz from '../assets/img/bazz3.jpeg'

const TOY_KEY = 'toys_db';

export const toyService = {
    query,
    getById,
    save,
    remove
};

// 🔹 פונקציה שמביאה את רשימת הצעצועים עם אפשרות לפילטור
function query(filterBy = { name: '', minPrice: '', maxPrice: '', inStock: 'all' }) {
    let toys = loadFromStorage(TOY_KEY);

    if (!toys || !toys.length) {
        toys = _createDefaultToys();
        saveToStorage(TOY_KEY, toys);
    }

    if (filterBy.name) {
        toys = toys.filter(toy => toy.name.toLowerCase().includes(filterBy.name.toLowerCase()));
    }

    if (filterBy.minPrice) {
        toys = toys.filter(toy => toy.price >= filterBy.minPrice);
    }

    if (filterBy.maxPrice) {
        toys = toys.filter(toy => toy.price <= filterBy.maxPrice);
    }

    if (filterBy.inStock !== 'all') {
        const inStock = filterBy.inStock === 'true';
        toys = toys.filter(toy => toy.inStock === inStock);
    }

    return Promise.resolve(toys);
}

// 🔹 שליפת צעצוע לפי מזהה
function getById(toyId) {
    const toys = loadFromStorage(TOY_KEY) || [];
    const toy = toys.find(toy => toy._id === toyId);
    return Promise.resolve(toy);
}

// 🔹 שמירה או עדכון של צעצוע
function save(toy) {
    let toys = loadFromStorage(TOY_KEY) || [];

    if (toy._id) {
        toys = toys.map(t => (t._id === toy._id ? toy : t));
    } else {
        toy._id = _makeId();
        toy.imgUrl = toy.imgUrl || 'https://via.placeholder.com/150'; // תמונת ברירת מחדל
        toys.push(toy);
    }

    saveToStorage(TOY_KEY, toys);
    return Promise.resolve(toy);
}

// 🔹 מחיקת צעצוע
function remove(toyId) {
    let toys = loadFromStorage(TOY_KEY) || [];
    toys = toys.filter(toy => toy._id !== toyId);
    saveToStorage(TOY_KEY, toys);
    return Promise.resolve();
}

// 🔹 יצירת 2 צעצועים ברירת מחדל במקרה שאין נתונים
function _createDefaultToys() {
    return [
        {
            _id: _makeId(),
            name: 'Teddy Bear',
            price: 20,
            labels: ['Soft', 'Cuddly'],
            inStock: true,
            imgUrl: 'https://i1.sndcdn.com/artworks-000208578302-w733zd-t500x500.jpg'
        },
        {
            _id: _makeId(),
            name: 'Toy Car',
            price: 15,
            labels: ['Fast', 'Durable'],
            inStock: false,
            imgUrl: 'https://i1.sndcdn.com/artworks-000208578302-w733zd-t500x500.jpg'
        }
    ];
}

// 🔹 פונקציה ליצירת מזהה ייחודי
function _makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

// 🔹 פונקציות לניהול Local Storage
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key) {
    let data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}