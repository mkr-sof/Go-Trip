import { saveDataToLocalStorage, getDataFromLocalStorage } from 'services/storageService';

export const createPost = async (post) => {
    const allPosts = await getDataFromLocalStorage("allPosts") || [];
    const updatedPosts = [...allPosts, post];
    saveDataToLocalStorage("allPosts", updatedPosts);
    return updatedPosts;
}

export const getAllPosts = async () => {
    return await getDataFromLocalStorage("allPosts") || [];
}


export const updatePost = async (postId, updatedData) => {
    let allPosts = await getDataFromLocalStorage("allPosts") || [];
    allPosts = allPosts.map(post => 
        post.id === postId ? {...post, ...updatedData} : post
    )
    saveDataToLocalStorage("allPosts", allPosts);
}

export const removePost = async (postId) => {
    let allPosts = await getDataFromLocalStorage("allPosts") || [];
    allPosts = allPosts.filter(post => post.id !== postId);
    saveDataToLocalStorage("allPosts", allPosts);
    return allPosts;
}