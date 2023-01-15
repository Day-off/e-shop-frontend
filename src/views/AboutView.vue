<template>
  <div class="about-page">
    <div class="about-page__header">
      <h1 class="about-page__title" style="color: white;">About Us</h1>
    </div>
    <div class="about-page__content">
      <p class="about-page__description">Bulletin board - fresh ads of individuals about the sale and purchase of goods of all categories. The easiest way to sell or buy things.</p>
      <div class="about-page__image-container">
        <img class="about-page__image" src="../assets/lolotype.png" alt="About Us">
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.about-page__header {
  background-color: #46b8da;
  padding: 1rem;
}

.about-page__title {
  color: #31B0D5;
  font-size: 2rem;
}

.about-page__content {
  padding: 2rem;
}

.about-page__description {
  color: #666;
  font-size: 1.2rem;
  line-height: 1.5;
  text-align: left;
  margin-bottom: 2rem;
}

.about-page__image-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.about-page__image {
  width: 50%;
}
</style>