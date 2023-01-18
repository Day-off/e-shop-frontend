<template>
  <div class="col-sm-10 mx-auto">
    <table>
      <caption></caption>
      <tr>
        <th></th>
        <th></th>
        <th></th>
      </tr>

      <strong>{{ post.head }}</strong>
      <div class="hover10">
        <div class="container">
          <figure>
            <div v-if="post.imageId===null">
              <img src="@/assets/logo.png" alt="image"/>
            </div>
            <div v-else>
              <img v-bind:src="'/api/public/images/' + post.imageId" class="rounded-card" alt="image">
            </div>
          </figure>
        </div>
      </div>
      <td>
        <strong>Description: </strong>
        <p> {{ post.description }}</p>
      </td>
      <div class="col-sm-4-auto" style="padding: 9px">
        <br>
        <input type="button" v-on:click="buyPost(post.id, post.userId, post.imageId)" class="feedback" style="margin-right: 5px" value="Reserve">
      </div>
    </table>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import axios from "axios";
import router from "@/router";

export default {
  props: ["post"],
  data() {
    return{
      postToBuy: {
        postId: null,
        userId: null,
        available: null,
        imageId: null
      }
    }
  },
  methods:{

    buyPost(id, userId, imageId) {
      let token = JSON.parse(localStorage.getItem("token"))
      if (token != null) {
        let userData = VueJwtDecode.decode(token);
        this.postToBuy.userId = userData["id"]
        if (this.postToBuy.userId !== userId) {
          axios.defaults.headers.common["Authorization"] = "Bearer " + token
          this.postToBuy.postId = id
          this.postToBuy.imageId = imageId
          console.log("Post to buy: "+ this.postToBuy.postId)
          console.log("User who buys : "+ this.postToBuy.userId)
          axios.get('/api/posts/buy?&postId=' + this.postToBuy.postId + "&userId=" + this.postToBuy.userId + "&imageId=" + this.postToBuy.imageId)
          console.log(this.posts)
          location.reload()
        }
        else {
          alert("You can not buy your own post!")
          location.reload()
        }
      }
      else {
        alert("You need to login to buy posts!")
        router.back()
      }
    }
  }
}
</script>

<style scoped>

table {
}


img {
  max-height: 300px;
  max-width: 300px;
  height: auto;
  width: auto;
  padding: 20px;
}

strong {
  font-weight: bold;
}
</style>

