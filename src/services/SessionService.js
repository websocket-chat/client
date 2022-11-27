import ApiClient from "@/clients/ApiClient";

export default {
  login(username, password) {
    return ApiClient({
      method: "POST",
      url: `/v1/sessions`,
      data: {
        username: username,
        password: password,
      },
    });
  },
};
