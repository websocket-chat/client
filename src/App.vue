<template>
  <v-app>
    <v-app-bar clipped-left width="100%" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"/>
      <v-spacer/>
      <h1 class="pa-0 page-title">Messenger</h1>
      <v-icon
          size="xx-large"
          color="purple"
          class="material-symbols-outlined ml-1"
      >
        forum
      </v-icon>
      <v-spacer/>
      <v-switch
          v-model="$vuetify.theme.dark"
          inset
          hide-details
          :append-icon="
          $vuetify.theme.dark ? 'mdi-weather-night' : 'mdi-white-balance-sunny'
        "
          class="my-auto "
      />
      <LogoutButton/>

    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list>
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
    </v-navigation-drawer>
    <v-main>
      <v-container fluid fill-height class="pa-0">
        <v-theme-provider root>
          <router-view/>
        </v-theme-provider>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import LogoutButton from "@/components/LogoutButton";

export default {
  beforeCreate() {
    const user = JSON.parse(window.localStorage.getItem("user"));

    if (!user) return;

    if (user.session_id.length > 0) {
      this.$store.dispatch("user/setUserData", user);
      this.$store.dispatch("user/setAuthenticated", true);
      this.$router.push({name: "Home"})
    }
  },
  components: {
    LogoutButton
  },
  data() {
    return {
      drawer: false,
      pages: [
        {name: "Home", icon: "mdi-home", href: "/"},
        {name: "Messenger", icon: "mdi-message", href: "/messenger"},
      ],
    };
  },
  computed: {
    pageTitle() {
      return this.$route.meta.title;
    },
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
  font-weight: 200;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.material-symbols-outlined {
  font-variation-settings: "FILL" 1, "wght" 300, "GRAD" 25, "opsz" 124;
}
</style>
