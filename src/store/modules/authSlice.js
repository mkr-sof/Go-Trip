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
            if (action.payload) {
                state.users = state.users.filter(user => user.id !== action.payload.id);
                state.users.push(action.payload);

                saveDataToLocalStorage("users", state.users);
            }
        },
        updateUserPassword: (state, action) => {
            const { email, newPassword } = action.payload;

            const userIndex = state.users.findIndex(user => user.email === email);
            if (userIndex !== -1) {
                state.users[userIndex].password = newPassword;
            }

            if (state.user && state.user.email === email) {
                state.user.password = newPassword;
            }

            saveDataToLocalStorage("users", state.users);

            if (state.user) {
                const rememberMe = state.user.rememberMe;
                if (rememberMe) {
                    saveDataToLocalStorage("profile", state.user);
                } else {
                    sessionStorage.setItem("profile", JSON.stringify(state.user));
                }
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
            state.users = action.payload;
            saveDataToLocalStorage("users", state.users);
        },
    },
});

export const { setProfile, logout, setAvatar, setUsers, updateUserPassword } = authSlice.actions;
export default authSlice.reducer;