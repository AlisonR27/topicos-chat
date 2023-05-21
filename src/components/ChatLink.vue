<script setup>
const props = defineProps(['name', 'hash', 'current'])
</script>

<template>
  <a :href="'/chat/'+props.hash" :class="current ? 'checked' : ''" >
    {{ props.name }}
  </a>
</template>

<style scoped>
a {
  padding: 15px 20px;
  font-size: 1em;
  font-weight: bold;
  text-align: left;
}
a.checked {
  background-color:rgb(7, 141, 96);
  color: #d9d9d9;
}
</style>
