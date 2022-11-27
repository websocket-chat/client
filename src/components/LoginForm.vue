<template>
  <v-card flat height="auto" width="100%">
    <form class="ma-12">
      <v-text-field
        v-model="username"
        append-icon="mdi-account"
        label="Username"
        class="form__input"
        clearable
        clear-icon="mdi-close-circle-outline"
      />
      <v-text-field
        v-model="password"
        class="form__input"
        label="Password"
        append-icon="mdi-lock"
        clearable
        clear-icon="mdi-close-circle-outline"
      />
    </form>
  </v-card>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: "",
    };
  },
};
</script>

<style scoped></style>
