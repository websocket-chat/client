import axios from 'axios';

const apiClient = axios.create({
    baseURL: "https://chat.cmyui.xyz",
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

export default {
    create(user) {
       return apiClient({
           method: "POST",
           url: "/v1/accounts",
           data: {
               username: user.username,
               email_address: user.email,
               password: user.password
           }
       });
    }
}
