<script setup>
import { onBeforeMount, reactive } from "vue";
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL

let users = [];

const data = reactive({
  users: [],
  selectedUser: 0
})

const props = defineProps(['isOpen'])

onBeforeMount(()=> {
  const currentUser = JSON.parse(localStorage.getItem('current_user'))
  axios.get(`${API_URL}/users/`)
    .then((response) => {
      data.users = response.data.filter(user => user.email != currentUser.email)
    })
})

function startChat() {
  axios.post(`${API_URL}`)
}
</script>

<template>
  <dialog :class="props.isOpen ? 'opened': ''">
    <button @click="$emit('voltar')" style=""> Voltar </button>
    <h1>Iniciando nova conversa:</h1>
    <select name="target" v-model="data.selectedUser" :disabled="data.users.length > 0 ? false : true">
      <option selected disabled value="0">Selecione uma opção</option>
      <option v-for="user in data.users" :key="user.email" :value="user.email"> {{ user.name }} </option>
    </select>
    <button :disabled="data.selectedUser == 0" @click="startChat"> Conversar </button>
  </dialog>
</template>

<style scoped>
dialog {
  display: none;
  position: absolute;
  width: 70%;
  height: 40%;
  z-index: 9999;
  left:15%;
}
dialog.opened {
  display: block;
}
</style>