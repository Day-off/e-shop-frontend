<script>
import axios from "axios";

export default {
  data() {
    return {
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

    async viewProduct(postId) {
      localStorage.setItem("postId", postId)
    }
  },

  async created() {
    this.posts = (await axios.get("api/public/?page=0&orderBy=id")).data;
  },
}
</script>

<template>
  <div>
    <h4>Here you can see all the available  posts</h4>
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
        <td>
          <div class="hover10">
            <div class="container">
              <figure>
                <img v-bind:src="'/api/public/images/' + post.imageId" class="rounded-card" alt="image" v-on:click="viewProduct(post.id)">
                <div class="text-centered">VIEW POST</div>
              </figure>
            </div>
          </div>
        </td>
        <td>
          <ul class="nav-fill">
            <li>{{ post.description }}</li>
          </ul>
        </td>
        <ul class="nav-fill">
          <li>{{ post.head }}</li>
        </ul>
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
ul.nav-fill {
  list-style-type: none;
  padding: 0;
  margin: 0;
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
</style>
