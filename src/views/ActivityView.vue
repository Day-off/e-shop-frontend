<template>
  <div class="row">
    <div class="col-sm-3 mx-auto">
      <h3>Activities for today!</h3>
      <br>
      <div class="col-sm-6 mx-auto" style="padding: 1px">
        <input type="submit" v-on:click="getActivity" class="feedback" value="Next Activity">
      </div>
      <div>
        <br>
        <p><strong>Activity: </strong> {{ this.activity }}</p>
      </div>
      <div class="activity-page__image-container">
        <img class="activity-page__image" src="../assets/picture.jpg" alt="About Us">
      </div>
      <div class="activity-page__image-container">
        <br>
        <img class="activity-page__image" src="../assets/pic2.jpg" alt="About Us">
      </div>
      <br>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  data(){
    return {
      activity: ""
    }
  },
  methods: {
    getActivity() {
      location.reload()
      this.activity = axios.get('/api/public/activity')
      console.log(this.activity)
    }
  },

  async created() {
    try {
      let response = await axios.get('/api/public/activity');
      this.activity = response.data;
    } catch (e) {
      console.error(e);
    }
  }
}
</script>

<style scoped>


.activity-page__image-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.activity-page__image {
  width: 120%;
}

</style>