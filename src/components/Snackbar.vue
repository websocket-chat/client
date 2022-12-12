<template>
  <v-snackbar :value="visible" :timeout="timeout" :color="color">
    {{ text }}
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",
  data() {
    return {
      timeout: 2500,
    };
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
    text: {
      type: String,
      required: true,
      default: "",
    },
    color: {
      type: String,
      required: false,
      default: "success",
    },
  },
};
</script>

<style scoped></style>
