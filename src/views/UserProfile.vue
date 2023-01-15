<script>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";
import router from "@/router";

export default {
  data() {
    return {
      emailUser: "",
      nameUser: "",
      secondNameUser: ""
    }
  },

  methods: {
    goToCreatePost() {
      router.push("/create")
    },
    goToMyPosts() {
      router.push("/myposts")
    },
    logout() {
      localStorage.removeItem("token")
      router.push("/login")
    }
  },

  async created() {
    let token = JSON.parse(localStorage.getItem("token"))
    if (token != null) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token
      let userData = VueJwtDecode.decode(token);
      this.emailUser = userData["email"];
      this.nameUser = userData["firstname"];
      this.secondNameUser = userData["lastname"];
      console.log("User email : " + this.emailUser)
      console.log("User name : " + this.nameUser)
      console.log("User surname : " + this.secondNameUser)
    } else {
      alert("You need to sign up !")
      router.back()
    }
  },
}
</script>

<template>
  <div id="mybutton3" class="col-sm-6 mx-auto" style="padding: 9px">
    <input type="button" v-on:click="goToCreatePost" class="feedback" style="margin-right: 5px" value="New Post">
  </div>
  <div id="mybutton4" class="col-sm-6 mx-auto" style="padding: 9px">
    <input type="button" v-on:click="goToMyPosts" class="feedback" style="margin-right: 5px" value="My Posts">
  </div>
  <div id="mybutton5" class="col-sm-6 mx-auto" style="padding: 9px">
      <input type="button" v-on:click="logout" class="feedback" style="margin-right: 5px" value="Logout">
  </div>
  <div class="user-info">
    <h1 id="left">User Profile</h1>
    <p><strong>Email: </strong>{{ this.emailUser }}</p>
    <p><strong>First Name: </strong>{{ this.nameUser }}</p>
    <p><strong>Second Name: </strong>{{ this.secondNameUser }}</p>
  </div>
</template>

<style scoped>
.user-info {
  margin-left: 20px;
  text-align: left;
}

.user-info h2 {
  font-size: 32px;
  margin-bottom: 10px;
}

#mybutton3 {
  position: fixed;
  bottom: 430px;
  right: 5px;
}

#mybutton4 {
  position: fixed;
  bottom: 350px;
  right: 5px;
}

#mybutton5 {
  position: fixed;
  bottom: 10px;
  right: 5px;
}

strong {
  font-weight: bold;
}

</style>

