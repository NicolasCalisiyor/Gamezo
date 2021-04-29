<template>
  <div class="container">
    <Header title="Game Review Application" />
    <input 
        type="text"
        v-model="search"
        placeholder="Search for games!"
        @keyup="fetchSearched()"
        class="searchField"
    />
    <Games :games="games" />
    <Button
      v-show="this.page !== 1"
      @btn-click="previousPage()"
      text="Previous"
      class="nav"
    />
    <Button @btn-click="nextPage()" text="Next" class="nav" />
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
      search: "",
      precision: true,
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
      console.log(this.page);
      this.page--;
      const res = await fetch(
        `https://api.rawg.io/api/games?key=600c0f210a6c4683aeb5877c96f73ca2&page=${this.page}`
      );
      const data = await res.json();
      //return data.results;
      this.games = data.results;
      window.scrollTo(0, 0);
    },
    async nextPage() {
      console.log("Next");
      console.log(this.page);
      this.page++;
      const res = await fetch(
        `https://api.rawg.io/api/games?key=600c0f210a6c4683aeb5877c96f73ca2&page=${this.page}`
      );
      const data = await res.json();
      //return data.results;
      this.games = data.results;
      window.scrollTo(0, 0);
    },
    async fetchSearched() {
      const res = await fetch(
        `https://api.rawg.io/api/games?key=600c0f210a6c4683aeb5877c96f73ca2&search=${this.search}&search_exact=${this.precision}`
      );
      const data = await res.json();
      this.games = data.results;
    }
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
  margin-top: 10px;
}

.container {
  max-width: 80%;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 3px solid rgb(222, 218, 255);
  padding: 30px;
  border-radius: 50px;
  background-color: black;
}

.btn {
  display: inline-block;
  background: #282941;
  color: #fff;
  border: 1pc solid white;
  padding: 10px 20px;
  margin: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

.nav {
  width: 10%;
  height: 100%;
  font-size: 12px;
  border: 1px solid white;
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

.searchField {
  position: center;
  padding: 10px;
  margin-bottom: 20px;
  width: 20%;
  border-radius: 15px;
  border:3px solid rgb(255, 255, 255);
  background: black;
  color: rgb(255, 255, 255);
  text-align: center;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 150%;
  
}
::placeholder {
  text-align: center;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
</style>
