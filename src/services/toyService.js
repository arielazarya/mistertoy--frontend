const STORAGE_KEY = 'toysDB';

export const toyService = {
    query,
    getById,
    save,
    remove
};

function query() {
    let toys = JSON.parse(localStorage.getItem(STORAGE_KEY)) || _createDefaultToys();
    return Promise.resolve(toys);
}

function getById(toyId) {
    const toys = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const toy = toys.find(toy => toy._id === toyId);
    return Promise.resolve(toy);
}

function save(toy) {
    let toys = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const defaultImgUrl = 'https://www.artdepot.co.il/3141-thickbox_default/%D7%932-%D7%9E%D7%93%D7%91%D7%A7%D7%94-%D7%A2%D7%A0%D7%A7%D7%99%D7%AA-%D7%96%D7%95%D7%94%D7%A8%D7%AA-%D7%91%D7%97%D7%A9%D7%99%D7%9B%D7%94-%D7%A9%D7%9C-%D7%91%D7%90%D7%96-%D7%A9%D7%A0%D7%95%D7%AA-%D7%90%D7%95%D7%A8.jpg';

    if (toy._id) {
        const idx = toys.findIndex(t => t._id === toy._id);
        toys[idx] = { ...toy, imgUrl: toy.imgUrl || defaultImgUrl };
    } else {
        toy._id = _makeId();
        toy.imgUrl = defaultImgUrl;
        toys.push(toy);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(toys));
    return Promise.resolve(toy);
}

function remove(toyId) {
    let toys = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    toys = toys.filter(toy => toy._id !== toyId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toys));
    return Promise.resolve();
}
function _createDefaultToys() {
    const defaultImgUrl = 'https://www.artdepot.co.il/3141-thickbox_default/%D7%932-%D7%9E%D7%93%D7%91%D7%A7%D7%94-%D7%A2%D7%A0%D7%A7%D7%99%D7%AA-%D7%96%D7%95%D7%94%D7%A8%D7%AA-%D7%91%D7%97%D7%A9%D7%99%D7%9B%D7%94-%D7%A9%D7%9C-%D7%91%D7%90%D7%96-%D7%A9%D7%A0%D7%95%D7%AA-%D7%90%D7%95%D7%A8.jpg'; // תמונת צעצוע ברירת מחדל

    const toys = [
        { _id: 't101', name: 'Talking Doll', price: 50, labels: ['Doll'], inStock: true, imgUrl: defaultImgUrl },
        { _id: 't102', name: 'RC Car', price: 100, labels: ['On wheels', 'Battery Powered'], inStock: false, imgUrl: defaultImgUrl }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toys));
    return toys;
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}