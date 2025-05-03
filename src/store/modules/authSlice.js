import { createSlice } from '@reduxjs/toolkit';
import { getCurrentUser } from "services/userService";
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
            const rememberMe = action.payload?.rememberMe;

            if (rememberMe) {
                saveDataToLocalStorage("profile", state.user);
            } else {
                sessionStorage.setItem("profile", JSON.stringify(state.user));
            }
            if(action.payload){
            state.users = state.users.filter(user => user.id !== action.payload.id);
            state.users.push(action.payload);

            saveDataToLocalStorage("users", state.users);
            }
        },
        logout: (state) => {
            state.user = null;
            state.users = getDataFromLocalStorage("users") || [];
            removeDataFromLocalStorage("profile");
            sessionStorage.removeItem("profile");
        },
        setAvatar: (state, action) => {
            if (state.user) {
                state.user.avatar = action.payload;
                saveDataToLocalStorage("profile", state.user);
            }
        },
        setUsers: (state, action) => {
            const users = action.payload;
            state.users = users;
            saveDataToLocalStorage("users", users);
        },
    },
});

export const { setProfile, logout, setAvatar, setUsers } = authSlice.actions;
export default authSlice.reducer;