<template>
  <form @submit="onSubmit">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          <slot name="header">
            <div class="create-review">
              <h1>{{ gameName }}</h1>
              <hr />
              <label for="create-review">Add a Review...</label>
              <input
                type="text"
                v-model="review.comment"
                placeholder="Create a review"
              />
              <input
                type="number"
                v-model="review.gameId"
                v-show="false"
                placeholder="Game id"
              />
              <Button
                type="submit"
                @btn-click="createReview"
                text="Add!"
                color="green"
              />
              <Button
                type="button"
                @btn-click="browseReviews"
                text="Browse Reviews"
                color="green"
              />
            </div>
          </slot>
        </header>

        <section class="modal-body">
          <slot name="body">
            <div class="reviews-container">
              <h1>Latest Reviews</h1>
              <hr />
              <p class="error" v-if="error">{{ error }}</p>
              <div class="reviews-container">
                <div
                  class="review"
                  v-for="(review, index) in reviews"
                  v-bind:item="review"
                  v-bind:index="index"
                  v-bind:key="review._id"
                >
                  {{
                    `Date: ${review.createdAt.getDate()}/${review.createdAt.getMonth()}/${review.createdAt.getFullYear()}`
                  }}
                  <p class="text">{{ review.comment }}</p>
                </div>
              </div>
            </div>
          </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer">
            This is the default footer!
          </slot>
          <Button type="button" @btn-click="close" text="Close!" color="red" />
        </footer>
      </div>
    </div>
  </form>
</template>

<script>
import PostService from "../PostService";
import Button from "./Button";

export default {
  name: "Modal",
  data() {
    return {
      reviews: [],
      error: "",
      review: {
        comment: "",
        gameId: this.gameId,
      },
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    async createReview() {
      await PostService.insertPost(this.review);
      this.reviews = await PostService.getPosts();
    },
    async browseReviews() {
      const id = this.gameId;
      try {
        const allposts = await PostService.getPosts();
        this.reviews = allposts.filter((review) => review.gameId === id);
      } catch (err) {
        this.error = err.message;
      }
    },
  },
  props: {
    gameName: String,
    gameId: Number,
  },
  components: {
    Button,
  },
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
}
.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}
.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}
.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}
.modal-body {
  position: relative;
  padding: 20px 10px;
}
.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}
.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}
</style>
