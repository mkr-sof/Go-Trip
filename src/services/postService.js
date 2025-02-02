import { saveDataToLocalStorage, getDataFromLocalStorage } from 'services/storageService';

export const addPost = (postData) => {
    const allPosts = getDataFromLocalStorage("allPosts") || [];
    allPosts.push(postData);
    saveDataToLocalStorage("allPosts", allPosts);
}

export const getAllPosts = () => {
    return getDataFromLocalStorage("allPosts") || [];
}

export const updatePost = (postId, updatedData) => {
    let allPosts = getDataFromLocalStorage("allPosts") || [];
    allPosts = allPosts.map(post => 
        post.id === postId ? {...post, ...updatePost} : post
    )
    saveDataToLocalStorage("allPosts", allPosts);
}

export const removePost = (postId) => {
    let allPosts = getDataFromLocalStorage("allPosts") || [];
    allPosts = allPosts.filter(post => post.id !== postId);
    saveDataToLocalStorage("allPosts", allPosts);
}