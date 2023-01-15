<script setup>
import {ref,} from "vue";
import axios from "axios";
import router from "@/router";

const email = ref('')
const password = ref('')

function login() {
  let request = {
    email: email.value,
    password: password.value
  }
  console.log(request)
  axios.post('/api/public/login', request)
      .then(response => {
        let token = response.data
        console.log('Authorization ' + token)
        axios.defaults.headers.common["Authorization"] = "Bearer " + token
        localStorage.setItem("token", JSON.stringify(token))
        if (token) {
          router.push("/profile");
        }
        else {
          alert("Email or password is incorrect !")
          router.back();
        }
      })
}
</script>

<template>
  <div class="login mt-4">
    <div class="row">
      <div class="col-sm-3 mx-auto">
        <h1>Login</h1>
        <br>
        <form>
          <div class="form-group">
            <input v-model="email" type="email" class="form-control" id="inputEmail" placeholder="Enter email">
          </div>
          <div class="form-group">
            <input v-model="password" type="password" class="form-control" id="inputPassword" placeholder="Enter password">
          </div>
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div>
          <router-link to="/"><input type="button" v-on:click="login" class="btn btn-primary" value="Login"></router-link>
        </form>
        <br>
        <div>
          <p>Do not have account yet? <router-link to="/register">Create now</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
