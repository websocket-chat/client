<template>
  <v-btn v-if="authenticated" x-small @click="logout" color="red">
    Logout
  </v-btn>
</template>

<script>
import SessionService from "@/services/SessionService";

export default {
  name: "LogoutButton",
  methods: {
    logout() {
      let user = JSON.parse(window.localStorage.getItem("user"));
      SessionService.logout(user.session_id)
          .catch((err) => {
            if (err) {
              this.$emit("snackbar", {
                text: "Something went wrong logging you out...",
                visible: true,
              })
            }
          })
          .then((res) => {
            if (!res) return;
            window.localStorage.clear();
            this.$store.dispatch("user/setUserData", {});
            this.$store.dispatch("user/setAuthenticated", false);
            this.$router.push({name: "LoginAndSignUp"});
          });
    }
  },
  computed: {
    authenticated() {
      return this.$store.getters["user/checkAuthentication"];
    }
  }
}
</script>