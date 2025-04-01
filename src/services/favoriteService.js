import { getDataFromLocalStorage, saveDataToLocalStorage } from 'services/storageService';

export const getFavorites = () => {
    return getDataFromLocalStorage("favorites") || [];
}

// export const toggleFavorite = async (postId) => {
//     const favorites = await getFavorites();
//     let updatedFavorites;

//     if (favorites.includes(postId)) {
//         updatedFavorites = favorites.filter(id => id !== postId); 
//     } else {
//         updatedFavorites = [...favorites, postId]; 
//     }

//     saveDataToLocalStorage("favorites", updatedFavorites);

//     return updatedFavorites;
// }

