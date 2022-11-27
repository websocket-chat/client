<template>
  <v-card
    tile
    flat
    dark
    height="100%"
    width="100%"
    class="d-flex justify-center align-center"
  >
    <v-card dark height="auto" width="50%" elevation="12">
      <v-tabs v-model="tab" centered dark icons-and-text>
        <v-tabs-slider />
        <v-tab> Signup </v-tab>
        <v-tab> Login </v-tab>
      </v-tabs>
      <v-tabs-items dark v-model="tab">
        <v-tab-item>
          <SignupForm />
        </v-tab-item>
        <v-tab-item>
          <LoginForm />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <Snackbar :visible="snackbar" :text="snackbarText" :color="snackbarColor" />
  </v-card>
</template>

<script>
import Snackbar from "@/components/Snackbar";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
export default {
  name: "LoginAndSignUp",
  components: { Snackbar, LoginForm, SignupForm },

  data() {
    return {
      snackbarColor: "",
      snackbarText: "",
      snackbar: false,
      tab: 0,
      login: {
        username: "",
        password: "",
      },
    };
  },

  methods: {
    determineSnackbarMessage(response) {
      switch (response) {
        case "accounts.email_address_exists":
          return "ERROR! EMAIL ALREADY EXISTS!";
        case "accounts.username_exists":
          return "ERROR! USERNAME ALREADY EXISTS!";
        case "accounts.email_address_invalid":
          return "ERROR! INVALID EMAIL!";
        case "accounts.password_invalid":
          return "ERROR! INVALID PASSWORD!";
        case "accounts.username_invalid":
          return "ERROR! INVALID USERNAME!";
        case "accounts.signup_failed":
          return "ERROR! SIGNUP HAS FAILED!";
      }
    },
  },
};
</script>

<style scoped></style>
