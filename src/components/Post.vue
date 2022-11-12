<template>
  <div class = "container">
    <h1 class="text-center"> Posts List </h1>
    <table class="table table-striped">
      <caption></caption>
      <thead>
      <th> Post Id </th>
      <th> Post Head </th>
      <th> Post Description </th>
      <th> Post Image </th>
      </thead>
      <tbody>
      <tr v-for = "post in posts" v-bind:key = "post.id">
        <td> {{post.postId}}</td>
        <td> {{post.head}}</td>
        <td> {{post.description}}</td>
        <td> {{post.imageLink}}</td>

      </tr>
      </tbody>


    </table>
  </div>
</template>

<script>
import PostService from "@/router/PostService";
export default {

  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Posts',
  data(){
    return {
      posts : []
    }

  },
  methods: {
    getPosts(){
      PostService.getPosts().then((response) =>{
        this.posts = response.data;
      });
    }
  },
  created() {
    this.getPosts()

  }


}
</script>