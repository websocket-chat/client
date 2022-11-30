<template>
  <v-card flat height="auto" width="90%" class="mx-auto">
    <form class="form-group">
      <v-container fluid fill-height>
        <v-row no-gutters>
          <v-col cols="12">
            <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              label="Email"
              dark
              class="form__input"
              append-icon="mdi-email"
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="username"
              :error-messages="usernameErrors"
              :conter="16"
              label="Username"
              dark
              required
              class="form__input"
              append-icon="mdi-account"
              @input="$v.username.$touch()"
              @blur="$v.username.$touch()"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="password"
              :type="!showPassword ? 'password' : 'text'"
              :counter="28"
              :error-messages="passwordErrors"
              label="Password"
              class="form__input"
              dark
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
            >
              <template v-slot:append>
                <v-icon
                  @click="showPassword = !showPassword"
                  class="password-toggle"
                >
                  {{ !showPassword ? "mdi-eye-off" : "mdi-eye" }}
                </v-icon>
                <v-icon> mdi-lock </v-icon>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <v-card
        class="d-flex justify-end my-2"
        flat
        height="fit-content"
        width="100%"
      >
        <v-btn @click="clearSignupForm" text large outlined class="ma-1" color="error">
          Clear
        </v-btn>
        <v-btn @click="createUserAccount" text large outlined class="ma-1" color="success">
          Signup
        </v-btn>
      </v-card>
    </form>
  </v-card>
</template>

<script>
import {
  helpers,
  minLength,
  maxLength,
  email,
  required,
} from "vuelidate/lib/validators";
import AccountServices from "@/services/AccountService";

export default {
  name: "SignupForm",
  validations() {
    const hasUpperCase = helpers.regex("hasUpperCase", /[A-Z]/);
    const hasLowerCase = helpers.regex("hasLowerCase", /[a-z]/);
    const hasNumbers = helpers.regex("hasNumbers", /[0-9]/);
    return {
      email: {
        email,
        required,
      },
      username: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(16),
      },
      password: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(28),
        hasUpperCase,
        hasLowerCase,
        hasNumbers,
      },
    };
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      showPassword: false,
      successful: false,
    };
  },
  methods: {
    toggleLoadingState(turnOn) {
      turnOn ? this.$emit("loading", true) : this.$emit("loading", false);
    },
    createUserAccount() {
      this.toggleLoadingState(true);
      this.$v.$touch();
      AccountServices.create(this.username, this.email, this.password)
        .catch((error) => {
          let snackbarText = this.determineSnackbarMessage(
            error.response.data.error
          );
          this.$emit("snackbar", {
            text: snackbarText,
            color: "error",
          });
        })
        .then((res) => {
          if (!res) return;

          this.$emit("snackbar", {
            text: "Success! 🎉",
            color: "success",
          });
        })
        .finally(() => {
          this.toggleLoadingState(false);
          this.$emit("tab-switch");
        });
    },
    clearSignupForm() {
      this.email = "";
      this.username = "";
      this.password = "";
      this.$v.$reset();
    },
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
  computed: {
    emailErrors() {
      const errors = [];

      if (!this.$v.email.$dirty) return errors;

      !this.$v.email.required && errors.push("Email is required!");

      !this.$v.email.email && errors.push("Must be a valid email!");

      return errors;
    },
    usernameErrors() {
      const errors = [];

      if (!this.$v.username.$dirty) return errors;

      !this.$v.username.required && errors.push("Username is required!");

      !this.$v.username.minLength &&
        errors.push("Username must be at least 3 letters");

      !this.$v.username.maxLength &&
        errors.push("Username must not be more than 16 letters.");

      return errors;
    },
    passwordErrors() {
      const errors = [];

      if (!this.$v.password.$dirty) return errors;

      !this.$v.password.required && errors.push("Password required!");

      !this.$v.password.minLength &&
        errors.push("Password must be at least 8 letters");

      !this.$v.password.maxLength &&
        errors.push("Password must not be more than 28 letters");

      !this.$v.password.hasLowerCase &&
        errors.push("Must have at least one lowercase letter.");

      !this.$v.password.hasUpperCase &&
        errors.push("Must have at least one uppercase letter.");

      !this.$v.password.hasNumbers &&
        errors.push("Must have at least one number.");

      return errors;
    },
  },
};
</script>

<style scoped></style>
