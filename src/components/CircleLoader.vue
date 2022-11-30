<template>
  <v-overlay :value="loading" opacity="0.9" absolute>
    <v-progress-circular :value="loading" indeterminate size="124" :color="color" />
  </v-overlay>
</template>

<script>
export default {
  name: "CircleLoader",
  props: {
    loading: {
      type: Boolean,
      required: true,
      default: false,
    },
    color: {
      type: String,
      required: true,
      default: "white"
    }
  }
}
</script>

<style scoped>

</style>