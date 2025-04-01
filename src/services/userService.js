import { getDataFromLocalStorage } from "services/storageService";
export const getCurrentUser = () => {
    const user = getDataFromLocalStorage("profile"); 
    if (user) {
        return user;
    }else{
      const sessionUser = sessionStorage.getItem("profile");
    return sessionUser ? JSON.parse(sessionUser) : null;  
    }
    
};

export const getUsers = () => {
    return getDataFromLocalStorage("users") || [];
}