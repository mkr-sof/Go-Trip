import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./modules/postsSlice";
import authReducer from "./modules/authSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: false,
        }),
});
export default store;