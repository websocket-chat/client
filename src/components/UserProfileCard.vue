<template>
  <v-card height="50%" width="60%" class="d-flex mx-auto justify-center align-center">
    <v-card class="d-flex align-center justify-center" flat height="100%" width="100%">
      <v-card class="d-flex align-center" flat height="100%" width="fit-content">
        <v-avatar color="primary" size="250">
          <template v-slot>
            <v-img :src="avatar.public_url"></v-img>
          </template>
        </v-avatar>
      </v-card>
      <v-card flat height="100%">
        <v-card width="100%" height="100%" flat class="d-flex justify-center flex-column">
          <v-card-title class="text-h3 greeting">{{ userInfo.username }}</v-card-title>
          <v-card-subtitle>{{ userInfo.email_address }}</v-card-subtitle>
        </v-card>
      </v-card>
      <v-btn @click="settingsDialog = true" color="secondary" absolute top right small fab>
        <v-icon>mdi-cog</v-icon>
      </v-btn>

    </v-card>
    <v-dialog v-model="settingsDialog" persistent width="50%">
      <v-card height="100%" width="100%">
        <v-card-title>Change</v-card-title>
        <v-file-input v-model="file" encrypt="" accept=".jpeg,.png,.jpg,.webp" show-size :rules="rules"/>
        <v-card-actions class="d-flex justify-end">
          <v-btn @click="settingsDialog = false" outlined color="error">
            Close
          </v-btn>
          <v-btn @click="uploadAvatar">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import AccountService from "@/services/AccountService";
import AvatarService from "@/services/AvatarService";

export default {
  name: "UserProfileCard",
  data() {
    return {
      userInfo: {},
      loading: false,
      settingsDialog: false,
      avatar: {},
      file: {},
      rules: [
        (val) => !val || val.size < 1024 * 1024 * 20 || "File cannot be larger than 20mb!",
      ]
    }
  },
  methods: {
    toggleLoadingState(turnOn) {
      turnOn ? this.$emit("loading", true) : this.$emit("loading", false);
    },
    getUserInfo() {
      this.toggleLoadingState(true);
      AccountService.getAccountById(this.accountID)
          .catch((err) => {
            console.error(err);
          })
          .then((res) => {
            if (!res) return;
            if (res.status >= 200 && res.status <= 299) {
              this.userInfo = Object.assign({}, res.data.data);
            }
          }).finally(() => {
        this.toggleLoadingState(false);
      });
    },
    getAvatar() {
      AvatarService.fetchAvatar(this.accountID)
          .catch((err) => {
            console.error(err);
          })
          .then((res) => {
            if (!res) return;
            if (res.status >= 200 && res.status <= 299) {
              this.avatar = Object.assign({}, res.data.data);
            }
          })
    },
    uploadAvatar() {
      this.toggleLoadingState(true);
      AvatarService.uploadAvatar(this.file, this.accountID)
          .catch((err) => {
            // TODO: handle errors with snackbar
            console.error(err);
          })
          .then((res) => {
            if (!res) return;
            if (res.status >= 200 && res.status <= 299) {
              this.avatar = Object.assign({}, res.data.data)
            }
          })
          .finally(() => {
            this.toggleLoadingState(false);
          })
    },
    deleteAvatar() {
      this.toggleLoadingState(true);
      AvatarService.deleteAvatar(this.accountID)
          .catch((err) => {
            // TODO: handle errors with snackbar
            console.error(err);
          })
          .then((res) => {
            if (!res) return;
            // TODO: handle success indicator with snackbar
            if (res.status >= 200 && res.status <= 299) {
              this.avatar = Object.assign({}, {});
            }
          })
          .finally(() => {
            this.toggleLoadingState(false);
          })
    }
  },
  computed: {
    accountID() {
      return this.$store.getters["user/userID"];
    }
  },
  mounted() {
    this.getUserInfo();
    this.getAvatar();
  },
}
</script>

<style scoped>
.greeting {
  font-family: "Shrikhand", cursive !important;
}
</style>