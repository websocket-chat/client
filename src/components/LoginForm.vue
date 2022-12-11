<template>
  <v-card flat :height="mobile ? '100%' : 'auto'" :width="formWidth" class="mx-auto">
    <form>
      <v-container fluid fill-height>
        <v-row dense no-gutters>
          <v-col cols="12">
            <v-text-field
                v-model="username"
                :error-messages="usernameErrors"
                append-icon="mdi-account"
                label="Username"
                class="form__input"
                clear-icon="mdi-close-circle-outline"
                @input="$v.username.$touch()"
                @blur="$v.username.$touch()"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
                v-model="password"
                :error-messages="passwordErrors"
                :type="visible ? 'text' : 'password'"
                class="form__input"
                label="Password"
                clear-icon="mdi-close-circle-outline"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
            >
              <template v-slot:append>
                <v-icon @click="visible = !visible">
                  {{ visible ? "mdi-eye-off" : "mdi-eye"}}
                </v-icon>
                <v-icon>
                  mdi-lock
                </v-icon>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12"></v-col>
        </v-row>
      </v-container>
    </form>
    <v-card flat tile class="d-flex justify-end ma-2">
      <v-btn @click="clearLoginForm" text outlined color="error" class="ma-1">
        Clear
      </v-btn>
      <v-btn @click="loginUser" text outlined color="success" class="ma-1">
        Login
      </v-btn>
    </v-card>
  </v-card>
</template>

<script>
import {required} from "vuelidate/lib/validators";
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
      visible: false,
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

            this.$store.dispatch("user/setUserData", res.data.data);
            this.$store.dispatch("user/setAuthenticated", true);

            window.localStorage.setItem("user", JSON.stringify(res.data.data));

            this.$emit("snackbar", {
              text: "Success! 🎉",
              color: "success",
            });
          })
          .finally(() => {
            this.toggleLoadingState(false);
            this.$router.push({name: "Home"});
          });
    },
    clearLoginForm() {
      this.username = "";
      this.password = "";
      this.$v.$reset();
    },
  },
  computed: {
    mobile() {
      return this.$vuetify.breakpoint.mobile;
    },
    formWidth() {
      if (this.$vuetify.breakpoint.mobile) {
        return "100%";
      }
      switch (this.$vuetify.breakpoint.name) {
        case "xl":
          return "60%";
        case "lg":
          return "65%";
        case "md":
          return "70%";
        case "sm":
          return "80%";
        case "xs":
          return "100%";
        default:
          return "65%";
      }
    },
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
