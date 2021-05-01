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
  background: #f4f4f4;
  margin: 5px;
  padding-bottom: none;
  border: 1px solid black;
  border-radius: 10px;
  background-color: #12132b;
}
.game h3,
p {
  color: white;
  word-wrap: break-word;
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

.game-name {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  padding: 1px 10px 1px 10px;
  font-size: 150%;
}

.review {
  
  width: 100%;
  height: 100%;
  font-size: 12px;
  border: 1px solid black;
  text-align: center;
  color: #fff;
  font-size: 15px;
  text-decoration: none;
  font-family: sans-serif;
  background: linear-gradient(90deg, #020005, #32225f, #392d6d, #000000);
  background-size: 400%;
  z-index: 1; 
}
.review:hover {
   animation: animate 8s linear infinite;
}
@keyframes animate {
 0% {
   background-position: 0%;
 }
 100% {
   background-position: 400%;
 }
}
.review:before {
  content: '';
  background: linear-gradient(90deg, #020005, #32225f, #392d6d, #000000);
  background-size: 400%;
  border-radius: 40px;
  filter: blur(20px);
  opacity: 0;
  transition: 0.5s;
}
.review:hover:before {
  filter: blur(20px);
  opacity: 1;
  animation: animate 8s linear infinite;
}
</style>
