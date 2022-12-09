<template>
  <div class = "container">
    <h1 class="text-center"> Users List </h1>
    <table class="table table-striped">
      <caption>Only registered users can make posts!!!</caption>
      <thead>
      <th> User Id </th>
      <th> User First Name </th>
      <th> User Second Name </th>
      <th> User Registration Time </th>
      </thead>
      <tbody>
      <tr v-for = "user in users" v-bind:key = "user.id">
        <td> {{user.userId}}</td>
        <td> {{user.firstName}}</td>
        <td> {{user.lastName}}</td>
        <td> {{user.email}}</td>

      </tr>
      </tbody>


    </table>
  </div>
</template>

<script>
import UserService from "@/router/UserService";
export default {

  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Users',
  data(){
    return {
      users : null
    }

  },
  methods: {
    gerUsers(){
      UserService.getUsers().then((response) =>{
        this.users = response.data;
      });
    },
    posUser(){
      UserService.postUsers().then((response) =>{
        this.users = response.data;
      })
    }
  },
  created() {
    this.gerUsers()
    this.posUser()
  }


}
</script>