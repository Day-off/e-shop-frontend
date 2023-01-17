<script>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";
import router from "@/router";

export default {
  data(){
    return {
      posts: {
        userId: null,
        head: null,
        description: null,
        imageId: null,
        isAvailable: null,
        email: null
      },
      formData: null,
      uploaded: false,
      emailUser: ""
    }
  },
  methods: {
    async postData() {
      let token = JSON.parse(localStorage.getItem("token"))
      if (token != null) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token
        if (this.uploaded !== false && this.posts.description !== null && this.posts.head !== null){
          let userData = VueJwtDecode.decode(token);
          this.posts.userId = userData["id"]
          this.posts.email = userData["email"]
          this.posts = axios.post('/api/posts', this.posts)
          this.uploaded = false;
          await router.push("/myposts")
        }
        else {
          alert("Parameters are missed or image is not uploaded !")
        }
      }
      else {
        alert("User not logged in.")
      }
    },
    onImageUpload() {
      let file = this.$refs.uploadImage.files[0];
      this.formData = new FormData();
      this.formData.append("file", file);
    },
    startUpload() {
      axios({
        url: "/api/public/images",
        method: "POST",
        data: this.formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data"
        },
      })
      this.uploaded = true;
    },
  },
  async created() {
    let token = JSON.parse(localStorage.getItem("token"))
    if (token != null) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token
      let userData = VueJwtDecode.decode(token);
      this.emailUser = userData["email"];
      console.log("User email : " + this.emailUser)
    } else {
      alert("You need to sign up !")
      router.back()
    }
  }
};
</script>

<template>
  <div class="row">
    <div class="col-sm-3 mx-auto">
      <h1>Create a new Post</h1>
      <br>
      <div class="col-form-label-sm">
        <label for="inputHead" class="form-label">Head</label>
        <input type="text" class="form-control" id="inputHead" v-model="posts.head">
      </div>
      <div class="col-md-12">
        <label for="inputImage" class="form-label">Image</label>
        <input type="file" ref="uploadImage" @change="onImageUpload()" class="form-control" required id="inputImage">
        <input type="button" class="feedback" @click="startUpload" name="Upload" value="Upload">
      </div>
      <div class="col-12">
        <label for="inputDescription" class="form-label">Description</label>
        <input type="text" class="form-control" id="inputDescription" v-model="posts.description">
      </div>
      <div class="col-12">
        <button @click="postData" class="feedback">Create Post</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
label {
  margin-top: 15px;
}

.feedback {
  background-color : #31B0D5;
  color: white;
  padding: 5px 8px;
  border-radius: 4px;
  border-color: #46b8da;
}
</style>
