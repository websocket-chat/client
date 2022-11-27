<template>
  <v-card flat height="auto" width="60%" class="mx-auto">
    <form class="form-group">
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="Email"
        dark
        class="form__input"
        append-icon="mdi-email"
        @input="vulidate.email.$touch()"
        @blur="vulidate.email.$touch()"
      >
      </v-text-field>
      <v-text-field
        v-model="username"
        :error-messages="usernameErrors"
        :conter="16"
        label="Username"
        dark
        required
        class="form__input"
        append-icon="mdi-account"
        @input="vulidate.username.$touch()"
        @blur="vulidate.username.$touch()"
      >
      </v-text-field>
      <v-text-field
        v-model="password"
        :type="!showPassword ? 'password' : 'text'"
        :counter="28"
        :error-messages="passwordErrors"
        label="Password"
        class="form__input"
        dark
        @input="vulidate.password.$touch()"
        @blur="vulidate.password.$touch()"
      >
        <template v-slot:append>
          <v-icon @click="showPassword = !showPassword" class="password-toggle">
            {{ !showPassword ? "mdi-eye-off" : "mdi-eye" }}
          </v-icon>
          <v-icon> mdi-lock </v-icon>
        </template>
      </v-text-field>
      <v-card
        class="d-flex justify-end my-2"
        flat
        height="fit-content"
        width="100%"
      >
        <v-btn @click="clearSignupForm" text class="ma-1" color="error"
          >Clear</v-btn
        >
        <v-btn @click="createUserAccount" text class="ma-1" color="success"
          >Signup</v-btn
        >
      </v-card>
    </form>
  </v-card>
</template>

<script>
import { helpers, minLength, maxLength, email, required } from "vuelidate/lib/validators";
import AccountServices from "@/services/AccountService";

export default {
  name: "SignupForm",
  validations() {

    const hasUpperCase = helpers.regex("hasUpperCase", /[A-Z]/);
    const hasLowerCase = helpers.regex("hasLowerCase", /[a-z]/)
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
    };
  },
  methods: {
    createUserAccount() {
      AccountServices.create(this.username, this.password, this.email)
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
      this.$v.$reset();
    },
  },
  computed: {
    vulidate() {
      return this.$v;
    },
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

      !this.$v.username.minLength && errors.push("Username must be at least 3 letters");

      !this.$v.username.maxLength && errors.push("Username must not be more than 16 letters.")

      return errors;
    },
    passwordErrors() {
      const errors = [];

      if (!this.$v.password.$dirty) return errors;

      !this.$v.password.required && errors.push("Password required!");

      !this.$v.password.minLength && errors.push("Password must be at least 8 letters");

      !this.$v.password.maxLength && errors.push("Password must not be more than 28 letters")

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
