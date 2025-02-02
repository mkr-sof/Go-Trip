import { saveDataToLocalStorage, getDataFromLocalStorage, removeDataFromLocalStorage } from 'services/storageService';

export const isUserLoggedIn = () => {
    return getDataFromLocalStorage("user") !== null;
}

export const loginUser = (userData) => {
    saveDataToLocalStorage("user", userData);
}

export const signupUser = (userData) => {
    saveDataToLocalStorage("users", [...getDataFromLocalStorage("users") || [], userData]);
    loginUser(userData);
}

export const logoutUser = () => {
    removeDataFromLocalStorage("user");
}