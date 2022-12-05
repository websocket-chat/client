<template>
  <v-card height="100%" width="100%" class="d-flex justify-center align-center" flat tile>
    <CircleLoader color="purple" :loading="loading" />
    <UserProfileCard @loading="toggleLoadingState"/>
  </v-card>
</template>

<script>
import UserProfileCard from "@/components/UserProfileCard";
import CircleLoader from "@/components/CircleLoader";

export default {
  name: 'Home',
  components: {
    UserProfileCard,
    CircleLoader
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    toggleLoadingState(state) {
      this.loading = state;
    },
  }
}
</script>
