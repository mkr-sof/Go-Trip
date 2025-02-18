import { saveDataToLocalStorage, getDataFromLocalStorage } from 'services/storageService';

export const createPost = (post) => {
    const allPosts = getDataFromLocalStorage("allPosts") || [];
    const updatedPosts = [...allPosts, post];
    saveDataToLocalStorage("allPosts", updatedPosts);
    return updatedPosts;
}

export const getAllPosts = () => {
    return getDataFromLocalStorage("allPosts") || [];
}

export const updatePost = (postId, updatedData) => {
    let allPosts = getDataFromLocalStorage("allPosts") || [];
    allPosts = allPosts.map(post => 
        post.id === postId ? {...post, ...updatedData} : post
    )
    saveDataToLocalStorage("allPosts", allPosts);
}

export const removePost = (postId) => {
    let allPosts = getDataFromLocalStorage("allPosts") || [];
    allPosts = allPosts.filter(post => post.id !== postId);
    saveDataToLocalStorage("allPosts", allPosts);
}