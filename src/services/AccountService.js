import ApiClient from "@/clients/ApiClient";

export default {
  create(username, email, password) {
    return ApiClient({
      method: "POST",
      url: "/v1/accounts",
      data: {
        username: username,
        email_address: email,
        password: password,
      },
    });
  },
  getAccountById(id) {
    return ApiClient({
      method: "GET",
      url: `/v1/accounts/${id}`,
      data: {
        account_id: id,
      },
    });
  },
  getAccounts() {
    return ApiClient({
      method: "GET",
      url: "v1/accounts"
    })
  }
};
