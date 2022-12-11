<template>
  <v-card height="80%" width="80%" color="">
    <v-btn @click="sendMessage('balls')">
      click
    </v-btn>

  </v-card>
</template>

<script>
export default {
  name: "Messenger",
  data() {
    return {
      message: "",
      connection: null,
    }
  },
  methods: {
    sendMessage(message) {
      this.connection.send(JSON.stringify(message));
    }
  },
  computed: {
    sessionID() {
      return this.$store.getters["user/sessionID"];
    }
  },
  mounted() {
    this.connection = new WebSocket("wss://chat.cmyui.xyz/ws");

    this.connection.addEventListener("open", () => {
      // login
      console.log(this.sessionID);
      this.connection.send(this.sessionID);
    });

    this.connection.addEventListener("message", (e) => {
      console.log(e.data);
    });

    this.connection.addEventListener("close", (e) => {
      e.preventDefault();
      console.log(e);
    })
  }

}
</script>

<style scoped>

</style>