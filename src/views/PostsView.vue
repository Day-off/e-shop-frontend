<script>
import axios from "axios";
import router from "@/router";
import VueJwtDecode from "vue-jwt-decode";

export default {
  data() {
    return {
      postToBuy: {
        postId: null,
        userId: null,
        available: null,
        imageId: null
      },
      posts: [],
      page: 0
    }
  },

  methods: {
    async nextPage() {
      if ((await axios.get("api/public/?page=" + (this.page + 1) + "&orderBy=id")).data.length > 0) {
        this.page++
        this.posts = (await axios.get("api/public/?page=" + this.page + "&orderBy=id")).data
        console.log(this.posts)
      }
    },

    async previousPage() {
      if (this.page > 0) {
        this.page--
        this.posts = (await axios.get("api/public/?page=" + this.page + "&orderBy=id")).data
        console.log(this.posts)
      }
    },
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
  },
  async created() {
    this.posts = (await axios.get("api/public/?page=0&orderBy=id")).data;
  },
}
</script>
<template>
  <div>
    <h2><strong>Here you can see all the available  posts</strong></h2>
    <h4>Page: {{ this.page + 1 }}</h4>
  </div>
  <div id="mybutton2" class="col-sm-6 mx-auto" style="padding: 9px">
    <input type="button" v-on:click="previousPage" class="feedback" style="margin-right: 5px" value="PREVIOUS">
  </div>
  <div id="mybutton" class="col-sm-6 mx-auto" style="padding: 9px">
    <input type="button" v-on:click="nextPage" class="feedback" style="margin-left: 5px" value="NEXT">
  </div>

  <div class="col-sm-10 mx-auto">
    <table>
      <caption></caption>
      <tr>
        <th></th>
        <th></th>
        <th></th>
      </tr>
      <tr v-for="post of posts" :key="post.id">
        <strong>{{ post.head }}</strong>
        <div class="hover10">
          <div class="container">
            <div v-if="post.imageId===null">
              <img src="@/assets/logo.png" alt="image"/>
            </div>
            <div v-else>
              <img v-bind:src="'/api/public/images/' + post.imageId" class="rounded-card" alt="image">
            </div>
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
      </tr>
    </table>
  </div>
</template>

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


.feedback {
  background-color : #31B0D5;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  border-color: #46b8da;
}

#mybutton {
  position: fixed;
  bottom: -4px;
  right: 5px;
}

#mybutton2 {
  position: fixed;
  bottom: -4px;
  left: 5px;
}
strong {
  font-weight: bold;
}
</style>
