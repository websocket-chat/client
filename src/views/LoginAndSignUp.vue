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
      <v-tabs v-model="tab" centered dark grow>
        <v-tabs-slider color="purple"/>
        <v-tab> Signup  </v-tab>
        <v-tab> Login </v-tab>
      </v-tabs>
      <v-tabs-items dark v-model="tab">
        <v-tab-item>
          <SignupForm
            @snackbar="handleSnackbarEvent"
          />
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
    handleSnackbarEvent({text, color}) {
      this.turnOnSnackbar();
      this.setSnackbarText(text);
      this.setSnackbarColor(color);
      this.tab = 1;
    },
    turnOnSnackbar() {
      this.snackbar = true;
    },
    setSnackbarText(text) {
      this.snackbarText = text;
    },
    setSnackbarColor(color) {
      this.snackbarColor = color;
    },
  },
};
</script>

<style scoped></style>
