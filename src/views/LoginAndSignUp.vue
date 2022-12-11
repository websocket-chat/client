<template>
  <v-card height="100%" width="100%" flat tile>
    <CircleLoader color="primary" :loading="loading"/>
    <v-card
        height="100%"
        width="100%"
        class="d-flex justify-center align-center"
    >
      <v-card outlined :elevation="mobile ? '0' : '10'" :height="mobile ? '50%' : 'auto'" :width="mobile ? '100%' : '50%'"  >
        <v-tabs v-model="tab" centered>
          <v-tabs-slider color="accent"/>
          <v-tab> Signup</v-tab>
          <v-tab> Login</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <SignupForm
                @snackbar="handleSnackbarEvent"
                @loading="toggleLoadingState"
            />
          </v-tab-item>
          <v-tab-item>
            <LoginForm
                @snackbar="handleSnackbarEvent"
                @loading="toggleLoadingState"
            />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
      <v-snackbar
          v-model="snackbar"
          :timeout="3000"
          :color="snackbarColor"
          class="text-center"
      >
        {{ snackbarText }}
      </v-snackbar>
    </v-card>
  </v-card>
</template>

<script>
import CircleLoader from "@/components/CircleLoader";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";

export default {
  name: "LoginAndSignUp",
  components: {LoginForm, SignupForm, CircleLoader},
  data() {
    return {
      snackbarColor: "",
      snackbarText: "",
      snackbar: false,
      tab: 0,
      loading: false,
    };
  },
  methods: {
    toggleLoadingState(state) {
      this.loading = state;
    },
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
  computed: {
    mobile() {
      return this.$vuetify.breakpoint.mobile;
    }
  }
};
</script>

<style scoped></style>
