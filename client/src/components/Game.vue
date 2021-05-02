<template>
  <div class="game">
    <img :src="game.background_image" alt="Cannot display image" />
    <h3 class="game-name">{{ game.name }}</h3>
    <p>{{ game.released }}</p>
    <Button @btn-click="showModal()" text="Show more!" class="review" />
    <Modal :gameId="game.id" :gameName="game.name" v-show="isModalVisible" @close="closeModal" />
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
  margin: 5px;
  padding-bottom: none;
  border: 1px solid black;
  border-radius: 15px;
  background-color: #020227;
  background: linear-gradient(90deg, #020227, #0c0c49, #0c0c49, #020227);
  background-size: 400%;
  z-index: 1; 
}
.game:hover {
   animation: animate 10s linear infinite;
}
.game p , h3{
  color: white;
  word-wrap: break-word;
  font-family: monospace;
  font-size: 15px;
  padding: 1px 10px 1px 10px;
}

.game img {
  width: 100%;
  height: auto;
  border-radius: 15px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
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

.game-name {
  font-size: 25px;
}

.review {
  width: 100%;
  height: 100%;
  font-size: 15px;
  font-weight: bold;
  border: none;
  border-top: 2px solid rgb(0, 0, 0);
  border-radius: 15px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  text-align: center;
  color: #fff;
  font-family:monospace;
  background: transparent;
}
.review:hover {
  background: rgb(212, 207, 255);
  color: #020227;
  font-size: 20px;
}


@keyframes animate {
 0% {
   background-position: 0%;
 }
 100% {
   background-position: 400%;
 }
}
</style>
