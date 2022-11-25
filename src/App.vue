<template>
  <v-app>
    <v-app-bar app dark >
      <v-app-bar-nav-icon  @click="drawer = !drawer" />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app dark >
      <v-list>
        <v-list-item v-for="(page, i) in pages" :key="i" link>
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
      <v-container fluid fill-height>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      drawer: false,
      pages: [
        { name: "Home", icon: "mdi-home"},
        { name: "Login & Signup", icon: "mdi-account" },
        { name: "Admin", icon: "mdi-security"},
        { name: "Messenger", icon: "mdi-message"}
      ],
    }
  },
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
