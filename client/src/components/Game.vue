<template>
  <div class="game">
    <img :src="game.background_image" alt="Cannot display image" />
    <h3 class="game-name">{{ game.name }}</h3>
    <p>{{ game.released }}</p>
    <Button @btn-click="showModal()" text="Review!" class="review" />
    <Modal v-show="isModalVisible" @close="closeModal" />
  </div>
</template>

<script>
import Button from "./Button";
import Modal from "./Modal";

export default {
  name: "Game",
  data() {
    return {
      isModalVisible: false,
    };
  },
  props: {
    game: Object,
  },
  components: {
    Button,
    Modal,
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style scoped>
.game {
  background: #f4f4f4;
  margin: 5px;
  padding-bottom: 10px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: #12132b;
}
.game h3,
p {
  color: white;
}

.game img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: auto;
  background: gray;
  text-align: center;
}

.review {
  width: 50%;
  height: 100%;
  font-size: 12px;
  border: 1px solid white;
}

.game-name {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  padding: 1px 10px 1px 10px;
  font-size: 150%;
}
</style>
