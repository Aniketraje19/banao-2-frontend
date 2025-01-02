import Axios from "../AxiosInstance";

const getAllPosts = async () =>{
    try{
        const res = await Axios.get("/posts/");
        return res.data
    }catch(err){
        console.error("Error fetching all posts!",err)
    }
}


const getPostById = async (id) => {
    try{

        const res = await Axios.get(`/posts/${id}`);
        return res.data

    }catch(err){
        if (err.response) {
            throw new Error(err.response.data.message || "An error occurred during getPostById");
        } else if (err.request) {
            throw new Error("No response from server");
        } else {
            throw new Error(err.message || "An unknown error occurred");
        }
    }
}

const addComment = async (id,text) => {
    try{

        const res = await Axios.post(`/posts/${id}/comment`,{text})
        return res.data
        
    }catch(err){
        if (err.response) {
            throw new Error(err.response.data.message || "An error occurred during addCOmmet");
        } else if (err.request) {
            throw new Error("No response from server");
        } else {
            throw new Error(err.message || "An unknown error occurred");
        }
    }
}

const toggleLike = async(id) => {
    try{

        const res = await Axios.post(`/posts/${id}/like`)
        return res.data
        
    }catch(err){
        if (err.response) {
            throw new Error(err.response.data.message || "An error occurred during toggle Like");
        } else if (err.request) {
            throw new Error("No response from server");
        } else {
            throw new Error(err.message || "An unknown error occurred");
        }
    }
}

const deletePost = async (id) => {
    
    try{

        const res = await Axios.delete(`/posts/${id}`)
        return res.data
        
    }catch(err){
        if (err.response) {
            throw new Error(err.response.data.message || "An error occurred during deletePost");
        } else if (err.request) {
            throw new Error("No response from server");
        } else {
            throw new Error(err.message || "An unknown error occurred");
        }
    }
}

const addPost = async (content) => {
    try{

        const res = await Axios.post(`/posts/`,{content})
        return res.data
        
    }catch(err){
        if (err.response) {
            throw new Error(err.response.data.message || "An error occurred during addPost");
        } else if (err.request) {
            throw new Error("No response from server");
        } else {
            throw new Error(err.message || "An unknown error occurred");
        }
    }
}

const updatePost = async (id,content) => {
    try{

        const res = await Axios.put(`/posts/${id}`,{content})
        return res.data
        
    }catch(err){
        if (err.response) {
            throw new Error(err.response.data.message || "An error occurred during updatePost");
        } else if (err.request) {
            throw new Error("No response from server");
        } else {
            throw new Error(err.message || "An unknown error occurred");
        }
    }
}

export {getAllPosts,getPostById,addComment,toggleLike,deletePost,addPost,updatePost}