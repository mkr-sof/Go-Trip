
export const saveDataToLocalStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error("Error saving to localStorage:", error);
    }
}

export const getDataFromLocalStorage = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Error reading from localStorage:", error);
        return null;
    }
}

export const removeDataFromLocalStorage = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error("Error removing from localStorage:", error);
    }
}