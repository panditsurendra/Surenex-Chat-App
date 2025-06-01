import axios from "axios";

// export const url = "https://quick-chat-app-rql3.onrender.com";
export const url = "http://localhost:4000";

export const axiosInstance = axios.create({
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
    }
});