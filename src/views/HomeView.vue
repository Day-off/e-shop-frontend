<template>
  <div class="home">
    <HelloWorld msg="Here must be our project"/>

    <input v-model="search" placeholder="search ...">

    <div id="mybutton3" class="col-sm-6 mx-auto" style="padding: 9px">
      <input type="button" v-on:click="searchPost" class="feedback" style="margin-right: 5px" value="SEARCH">
    </div>

    <div>
      <h4>Page: {{ this.page + 1 }}</h4>
    </div>
    <div id="mybutton2" class="col-sm-6 mx-auto" style="padding: 9px">
      <input type="button" v-on:click="buttonVariationPrevious" class="feedback" style="margin-right: 5px"
             value="PREVIOUS">
    </div>
    <div id="mybutton" class="col-sm-6 mx-auto" style="padding: 9px">
      <input type="button" v-on:click="buttonVariationNext" class="feedback" style="margin-left: 5px" value="NEXT">
    </div>

    <div v-if="posts.length===0">
      <h3>No posts found</h3>
    </div>
    <div v-for="post of posts" :key="post.id">
      <PostComponent :post="post"></PostComponent>
    </div>
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
  background-color: #31B0D5;
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


<script>
import HelloWorld from "@/components/HelloWorld";
import PostComponent from "@/components/PostComponent";
import axios from "axios";

export default {
  name: 'HomeView',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    HelloWorld,
    // eslint-disable-next-line vue/no-unused-components
    PostComponent
  },
  data() {
    let search;
    let pageTypeUrl;
    return {
      posts: [],
      page: 0,
      search,
      pageTypeUrl
    }
  },

  methods: {

    async buttonVariationNext() {
      if (this.search == null) {
        this.pageTypeUrl = "api/public/?page=" + (this.page + 1) + "&orderBy=id"
        console.log("Not search")
      }
      else {
        this.pageTypeUrl = "api/public?page=" + (this.page + 1) + "&orderBy=id&header=" + this.search
        console.log("search")
      }
      await this.nextPage()
    },

    async buttonVariationPrevious() {
      if (this.search == null || this.search === "") {
        this.pageTypeUrl = "api/public/?page=" + (this.page - 1) + "&orderBy=id"
        console.log("Not search")
      } else {
        this.pageTypeUrl = "api/public?page=" + (this.page - 1) + "&orderBy=id&header=" + this.search
        console.log("search")
      }
      await this.previousPage()
    },

    async searchPost() {
      if ((await axios.get("api/public?page=0&orderBy=id&header=" + this.search)).data.length > 0) {
        this.page = 0
        console.log(this.posts)
      } else {
        console.log("not post found")
      }
      this.posts = (await axios.get("api/public?page=0&orderBy=id&header=" + this.search)).data
    },

    async nextPage() {
      if ((await axios.get(this.pageTypeUrl)).data.length > 0) {
        this.posts = (await axios.get(this.pageTypeUrl)).data
        this.page++
        console.log(this.posts)
      }
    },

    async previousPage() {
      if (this.page > 0) {
        this.posts = (await axios.get(this.pageTypeUrl)).data
        this.page--
        console.log(this.posts)
      }
    },
  },

  async created() {
    this.posts = (await axios.get("api/public/?page=0&orderBy=id")).data;
  },
}
</script>