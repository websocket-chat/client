<template>
  <v-card flat height="auto" width="90%" class="mx-auto">
    <form class="">
      <v-container fluid fill-height>
        <v-row dense no-gutters>
          <v-col cols="12">
            <v-text-field
              v-model="username"
              :error-messages="usernameErrors"
              solo
              outlined
              append-icon="mdi-account"
              label="Username"
              class="form__input"
              clearable
              clear-icon="mdi-close-circle-outline"
              @input="$v.username.$touch()"
              @blur="$v.username.$touch()"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="password"
              :error-messages="passwordErrors"
              solo
              outlined
              class="form__input"
              label="Password"
              append-icon="mdi-lock"
              clearable
              clear-icon="mdi-close-circle-outline"
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
            />
          </v-col>
          <v-col cols="12"></v-col>
        </v-row>
      </v-container>
    </form>
    <v-card flat tile class="d-flex justify-end ma-2">
      <v-btn @click="clearLoginForm" text outlined color="error" class="ma-1">
        Clear
      </v-btn>
      <v-btn @click="loginUser" text outlined color="accent" class="ma-1">
        Login
      </v-btn>
    </v-card>
  </v-card>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import SessionService from "@/services/SessionService";

export default {
  name: "LoginForm",
  validations() {
    return {
      username: {
        required,
      },
      password: {
        required,
      },
    };
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    toggleLoadingState(turnOn) {
      turnOn ? this.$emit("loading", true) : this.$emit("loading", false);
    },
    determineSnackbarMessage(response) {
      switch (response) {
        case "ServiceError.SESSIONS_NOT_FOUND":
          return "Session Not Found!";
        case "ServiceError.CREDENTIALS_INCORRECT":
          return "Wrong Username or Password!";
        default:
          return "";
      }
    },
    loginUser() {
      this.toggleLoadingState(true);
      this.$v.$touch();
      SessionService.login(this.username, this.password)
        .catch((error) => {
          const snackbarText = this.determineSnackbarMessage(
            error.response.data.error
          );
          this.$emit("snackbar", {
            text: snackbarText,
            color: "error",
          });
        })
        .then((res) => {
          if (!res) return;

          this.$store.dispatch("user/dispatchSetUserData", res.data);
          this.$store.dispatch("user/dispatchSetAuthenticated", true);

          this.$emit("snackbar", {
            text: "Success! 🎉",
            color: "success",
          });
        })
        .finally(() => {
          this.toggleLoadingState(false);
          this.$router.push({ name: "Messenger" });
        });
    },
    clearLoginForm() {
      this.username = "";
      this.password = "";
      this.$v.$reset();
    },
  },
  computed: {
    usernameErrors() {
      const errors = [];

      if (!this.$v.username.$dirty) return errors;

      !this.$v.username.required && errors.push("Username is required!");

      return errors;
    },
    passwordErrors() {
      const errors = [];

      if (!this.$v.password.$dirty) return errors;

      !this.$v.password.required && errors.push("Password required!");

      return errors;
    },
  },
};
</script>

<style scoped></style>
