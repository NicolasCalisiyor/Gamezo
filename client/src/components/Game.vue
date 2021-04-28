<template>
  <div class="game">
    <img :src="game.background_image" alt="Cannot display image" />
    <h3>{{ game.name }}</h3>
    <p>{{ game.released }}</p>
    <Button @btn-click="$emit('write-review')" text="Write a Review" color="green" />
    <Button @btn-click="$emit('read-reviews')" text="Read Reviews" color="red" />
  </div>
</template>

<script>
import Button from './Button'

export default {
  name: "Game",
  props: {
    game: Object,
  },
  components: {
      Button
  }
};
</script>

<style scoped>
.game {
  background: #f4f4f4;
  margin: 5px;
  padding-bottom: 10px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: gray;
}
.game h3, p {
    color: white;
}

.game img {
  width: 100%;
  height: auto;
    border-radius: 10px;
}
</style>
