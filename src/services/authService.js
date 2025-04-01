import { saveDataToLocalStorage, removeDataFromLocalStorage } from 'services/storageService';
import { getCurrentUser, getUsers } from "services/userService"
export const signupUser = async (userData) => {
    try {
    const {name, email, password} = userData;
    const users = await getUsers();

    const existingUser = users.find(user => user.email === email);

    if(existingUser){
        return {success: false, message: "User alredy exists!"};
    }
    const newUser = { id: Date.now(), name, email, password };
    saveDataToLocalStorage("users", [...users, newUser]);
    await loginUser(newUser);
    // console.log(newUser)
    return { success: true };
} catch (error) {
    return { success: false, message: "Something went wrong!" };
}
}

export const loginUser = async (userData) => {
try{
    const {email, password, rememberMe} = userData;
    const users = await getUsers();
    const user = users.find(user => user.email === email);
    
    if(!user){
        return {success: false, message: "You are not registered yet!"};
    }

    if(user.password !== password){
        return {success: false, message: "Invalid email or password"};
    }
    if(rememberMe){
        saveDataToLocalStorage("profile", user);
    }else{
        sessionStorage.setItem("profile", JSON.stringify(user));
    }

    return {success: true};
}catch(error){
    return {success: false, message: "Something went wrong!"}
}
}

export const resetPassword = async (email) => {
    try {
    const users = await getUsers();
    const user = users.find(user => user.email === email);
    if(!user){
        return {success: false, message: "User not found."};
    }
    return {success: true, message: "Password reset instructions have been sent to your email."};
} catch (error) {
    return { success: false, message: "Something went wrong!" };
}
}

export const logoutUser = async () => {
    try {
        removeDataFromLocalStorage("profile");
        sessionStorage.removeItem("profile"); 
    } catch (error) {
        console.error("Error during logout", error);
    }
}