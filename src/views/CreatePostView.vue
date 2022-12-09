<template>
  <div class="row">
    <div class="col-sm-3 mx-auto">
      <h1>Add Post</h1>
      <br>
      <div class="col-15">
        <label for="inputUser" class="form-label">Creator_Id</label>
        <input type="text" class="form-control" id="inputUser" v-model="posts.userId">
      </div>
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
          <button @click="postData" class="btn btn-primary">Create Post</button>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";

export default {
  data(){
    return {
      posts: {
        userId: null,
        head: null,
        description: null,
        imageLink: null,
      }
    }
  },
  methods: {
    postData() {
      let token = JSON.parse(localStorage.getItem("token"))
      if (token != null) {
        let userData = VueJwtDecode.decode(token);
        this.posts.head = userData["head"]
        this.posts = axios.post('/api/posts', this.posts)
      }
      else alert("User not logged in.")
    }
  }
};
</script>

<style scoped>
label {
  margin-top: 15px;
}
</style>
