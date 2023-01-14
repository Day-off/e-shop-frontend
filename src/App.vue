<script setup>
function logout() {
  localStorage.removeItem("token")
}
</script>

<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/posts">Posts</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/register">Register</router-link> |
    <router-link to="/create">Add Post  </router-link>
    <router-link to="/"><input type="button" v-on:click="logout" class="feedback" value="Logout"></router-link>
  </nav>
  <router-view/>
</template>

<style>

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

.feedback {
  background-color : #31B0D5;
  color: white;
  padding: 10px 10px;
  border-radius: 4px;
  border-color: #46b8da;
}
</style>
