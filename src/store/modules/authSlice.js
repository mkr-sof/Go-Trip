import { createSlice } from '@reduxjs/toolkit';
import { getCurrentUser } from "services/authService";
import { getDataFromLocalStorage, saveDataToLocalStorage } from "services/storageService";

const initialUsers = getDataFromLocalStorage("users") || [];

const initialState = {
    user: getCurrentUser() || null,
    users: initialUsers,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setProfile: (state, action) => {
            console.log("setProfile action payload:", action.payload); // Debugging log
            state.user = action.payload;
            const existingUsers = state.users.map(user =>
                user.id === action.payload.id ? action.payload : user
            );
            state.users = existingUsers.some(user => user.id === action.payload.id)
                ? existingUsers
                : [...existingUsers, action.payload];

            console.log("Updated users list:", state.users); // Debugging log
            saveDataToLocalStorage("users", state.users);
            saveDataToLocalStorage("profile", state.user);
        },
        logout: (state) => {
            state.user = null;
            saveDataToLocalStorage("profile", null);
        },
        setUsers: (state, action) => {
            state.users = action.payload;
            saveDataToLocalStorage("users", state.users);
        },
    },
});

export const { setProfile, logout, setUsers } = authSlice.actions;
export default authSlice.reducer;