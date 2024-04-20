<script setup lang="ts">
import { ref } from 'vue'
/*defineProps<{
  msg: string
}>()*/
</script>

<template>
  <div class="bands">
    <div class="bar first"></div>
    <div class="bar second"></div>
    <div class="bar third"></div>
    <div class="bar fourth"></div>
    <div class="bar fifth"></div>
  </div>
</template>

<style scoped>
.bands {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}

.bar {
  flex: 1;

  animation: slideIn 2s forwards;
}

.bar.second, .bar.fourth {
  animation: slideInFromLeft 2s forwards;
}

@keyframes slideIn {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes slideInFromLeft {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

.first {
  background-color: #b52327;
}

.second {
  background-color: #ef6638;
}

.third {
  background-color: #fdbe4f;
}

.fourth {
  background-color: #2088a7;
}

.fifth {
  background-color: #711931;
}
</style>
