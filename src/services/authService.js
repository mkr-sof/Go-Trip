import { saveDataToLocalStorage, getDataFromLocalStorage, removeDataFromLocalStorage } from 'services/storageService';

export const isUserLoggedIn = () => {
    return getDataFromLocalStorage("user") !== null;
}

export const getCurrentUser = () => {
    return getDataFromLocalStorage("user");
}

export const getUsers = () => {
    return getDataFromLocalStorage("users") || [];
}

export const signupUser = (userData) => {
    const {email, password} = userData;
    const users = getUsers();
    const existingUser = users.find(user => user.email === userData.email);

    if(existingUser){
        throw new Error("User alredy existing!");
    }

    saveDataToLocalStorage("users", [...users || [], userData]);
    loginUser(userData);
}

export const loginUser = (userData) => {
    const {email, password} = userData;
    const users = getUsers();
    const user = users.find(user => user.email === email);
    
    if(!user){
        throw new Error("You are not registered yet!")
    }

    if(!user.password === password){
        throw new Error("Invalid email or password")
    }

    saveDataToLocalStorage("user", userData);
}

export const resetPassword = (email) => {
    const users = getDataFromLocalStorage("Users") || [];
    const user = users.find(user => user.email === email);
    if(!user){
        throw new Error("User not found.");
    }
    return "Password reset instructions have been sent to your email.";
}

export const logoutUser = () => {
    removeDataFromLocalStorage("user");
}