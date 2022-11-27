const user = {
  state: () => ({
    user: {
      session_id: "",
      account_id: 0,
      user_agent: "",
      created_at: "",
      updated_at: "",
    },
  }),
  mutations: {
    setUserData(state, user) {
      state.user = Object.assign({}, user.data);
    },
  },
  getters: {
    userInfo(state) {
      return state.user;
    },
  },
};

export default user;
