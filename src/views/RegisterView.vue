<template>
  <div class="row">
    <div class="col-sm-3 mx-auto">
      <h1>Register</h1>
      <br>
      <form class="row g-3" @submit="postData">
        <div class="col-md-6">
          <label for="inputFirstName" class="form-label">First name</label>
          <input type="text" class="form-control" id="inputFirstName" v-model="posts.firstName">
        </div>
        <div class="col-md-6">
          <label for="inputLastName" class="form-label">Last name</label>
          <input type="text" class="form-control" id="inputLastName" v-model="posts.lastName">
        </div>
        <div class="col-12">
          <label for="inputEmail" class="form-label">Email</label>
          <input type="email" class="form-control" id="inputEmail" v-model="posts.email">
        </div>
        <div class="col-12">
          <label for="inputPassword" class="form-label">Password</label>
          <input type="password" class="form-control" id="inputPassword" v-model="posts.password" style="margin-bottom: 10px">
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">Create account</button>
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
        firstName: null,
        lastName: null,
        email: null,
        password: null
      }
    }
  },
  methods: {
    postData() {
      this.posts = axios.post("/api/public/register", this.posts)
    }
  }
};
</script>

<style>
label {
  margin-top: 15px;
}
</style>
