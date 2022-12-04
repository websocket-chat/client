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
      state.user = Object.assign({}, user.data);
    },
    setAuthenticated(state, authenticated) {
      state.authenticated = authenticated;
    },
  },
  getters: {
    userInfo(state) {
      return state.user;
    },
    checkAuthentication(state) {
      return state.authenticated;
    },
  },
  actions: {
    setUserData({ commit }, user) {
      commit("setUserData", user);
    },
    setAuthenticated({ commit }, authenticated) {
      commit("setAuthenticated",  authenticated);
    },
  },
};

export default user;
