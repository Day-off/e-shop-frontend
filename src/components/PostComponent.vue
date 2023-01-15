<template>
  <div class="col-sm-10 mx-auto">
    <table>
      <caption></caption>
      <tr>
        <th></th>
        <th></th>
        <th></th>
      </tr>

      <strong>{{ post.head }}</strong>
      <div class="hover10">
        <div class="container">
          <figure>
            <div v-if="post.imageId===null">
              <img src="@/assets/logo.png" alt="image"/>
            </div>
            <div v-else>
              <img v-bind:src="'/api/public/images/' + post.imageId" class="rounded-card" alt="image">
            </div>
          </figure>
        </div>
      </div>
      <td>
        <strong>Description: </strong>
        <p> {{ post.description }}</p>
      </td>
    </table>
  </div>
</template>

<script>
export default {
  props: ["post"]
}
</script>

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

strong {
  font-weight: bold;
}
</style>

