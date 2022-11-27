<template>
  <v-card flat height="auto" width="60%" class="mx-auto">
    <v-form class="form-group">
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="Email"
        dark
        class="form__input"
        append-icon="mdi-email"
      >
      </v-text-field>
      <v-text-field
        v-model="username"
        :error-messages="usernameErrors"
        label="Username"
        dark
        required
        class="form__input"
        append-icon="mdi-account"
      >
      </v-text-field>
      <v-text-field
        v-model="password"
        :type="!showPassword ? 'password' : 'text'"
        :error-messages="passwordErrors"
        label="Password"
        class="form__input"
        required
      >
        <template v-slot:append>
          <v-icon >
            mdi-lock
          </v-icon>
          <v-icon @click="showPassword = !showPassword" class="password-toggle">
            {{ !showPassword ? "mdi-eye-off" : "mdi-eye"}}
          </v-icon>
        </template>
      </v-text-field>
      <v-card class="d-flex justify-end my-2" flat height="fit-content" width="100%">
        <v-btn @click="clearSignupForm" text class="ma-1" color="error">Clear</v-btn>
        <v-btn @click="createUserAccount" text class="ma-1" color="success">Signup</v-btn>
      </v-card>
    </v-form>
  </v-card>
</template>

<script>
import { between, email, required } from "vuelidate/lib/validators";
import AccountServices from "@/services/AccountServices";

export default {
  name: "SignupForm",
  validations() {
    const hasUpperCase = (val) => val === val.toUpperCase();
    const hasLowerCase = (val) => val === val.toLowerCase();
    const hasNumbers = (val) => typeof val === "number";
    return {
      email: {
        required,
        email,
      },
      username: {
        required,
        between: between(3, 16),
      },
      password: {
        required,
        hasUpperCase,
        hasLowerCase,
        hasNumbers,
        between: between(8, 28),
      },
    };
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      showPassword: false,
    };
  },
  methods: {
    createUserAccount() {
      AccountServices.create(this.signup)
        .catch((error) => {
          this.snackbarText = this.determineSnackbarMessage(
            error.response.data.error
          );
          this.snackbarColor = "error";
          this.snackbar = true;
        })
        .then((res) => {
          if (!res) return;
          console.log(res);
        });
    },
    clearSignupForm() {
      this.email = "";
      this.username = "";
      this.password = "";
    },
  },
  computed: {
    emailErrors() {
      const errors = [];

      if (!this.$v.email.dirty) return errors;

      !this.$v.email.required && errors.push("Email is required!");
      !this.$v.email.email && errors.push("Must be a valid email!");

      return errors;
    },
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("Username is required!");
      !this.$v.username.between &&
        errors.push("Username must be between 3 and 18 letters.");

      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.dirty) return errors;
      !this.$v.password.required && errors.push("Password required!");
      !this.$v.password.between &&
        errors.push("Password must be between 8 and 28 letters.");
      !this.$v.password.hasLowerCase() &&
        errors.push("Must have at least one lowercase letter.");
      !this.$v.password.hasUpperCase() &&
        errors.push("Must have at least one uppercase letter.");
      !this.$v.password.hasNumbers() &&
        errors.push("Must have at least one number.");

      return errors;
    },
  },
};
</script>

<style scoped></style>
