import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://chat.cmyui.xyz",
    withCredentials: false,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
});

export default apiClient;