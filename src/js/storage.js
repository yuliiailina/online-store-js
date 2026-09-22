export function getFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data? JSON.parse(data) : [];
    } catch(error) {
        console.log(error);
        return [];
    }
}

export function saveToStorage(key, id) {
    const data = getFromStorage(key);
    data.push(id);

    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch {
        console.log(error);
        return null;
    }
}

export function checkLocalStorage(key, id) {
    const data = getFromStorage(key);
    return data.includes(id);
}

export function removeFromStorage(key, id) {
    const data = getFromStorage(key);
    const filteredData = data.filter(item => item !== id);
    localStorage.setItem(key, JSON.stringify(filteredData));
}