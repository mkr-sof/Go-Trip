import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPosts } from "services/postService";
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
// export const createPost = createAsyncThunk(
//     "posts/createPost",
//     async(postData, { getState }) => {
//         console.log("Action dispatched:", 444444);
//         const state = getState();
//         const existingPosts = state?.posts?.posts;
//         const updatedPosts = [postData, ...existingPosts];
//         saveDataToLocalStorage("allPosts", updatedPosts);
//         return updatedPosts;
//     }
// );


const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts: (state, action) => {
            console.log("Action dispatched:", action);
            state.posts = action.payload;
            state.filteredPosts = action.payload;
        },
        updatePost: (state, action) => {
            const updatedPost = action.payload;
            state.posts = state.posts.map(post =>
                post.id === updatedPost.id ? { ...post, ...updatedPost }  : post
            );
            state.filteredPosts = [...state.posts];
            saveDataToLocalStorage("allPosts", state.posts);
        },
        createPost: (state, action) => {
            const newPost = action.payload;
            state.posts.unshift(newPost); 
            state.filteredPosts = [...state.posts];
            saveDataToLocalStorage("allPosts", state.posts);
        },
        filterPosts: (state, action) => {
            const { filter, sortOrder, userId, category } = action.payload;
            state.filter = filter; 
            state.sortOrder = sortOrder; 
            console.log("Filter parameters:", { filter, sortOrder, userId }); // Debugging log
            let filtered = state.posts;
            if (filter === "favorites") {
                filtered = state.posts.filter(post => state.favorites.includes(post.id));
            }
            if (category) {
                console.log("Category filter applied:", category);
                filtered = filtered.filter(post => {
                    const postCategory = post.category?.toLowerCase().replace(/\s+/g, '-');
                    const categoryToCheck = category.toLowerCase().replace(/\s+/g, '-');
                    console.log(`Comparing post category: ${postCategory} with category: ${categoryToCheck}`);
                    return postCategory === categoryToCheck;
                });
            }

            // state.filteredPosts = filtered.sort((a, b) => {
            //     return sortOrder === "newest"
            //         ? new Date(b.created_at) - new Date(a.created_at)
            //         : new Date(a.created_at) - new Date(b.created_at);
            // });
            state.filteredPosts = filtered.sort((a, b) => {
                const aDate = sortOrder === "newest" ? new Date(b.updated_at || b.created_at) : new Date(a.updated_at || a.created_at);
                const bDate = sortOrder === "newest" ? new Date(a.updated_at || a.created_at) : new Date(b.updated_at || b.created_at);
                return aDate - bDate;
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
            
            if (state.filter === "favorites") {
                state.filteredPosts = state.posts.filter(post => state.favorites.includes(post.id));
            }
        },
        // setScrollUp: (state, action) => {
        //     state.showScrollUp = action.payload;
        // },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(createPost.fulfilled, (state, action) => {
    //         const updatedPosts = action.payload;
    //         state.posts.push(updatedPosts); 
    //         state.filteredPosts = [...updatedPosts];
    //         console.log("Post created:", updatedPosts[0]); 
    //     });
    // }
});

export const { setPosts, filterPosts, createPost, toggleFavorite, updatePost } = postsSlice.actions;

export const fetchPosts = () => async (dispatch) => {
    try {
        const data = await getAllPosts();
        dispatch(setPosts(data));
    } catch (error) {
        console.error("Failed to fetch posts:", error);
    }
};



export default postsSlice.reducer;