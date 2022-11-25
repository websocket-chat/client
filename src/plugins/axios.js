"use strict";
import axios from "axios";

let config = {
    withCredentials: true,
    headers: {
        Accept: "application/json",
    },
};
const _axios = axios.create(config);

Plugin.install = function (Vue) {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios;
            },
        },
        $axios: {
            get() {
                return _axios;
            },
        },
    });
};
export default Plugin;