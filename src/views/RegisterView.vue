<template>
  <div class="row">
    <div class="col-sm-3 mx-auto">
      <h1>Register</h1>
      <br>
      <form class="row g-3" @submit="postData">
        <div class="col-md-6">
          <label for="inputFirstName" class="form-label">First name</label>
          <input type="text" class="form-control" id="inputFirstName" v-model="users.firstName">
        </div>
        <div class="col-md-6">
          <label for="inputLastName" class="form-label">Last name</label>
          <input type="text" class="form-control" id="inputLastName" v-model="users.lastName">
        </div>
        <div class="col-12">
          <label for="inputEmail" class="form-label">Email</label>
          <input type="email" class="form-control" id="inputEmail" v-model="users.email">
        </div>
        <div class="col-12">
          <label for="inputPassword" class="form-label">Password</label>
          <input type="password" class="form-control" id="inputPassword" v-model="users.password" style="margin-bottom: 10px">
        </div>
        <div class="col-12">
          <router-link to="/login"><button type="submit" class="btn btn-primary" v-on:click=postData>Create account</button></router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  data(){
    return {
      users: {
        firstName: null,
        lastName: null,
        email: null,
        password: null
      },
    }
  },
  methods: {
    postData() {
      this.users = axios.post("/api/public/register", this.users)
    }
  },
  async created() {
    let token = JSON.parse(localStorage.getItem("token"))
    if (token != null) {
      alert("You are already logged")
      router.back();
    }
  }
};
</script>

<style>
label {
  margin-top: 15px;
}
</style>
