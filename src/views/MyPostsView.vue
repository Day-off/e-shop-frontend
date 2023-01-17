<script>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";
import router from "@/router";


export default {
  data() {
    return {
      postToDelete: {
        id: null,
        isavailable: null
      },
      postToUpdate: {
        id: null,
        header: null
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
    async deletePost(postId, isavailable) {
      let token = JSON.parse(localStorage.getItem("token"))
      if (token != null && isavailable !== false) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token
        this.postToDelete.id = postId
        this.postToDelete.isavailable = isavailable
        console.log("Posts: "+ this.postToDelete.id)
        console.log("Post available: "+ this.postToDelete.isavailable)
        await axios.post('/api/posts/delete', this.postToDelete)
        location.reload()
      }
      else {
        alert("Can not delete reserved post !")
        router.back();
      }
    },
    updateHeader(id, header) {
      let token = JSON.parse(localStorage.getItem("token"))
      if (token != null) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token
        axios.get('/api/posts/update?&id=' + id + "&header=" + header)
        location.reload()
      }
    },
    goToCreatePost() {
      router.push("/create")
      router.go(1)
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
    <input type="button" v-on:click="nextPage" class="feedback2" style="margin-left: 5px" value="NEXT">
  </div>
  <div id="mybutton2" class="col-sm-6 mx-auto" style="padding: 9px">
    <input type="button" v-on:click="previousPage" class="feedback2" style="margin-right: 5px" value="PREVIOUS">
  </div>
  <div id="mybutton3" class="col-sm-6 mx-auto" style="padding: 9px">
    <input type="button" v-on:click="goToCreatePost" class="feedback2" style="margin-right: 5px" value="Create New Post">
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
            <figure>
              <img v-bind:src="'/api/public/images/' + post.imageId" class="rounded-card" alt="image">
            </figure>
          </div>
        </div>
        <td>
          <strong>Description: </strong>
          <p> {{ post.description }}</p>
        </td>
        <div class="col-form-label-sm">
          <label for="inputHead" class="form-label">Head</label>
          <input type="text" class="form-control" id="inputHead" v-model="post.header">
        </div>
        <div class="col-sm-4-auto" style="padding: 9px">
          <br>
          <input type="button" v-on:click="updateHeader(post.id, post.header)" class="feedback" style="margin-right: 5px" value="Update Header">
        </div>
        <div class="col-sm-4-auto" style="padding: 9px">
          <br>
          <input type="button" v-on:click="deletePost(post.id, post.isAvailable)" class="feedback" style="margin-right: 5px" value="Delete">
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
  padding: 8px 8px;
  border-radius: 4px;
  border-color: #46b8da;
}

.feedback2 {
  background-color : lightcoral;
  color: white;
  padding: 8px 8px;
  border-radius: 4px;
  border-color: lightcoral;
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
  bottom: 100px;
  right: 5px;
}

#mybutton4 {
  position: fixed;
  bottom: 100px;
  left: 1px;
}
strong {
  font-weight: bold;
}
</style>
