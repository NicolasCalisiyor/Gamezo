<template>
  <div class="container">
    <Header title="Game Review Application" />
    <Games :games="games" />
    <Button v-show="this.page !== 1" @btn-click="previousPage()" text="Previous" />
    <Button @btn-click="nextPage()" text="Next" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Games from "./components/Games";
import Button from "./components/Button";

export default {
  name: "App",
  components: {
    Header,
    Games,
    Button,
  },
  data() {
    return {
      page: 1,
      games: [],
    };
  },
  methods: {
    async fetchGames() {
      const res = await fetch(
        `https://api.rawg.io/api/games?key=600c0f210a6c4683aeb5877c96f73ca2&page=${this.page}`
      );
      const data = await res.json();
      return data.results;
    },
    async previousPage() {
      console.log("Previous");
      console.log(this.page)
      this.page--;
      const res = await fetch(
        `https://api.rawg.io/api/games?key=600c0f210a6c4683aeb5877c96f73ca2&page=${this.page}`
      );
      const data = await res.json();
      //return data.results;
      this.games = data.results
      window.scrollTo(0,0)
    },
    async nextPage() {
      console.log("Next");
      console.log(this.page)
      this.page++;
      const res = await fetch(
        `https://api.rawg.io/api/games?key=600c0f210a6c4683aeb5877c96f73ca2&page=${this.page}`
      );
      const data = await res.json();
      //return data.results;
      this.games = data.results
      window.scrollTo(0,0)
    },
  },
  async created() {
    this.games = await this.fetchGames();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  max-width: 70%;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}

.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

.btn:focus {
  outline: none;
}

.btn:active {
  transform: scale(0.98);
}

.btn-block {
  display: block;
  width: 100%;
}
</style>
