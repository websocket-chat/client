<template>
  <v-app>
    <v-app-bar app width="100%">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer/>
      <v-icon x-large color="primary" class="ml-1">mdi-forum</v-icon>
      <v-spacer/>

      <v-switch
          v-model="$vuetify.theme.dark"
          inset
          hide-details
          :prepend-icon="
          $vuetify.theme.dark ? 'mdi-weather-night' : 'mdi-white-balance-sunny'
        "
          class="my-auto "
      />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary  >
      <v-list nav dense>
        <v-list-item v-for="(page, i) in pages" :key="i" link :to="page.href">
          <v-list-item-icon>
            <v-icon>
              {{ page.icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ page.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-card flat height="fit-content" width="95%" class="mx-auto my-1">
          <LogoutButton/>
        </v-card>
      </template>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid fill-height class="pa-0">
        <v-theme-provider root>
          <router-view @snackbar="handleSnackbarEvent"/>
        </v-theme-provider>
        <Snackbar :visible="snackbar" :text="snackbarText" :color="snackbarColor"/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import LogoutButton from "@/components/LogoutButton";
import Snackbar from "@/components/Snackbar";

export default {
  components: {
    Snackbar,
    LogoutButton
  },
  data() {
    return {
      drawer: false,
      timeout: 2500,
      snackbarText: "",
      snackbarColor: "",
      snackbar: false,
      pages: [
        {name: "Home", icon: "mdi-home", href: "/"},
        {name: "Messenger", icon: "mdi-message", href: "/messenger"},
      ],
    };
  },
  methods: {
    handleSnackbarEvent({text, color}) {
      this.turnOnSnackbar();
      this.setSnackbarText(text);
      this.setSnackbarColor(color);
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
    },
    pageTitle() {
      return this.$route.meta.title;
    },
  },
  beforeCreate() {
    const user = JSON.parse(window.localStorage.getItem("user"));

    if (!user) return;

    if (user.session_id.length > 0) {
      this.$store.dispatch("user/setUserData", user);
      this.$store.dispatch("user/setAuthenticated", true);
      this.$router.push({name: "Home"})
    }
  },
  created() {
    document.title = this.$route.meta.title;
  },
  watch: {
    pageTitle(newVal) {
      document.title = newVal;
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Shrikhand&display=swap");

.page-title {
  font-family: "Shrikhand", cursive;
  font-weight: 400;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.material-symbols-outlined {
  font-variation-settings: "FILL" 1, "wght" 300, "GRAD" 25, "opsz" 124;
}
</style>
