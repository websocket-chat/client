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
    setUserData(user) {
      this.user = Object.assign({}, user);
    },
  },
  getters: {
    userInfo(user) {
      return user;
    },
  },
};
