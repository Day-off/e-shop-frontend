<script>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";
import router from "@/router";


export default {
  data() {
    return {
      postToDelete: {
        id: null,
      },
      user: null,
      posts: [],
      page: 0
    }
  },

  methods: {
    async nextPage() {
      if ((await axios.get("api/public/mypost?page=" + (this.page + 1) + "&orderBy=id" + "&userId=" + this.user.id)).data.length > 0) {
        this.page++
        this.posts = (await axios.get("api/public/mypost?page=" + this.page + "&orderBy=id" + "&userId=" + this.user.id)).data
        console.log(this.posts)
      }
    },

    async previousPage() {
      if (this.page > 0) {
        this.page--
        this.posts = (await axios.get("api/public/mypost?page=" + this.page + "&orderBy=id" + "&userId=" + this.user.id)).data
        console.log(this.posts)
      }
    },

    async viewProduct(postId) {
      localStorage.setItem("postId", postId)
    },
    deletePost(postId) {
      this.postToDelete.id = postId
      console.log("Posts: "+ this.postToDelete.id)
      axios.post('/api/public/delete', this.postToDelete)
    }
  },

  async created() {
    let token = JSON.parse(localStorage.getItem("token"))
    if (token != null) {
      this.user = VueJwtDecode.decode(token);
      this.posts = (await axios.get("api/public/mypost?page=0&orderBy=id&userId=" + this.user.id)).data;
    }
    else {
      alert("You need to login to see your posts")
      router.back();
    }
  },
}
</script>
<template>
  <div>
    <h2><strong>My Posts</strong></h2>
    <h4>Page: {{ this.page + 1 }}</h4>
  </div>
  <div id="mybutton" class="col-sm-6 mx-auto" style="padding: 9px">
    <input type="button" v-on:click="nextPage" class="feedback" style="margin-left: 5px" value="NEXT">
  </div>
  <div id="mybutton2" class="col-sm-6 mx-auto" style="padding: 9px">
    <input type="button" v-on:click="previousPage" class="feedback" style="margin-right: 5px" value="PREVIOUS">
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
        <div id="mybutton3" class="col-sm-6 mx-auto" style="padding: 9px">
          <input type="button" v-on:click="deletePost(post.id)" class="feedback" style="margin-right: 5px" value="Delete">
        </div>
        <strong>{{ post.head }}</strong>
        <div class="hover10">
          <div class="container">
            <figure>
              <img v-bind:src="'/api/public/images/' + post.imageId" class="rounded-card" alt="image">
            </figure>
          </div>
        </div>
        <td>
          <strong>Description: </strong>
          <p> {{ post.description }}</p>
        </td>
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

#mybutton3 {
  position: fixed;
  bottom: 200px;
  right: 5px;
}
strong {
  font-weight: bold;
}
</style>
