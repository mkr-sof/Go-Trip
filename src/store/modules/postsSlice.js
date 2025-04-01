import { createSlice } from "@reduxjs/toolkit";
import { getDataFromLocalStorage, saveDataToLocalStorage } from "services/storageService";

const initialFavorites = getDataFromLocalStorage("favorites") || [];

const initialState = {
    posts: [],
    filteredPosts: [],
    favorites: initialFavorites,
    showScrollUp: false,
    filter: "all",
    sortOrder: "newest", 
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
            state.filteredPosts = action.payload;
        },
        filterPosts: (state, action) => {
            const { filter, sortOrder, userId } = action.payload;
            state.filter = filter; 
            state.sortOrder = sortOrder; 
            console.log("Filter parameters:", { filter, sortOrder, userId }); // Debugging log
            let filtered = state.posts;
            if (filter === "favorites") {
                filtered = state.posts.filter(post => post.isFavorite && post.authorId === userId);
            }

            state.filteredPosts = filtered.sort((a, b) => {
                return sortOrder === "newest"
                    ? new Date(b.created_at) - new Date(a.created_at)
                    : new Date(a.created_at) - new Date(b.created_at);
            });
            console.log("Filtered posts:", state.filteredPosts); // Debugging log
        },
        toggleFavorite: (state, action) => {
            const postId = action.payload;
            if (state.favorites.includes(postId)) {
                state.favorites = state.favorites.filter(id => id !== postId);
            } else {
                state.favorites.push(postId);
            }
            saveDataToLocalStorage("favorites", state.favorites); 
        },
        setScrollUp: (state, action) => {
            state.showScrollUp = action.payload;
        },
    },
});

export const { setPosts, filterPosts, toggleFavorite } = postsSlice.actions;
export default postsSlice.reducer;