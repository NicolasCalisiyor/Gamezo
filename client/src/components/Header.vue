<template>
  <header>
    <img :src='images.logo' alt="Logo">
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      images: {
        logo : require('../assets/gamezo.png')
      }
    }
  },
  props: {
      title: String,
  },
};
</script>

<style scoped>
header {
  margin-bottom: 20px;
  justify-content: center;
}
</style>
