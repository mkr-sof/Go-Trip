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

export const signupUser = async (userData) => {
    try {
    const {name, email, password} = userData;
    const users = getUsers();

    const existingUser = users.find(user => user.email === email);

    if(existingUser){
        return {success: false, message: "User alredy existing!"};
    }
    const newUser = { name, email, password };
    saveDataToLocalStorage("users", [...users, newUser]);
    await loginUser(newUser);
    console.log(newUser)
    return { success: true };
} catch (error) {
    return { success: false, message: "Something went wrong!" };
}
}

export const loginUser = async (userData) => {
try{
    const {email, password} = userData;
    const users = getUsers();
    const user = users.find(user => user.email === email);
    
    if(!user){
        return {success: false, message: "You are not registered yet!"};
    }

    if(user.password !== password){
        return {success: false, message: "Invalid email or password"};
    }

    saveDataToLocalStorage("user", user);

    return {success: true};
}catch(error){
    return {success: false, message: "Something went wrong!"}
}
}

export const resetPassword = async (email) => {
    const users = getDataFromLocalStorage("users") || [];
    const user = users.find(user => user.email === email);
    if(!user){
        return {success: false, message: "User not found."};
    }
    return {success: true, message: "Password reset instructions have been sent to your email."};
}

export const logoutUser = async () => {
    removeDataFromLocalStorage("user");
}