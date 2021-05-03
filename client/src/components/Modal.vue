<template>
  <form @submit="onSubmit">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          <slot name="header">
            <div class="create-review">
              <h1>
                {{ gameName }}
              </h1>
              <hr />
              <textarea
                class="review-textarea"
                type="text"
                v-model="review.comment"
                placeholder="Create a review..."
              />
              <div class="btn-container">
                <Button
                  class="btn-general"
                  type="submit"
                  @btn-click="createReview"
                  text="Add!"
                />
                <Button
                  class="btn-general"
                  type="button"
                  @btn-click="browseReviews"
                  text="Browse Reviews"
                />
              </div>
            </div>
          </slot>
        </header>

        <section class="modal-body">
          <slot name="body">
            <div class="reviews-container">

              <p class="error" v-if="error">{{ error }}</p>
              <div class="reviews-container-list">
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
          </slot>
          <Button
            class="btn-general"
            type="button"
            @btn-click="close"
            text="Close!"
            color="red"
          />
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
.fas {
  color: red;
}

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
  border-radius: 10px;
  box-shadow: 2px 2px 20px 1px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  min-width: 30%;
  max-width: 30%;
  max-height: 100%;
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
  justify-content: center;
}
.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}
.modal-body {
  position: relative;
  padding: 20px 10px;
  margin: 20px;
}

.create-review {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.review-field {
  margin: 0px;
  width: 300px;
  height: 170px;
  background-color: #ffffff;
  border-radius: 10px;
}

.reviews-container-list {
  overflow-y: auto;
  max-height: 200px;
}

.review-textarea {
  min-width: 100%;
  max-width: 100%;
  min-height: 40%;
  max-height: 40%;
}
.btn-general {
  border-radius: 20px;
  background-color: #020227;
  background: linear-gradient(90deg, #020227, #0c0c49, #0c0c49, #020227);
}

.btn-container {
  display: flex;
  flex-direction: row;
  padding: 1 px;
}

h1 {
  color: #020227;
}
</style>
