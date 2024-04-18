<script setup lang="ts">
/*defineProps<{
  msg: string
}>()*/
</script>

<template>
  <div class="card">
    <div class="letters">
        <div><span>S</span></div>
        <div><span>A</span></div>
        <div><span>M</span></div>
        <div><span>G</span></div>
        <div><span>O</span></div>
    </div>
    <!-- Bingo Tile -->
  </div>
</template>

<style scoped>
@font-face {
  font-family: "Keep on Truckin";
  src: local("Keep on Truckin"), url(@/assets/fonts/keept___.ttf) format("truetype");
}

.card {
  background-color: #f76564;
  border-radius: 24px;

  height: 92px;
  padding: 0x 12px 0px 12px;
}

.letters {
  font-family: "Keep on Truckin", 'Times New Roman', Times, serif;
  font-weight: bold;
  font-size: 64px;

  color: white;

  > div {
    float: left;
    margin: 0 12px 0 12px;
    text-align: center;
  }
}

/*@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}*/
</style>
