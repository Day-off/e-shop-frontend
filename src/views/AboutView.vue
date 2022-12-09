<template>
  <div id="users">
    <div class="col-sm-3 mx-auto">
      <figure>
        <figcaption>Users</figcaption>
        <table>
          <tr>
            <th>ID</th>
            <th>First name</th>
            <th>Last name</th>
          </tr>
          <tr v-for="user of users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
          </tr>
        </table>
      </figure>
    </div>
  </div>

  <div id="products">
    <div class="col-sm-3 mx-auto">
      <figure>
        <figcaption>Products</figcaption>
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
          <tr v-for="product of products" :key="product.head">
            <td>{{ product.head }}</td>
            <td>{{ product.description }}</td>
          </tr>
        </table>
      </figure>
    </div>
  </div>
</template>

<style>
#users { position: absolute; left: 0; top: 10%; width: 70%; }
#products { position: absolute; right: 0; top: 10%; width: 70%; }

figcaption {
  font-size: 35px
}

table {
  border-collapse: separate;
  border-spacing: 0 20px;
  font-size: 20px;
  word-break: break-word;
}
th {
  border-bottom: 1px solid #3a3a3a;
}
td {
  width: 150px;
  text-align: center;
  padding: 5px;
  border-bottom: 1px solid #ababab;
}
tr {

}
tr:hover {
  background-color: #D6EEEE;
}
</style>

<script>
import axios from "axios";

export default {
  data(){
    return {
      users: [],
      posts: []
    }
  },
  async created() {
    let token = JSON.parse(localStorage.getItem("token"));
    let response = await axios.get('/api/public/posts');
    this.posts = response.data;
    if (token != null) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token
      response = await axios.get('/api/users');
      this.users = response.data;
    }
  }
}
</script>
