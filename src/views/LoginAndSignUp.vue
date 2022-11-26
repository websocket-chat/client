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
          <v-card d flat height="auto" width="100%">
            <form class="form-group ma-12">
              <v-container fluid fill-height>
                <v-row dense no-gutters>
                  <v-col cols="12">
                    <v-text-field
                      v-model="signup.email"
                      dark
                      append-icon="mdi-email"
                    >
                      <template v-slot:label>
                        <label class="form__label"> Email </label>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="signup.username"
                      dark
                      append-icon="mdi-account"
                    >
                      <template v-slot:label>
                        <label class="form__label"> Username </label>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="signup.password"
                      type="password"
                      append-icon="mdi-lock"
                    >
                      <template v-slot:label>
                        <label class="form__label"> Password </label>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </form>
            <v-card class="d-flex justify-end">
              <v-btn class="ma-1" @click="clearSignupForm"> Clear </v-btn>
              <v-btn class="ma-1" color="success" @click="createUserAccount">
                Submit
              </v-btn>
            </v-card>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat height="auto" width="100%">
            <form class="ma-12">
              <v-container fluid fill-height>
                <v-row dense no-gutters>
                  <v-col cols="12">
                    <label class="form__label"> Username </label>
                    <v-text-field
                      v-model="login.username"
                      append-icon="mdi-account"
                      class="form__input"
                      clearable
                      clear-icon="mdi-close-circle-outline"
                    />
                  </v-col>
                  <v-col cols="12">
                    <label class="form__label"> Password </label>
                    <v-text-field
                      v-model="login.password"
                      class="form__input"
                      append-icon="mdi-lock"
                      clearable
                      clear-icon="mdi-close-circle-outline"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </form>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <Snackbar :visible="snackbar" :text="snackbarText" :color="snackbarColor" />
  </v-card>
</template>

<script>
import { required, email, between } from "vuelidate/lib/validators";
import AccountServices from "@/services/AccountServices";
import Snackbar from "@/components/Snackbar";
export default {
  name: "LoginAndSignUp",
  components: { Snackbar },
  data() {
    const hasUpperCase = (val) => val === val.toUpperCase();
    const hasLowerCase = (val) => val === val.toLowerCase();
    const hasNumbers = (val) => typeof val === "number";
    return {
      snackbarColor: "",
      snackbarText: "",
      snackbar: false,
      tab: 0,
      signup: {
        password: "",
        email: "",
        username: "",
        validations: {
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
        },
      },
      login: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    clearSignupForm() {
      this.signup = Object.assign({}, {});
    },
    // 2xx success green
    // 4xx client error orange
    // 5xx server error red
    createUserAccount() {
      AccountServices.create(this.signup)
        .catch((error) => {
          console.log(error.response.data.error, error.response.data.status);
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
