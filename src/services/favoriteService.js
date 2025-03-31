import { getDataFromLocalStorage, saveDataToLocalStorage } from 'services/storageService';

export const toggleFavorite = (postId) => {
    const favorites = getFavorites();
    let updatedFavorites;

    if (favorites.includes(postId)) {
        updatedFavorites = favorites.filter(id => id !== postId); 
    } else {
        updatedFavorites = [...favorites, postId]; 
    }

    saveDataToLocalStorage("favorites", updatedFavorites);
}

export const getFavorites = () => {
    return getDataFromLocalStorage("favorites") || [];
}