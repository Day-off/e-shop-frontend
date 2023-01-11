<template>
  <div class="row">
    <div class="col-sm-3 mx-auto">
      <h1>Add Post</h1>
      <br>
      <div class="col-md-5">
        <label for="inputHead" class="form-label">Head</label>
        <input type="text" class="form-control" id="inputHead" v-model="posts.head">
      </div>
      <div class="col-md-7">
        <label for="inputImage" class="form-label">Image</label>
        <input type="file" ref="uploadImage" @change="onImageUpload()" class="form-control" required id="inputImage">
        <input type="button" @click="startUpload" name="Upload" value="Upload">
      </div>
      <div class="col-12">
        <label for="inputDescription" class="form-label">Description</label>
        <input type="text" class="form-control" id="inputDescription" v-model="posts.description">
      </div>
      <div class="col-12">
        <button @click="postData" class="btn btn-primary">Create Post</button>
      </div>
    </div>
  </div>
</template>

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
      },
      formData: null,
      uploaded: false
    }
  },
  methods: {
    postData() {
      let token = JSON.parse(localStorage.getItem("token"))
      if (token != null) {
        let userData = VueJwtDecode.decode(token);
        this.posts.userId = userData["id"]
        this.posts = axios.post('/api/posts', this.posts)
      }
      else alert("User not logged in.")
      router.back()
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
};
</script>

<style scoped>
label {
  margin-top: 15px;
}
</style>
