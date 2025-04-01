import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./modules/postsSlice";
import authReducer from "./modules/authSlice";
import asyncFunctionMiddleware from "./middlewares/asyncFunctionMiddleware";

const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(asyncFunctionMiddleware),
});

export default store;