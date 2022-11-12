<template>
  <div class="row">
    <div class="col-sm-3 mx-auto">
      <h1>Add Post</h1>
      <br>
      <form class="row g-3" @submit="postData">
        <div class="col-md-5">
          <label for="inputHead" class="form-label">Head</label>
          <input type="text" class="form-control" id="inputHead" v-model="posts.head">
        </div>
        <div class="col-md-7">
          <label for="inputImageLink" class="form-label">Image</label>
          <input type="file" class="form-control" id="inputImageLink">
        </div>
        <div class="col-12">
          <label for="inputDescription" class="form-label">Description</label>
          <input type="text" class="form-control" id="inputDescription" v-model="posts.description">
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">Create Post</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data(){
    return {
      posts: {
        head: null,
        description: null,
        imageLink: null,
      }
    }
  },
  methods: {
    postData() {
      this.posts = axios.post("/api/posts", this.posts)
    }
  }
};
</script>

<style>
label {
  margin-top: 15px;
}
</style>
