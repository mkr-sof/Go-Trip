import { getDataFromLocalStorage, saveDataToLocalStorage } from 'services/storageService';

export const toggleFavorite = (postId) => {
    const favorites = getDataFromLocalStorage("favorites") || [];
    if(favorites.includes(postId)){
        saveDataToLocalStorage("favorites", favorites.filter(id => id !== postId));   
    }else{
        saveDataToLocalStorage("favorites", [...favorites, postId]);
    }
}

export const getFavorites = () => {
    return getDataFromLocalStorage("favorites") || [];
}