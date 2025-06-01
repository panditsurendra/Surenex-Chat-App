import axios from "axios";

// export const url = "https://quick-chat-app-rql3.onrender.com";
export const url = "https://surenex-chat-app-server.onrender.com";

export const axiosInstance = axios.create({
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
    }
});