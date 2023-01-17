<script>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";
import router from "@/router";


export default {
  data() {
    return {
      order: {
        id: null,
        userId: null,
        postId: null,
        date: null,
        imageId: null
      },
      unreservedPost: {
        id: null
      },
      post: null,
      user: null,
      orders: [],
      page: 0
    }
  },

  methods: {
    async nextPage() {
      if ((await axios.get("api/public/orders/?page=" + (this.page + 1) + "&orderBy=id" + "&userId=" + this.user.id)).data.length > 0) {
        this.page++
        this.orders = (await axios.get("api/public/orders/?page=" + this.page + "&orderBy=id" + "&userId=" + this.user.id)).data
        console.log(this.orders)
      }
    },
    check(image) {
      console.log(image)
    },

    async previousPage() {
      if (this.page > 0) {
        this.page--
        this.orders = (await axios.get("api/public/orders/?page=" + this.page + "&orderBy=id" + "&userId=" + this.user.id)).data
        console.log(this.orders)
      }
    },
    goToCreatePost() {
      router.push("/create")
      router.go(1)
    },
    substring(date) {
      return date.substring(0, 10)
    },
    async unReserveOrder(id) {
      let token = JSON.parse(localStorage.getItem("token"))
      if (token != null ) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token
        await axios.delete('/api/posts/deleteOrder?orderId=' + id)
        location.reload()
      }
      else {
        alert("Can not delete order ! !")
        router.back();
      }
    }
  },
  async created() {
    let token = JSON.parse(localStorage.getItem("token"))
    if (token != null) {
      this.user = VueJwtDecode.decode(token);
      this.orders = (await axios.get("api/public/orders/?&page=0&orderBy=id&userId=" + this.user.id)).data;
      console.log("Posts " + this.orders[0].id)
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
    <h2><strong>My Orders</strong></h2>
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
      <tr v-for="order of orders" :key="order.id">
        <strong>{{ substring(order.date) }}</strong>
        <div class="hover10">
          <div class="container">
            <figure>
              <img v-bind:src="'/api/public/images/' + order.imageId" class="rounded-card" alt="image">
            </figure>
          </div>
        </div>
        <td>
          <strong>Your order has nr: </strong>
          <p> {{ order.postId }}</p>
        </td>
        <div class="col-sm-4-auto" style="padding: 9px">
          <br>
          <input type="button" v-on:click="unReserveOrder(order.id)" class="feedback" style="margin-right: 5px" value="Cancel reservation">
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

.feedback2 {
  background-color : lightcoral;
  color: white;
  padding: 10px 20px;
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
