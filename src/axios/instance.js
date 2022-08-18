import axios from "axios";
const isDev = true;

const url = process.env.REACT_APP_SERVER_URL;

const instance = axios.create({
    baseURL: url,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    withCredentials: true
});

export const checkAuthenticated = (token) => instance.get("/authenticate",{
    headers: {
        "x-auth-token" : token
    }
});
export const loginUser = (data) => instance.post("/login", data); 
export const logoutUser = () => instance.get("/logout");
export const signupUser = (data) => instance.post("/register", data);
export const saveNewPassword = (data, token) => instance.post("/addnewpassword", data, {
    headers: {
        "x-auth-token": token 
    }
});
export const deleteAPassword = (id, token) => instance.post("/deletepassword", id, {
    headers: {
        "x-auth-token": token
    }
});
export const decryptThePass = (data) => instance.post("/decrypt", data);