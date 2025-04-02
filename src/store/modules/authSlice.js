import { createSlice } from '@reduxjs/toolkit';
import { getCurrentUser, getUsers } from "services/userService";
import { getDataFromLocalStorage, saveDataToLocalStorage, removeDataFromLocalStorage } from "services/storageService";

const initialUsers = getDataFromLocalStorage("users") || [];

const initialState = {
    user: getDataFromLocalStorage("profile") || null,
    users: initialUsers,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setProfile: (state, action) => {
            const user = action.payload ? action.payload : getCurrentUser();
            state.user = user;

            if(action.payload){
            state.users = state.users.filter(user => user.id !== action.payload.id);
            state.users.push(action.payload);

            saveDataToLocalStorage("users", state.users);
            saveDataToLocalStorage("profile", state.user);
            }
        },
        logout: (state) => {
            state.user = null;
            state.users = getDataFromLocalStorage("users") || [];
            removeDataFromLocalStorage("profile");
            sessionStorage.removeItem("profile");
        },
        // setUsers: (state, action) => {
        //     state.users = action.payload;
        //     saveDataToLocalStorage("users", state.users);
        // },
    },
});

export const { setProfile, logout, setUsers } = authSlice.actions;
export default authSlice.reducer;