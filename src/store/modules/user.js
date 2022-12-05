const user = {
    namespaced: true,
    state: () => ({
        user: {
            session_id: "",
            account_id: 0,
            user_agent: "",
            created_at: "",
            updated_at: "",
        },
        authenticated: false,
    }),
    mutations: {
        setUserData(state, user) {
            state.user = Object.assign({}, user);
        },
        setAuthenticated(state, auth) {
            state.authenticated = auth;
        }
    },
    getters: {
        userInfo(state) {
            return state.user;
        },
        sessionID(state) {
            return state.user.session_id;
        },
        userID(state) {
            return state.user.account_id;
        },
        checkAuthentication(state) {
            return state.authenticated;
        },
    },
    actions: {
        setUserData({commit}, user) {
            commit("setUserData", user);
        },
        setAuthenticated({commit}, auth) {
            commit("setAuthenticated", auth);
        }
    },
};

export default user;
