<script setup>
import { useRouter } from 'vue-router';
import axios from 'axios'

let name = '';
let email = '';
let pass = '';

const router = useRouter();

const API_URL = import.meta.env.VITE_API_URL
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


function register(event) {
  event.target[0].blur();
  event.target[1].blur();
  event.target[2].blur();

  axios.post(`${API_URL}/register`, {
    name,
    email,
    pass
  }).then(result => {
    if (result.status = 201) {
      router.push('/login')
    }
  }).catch(e => {
    window.alert(e);
  })
}

</script>

<template>
  <div class="register">
    <h1> Register! </h1>
    <form @submit.prevent="register">
      <input placeholder="Nome" v-model="name" type="text"/>
      <br>
      <input placeholder="Email" v-model="email" type="email"/>
      <br>
      <input placeholder="Senha" v-model="pass" type="password"/>
      <br>
      <input type="submit" value="Registrar">
    </form>
    <hr>
    <p>Já possui conta? <router-link to="login">Entrar</router-link></p>
  </div>
</template>

<style scoped>
main > b{
  font-size: 10em;
}
</style>
