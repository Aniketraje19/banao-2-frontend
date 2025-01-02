import Axios from "../AxiosInstance";


const register = async (data) => {
    try{
        const res = await Axios.post("/user/register",data)
        return res.data
    }catch(err){
        if (err.response) {
            throw new Error(err.response.data.message || "An error occurred during register");
        } else if (err.request) {
            throw new Error("No response from server");
        } else {
            throw new Error(err.message || "An unknown error occurred");
        }
    }
}


const login = async (data) => {
    try {
        const res = await Axios.post("/user/login", data);
        return res.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message || "An error occurred during login");
        } else if (err.request) {
            throw new Error("No response from server");
        } else {
            throw new Error(err.message || "An unknown error occurred");
        }
    }
};

export { login,register };
