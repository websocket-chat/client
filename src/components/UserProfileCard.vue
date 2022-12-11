<template>
  <v-card height="50%" width="60%" outlined elevation="12" class="d-flex mx-auto justify-center align-center">
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
      <v-btn @click="settingsDialog = true" absolute top right fab>
        <v-icon>mdi-cog</v-icon>
      </v-btn>

    </v-card>
    <v-dialog v-model="settingsDialog" persistent width="50%">
      <v-card height="100%" width="100%">
        <v-card-title>Update Account Info</v-card-title>
        <form enctype="multipart/form-data">

          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <input @change="processFile" id="file" type="file">
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions class="d-flex justify-end">
            <v-btn @click="settingsDialog = false" outlined color="error">
              Close
            </v-btn>
            <v-btn @click="uploadAvatar" :disabled="!serverPayload">
              Submit
            </v-btn>
          </v-card-actions>
        </form>
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
      progress: 0,
      image: new Image(),
      avatar: {},
      settingsDialog: false,
      serverPayload: new FormData(),
      rules: [
        (val) => !val || val.size < 1024 * 1024 * 20 || "File cannot be larger than 20mb!",
      ]
    }
  },
  methods: {
    processFile(event) {
      let file = event.target.files[0];
      this.serverPayload.append("upload_file", file, file.name);
    },
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
              this.avatar = Object.assign({}, res.data.data[0]);
            }
          })
    },
    uploadAvatar() {
      this.toggleLoadingState(true);
      AvatarService.uploadAvatar(this.serverPayload, this.accountID, this.sessionID)
          .catch((err) => {
            // TODO: handle errors with snackbar
            console.error(err);
          })
          .then((res) => {
            if (!res) return;
            console.log(res.data.data[0]);
            if (res.status >= 200 && res.status <= 299) {
              this.avatar = Object.assign({}, res.data.data[0])
            }
          })
          .finally(() => {
            this.serverPayload = Object.assign({}, {});
            this.toggleLoadingState(false);
          });
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

    sessionID() {
      return this.$store.getters["user/sessionID"];
    },
    accountID() {
      return this.$store.getters["user/userID"];
    }
  },
  watch: {
    file(newVal) {
      console.log(newVal);
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