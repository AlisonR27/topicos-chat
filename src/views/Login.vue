<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router';

const router = useRouter();

let email = '';
let pass = '';

const API_URL = import.meta.env.VITE_API_URL
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


function login(e) {
  axios.post(`${API_URL}/login`, {
    email,
    pass
  }).then(result => {
    if (result.status == 200) {
      localStorage.setItem('current_user', JSON.stringify(result.data))
      router.push('/chat')
    }
  }).catch(err => {
    window.alert(err);
  })
}
</script>

<template>
  <div class="Login">
    <h1> Login! </h1>
    <form @submit.prevent="login">
      <input placeholder="Email" v-model="email" type="email" required/>
      <br>
      <input placeholder="Senha" v-model="pass" type="password" required/>
      <br>
      <input type="submit" value="Entrar">
    </form>
    <hr>
    <p>Ainda não é cadastrado? <router-link to="register">Cadastrar-se</router-link></p>
  </div>
</template>

<style scoped>
main > b{
  font-size: 10em;
}
</style>
