import axios from "axios";

const REACT_APP_API_URL = "https://social-media-app-backend-api.vercel.app/api";
// const REACT_APP_API_URL = "http://localhost:5000/api";

        
export const publicRequest = axios.create({
    baseURL: REACT_APP_API_URL,
});


