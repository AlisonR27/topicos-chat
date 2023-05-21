<script setup>
import { computed, onBeforeMount, onMounted, reactive } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import Chat from '../../components/ChatLink.vue'
import NewChatPrompt from '../../components/NewChatPrompt.vue'
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL

const route = useRoute();

const data = reactive({
  promptIsOpen: false,
  chats: [],
  user: {}
})
onMounted(() => {
  axios.get(`${API_URL}/chats`)
    .then(response => {
      data.chats = response.data
      console.log(data.chats)
  })
  data.user = JSON.parse(localStorage.getItem('current_user'))
})
const currentChat = null


const logout = () => {
  localStorage.removeItem('current_user');
  window.location.reload();
}
</script>

<template>
  <div class="main-view">
    <new-chat-prompt v-if="data.promptIsOpen" :isOpen="data.promptIsOpen" @voltar="data.promptIsOpen = false"/>
    <div  v-if="data.chats.length > 0" class="chats">      
      <!-- <a> Criar uma nova conversa. </a> -->
      <Chat v-for="chat in data.chats" :current="route.params.id == chat.id" :key="chat.id" :name="chat.name" :hash="chat.id"/>
      <div class="user-data">
        <img src="" alt="" class="user-img">
        {{data.user.name}}
        <button @click="logout"> Sair </button>
      </div>
    </div>
    <div v-else class="chats">
        <b>  Sem chats para exibir </b>
        <button href="" @click="data.promptIsOpen = true"> Criar uma nova conversa. </button>
      <div class="user-data">
        <img src="" alt="" class="user-img">
        {{data.user.name}}
        <button @click="logout"> Sair </button>
      </div>
    </div>
    <div class="chat">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>

html {
  font-family: sans-serif;
}
.main-view {
  width:100%;
  height: 80vh;
  display: flex;
}
.main-view > .chats {
  background: rgba(255,255,255,.05);
  width:calc(100% / 3);
  display: flex;
  flex-direction: column;
}
.main-view > .chat {
  height:100%;
  background: rgba(255,255,255,.02);
  padding: 30px 25px;
  padding-right: 10px;
  min-width: 66%;
}
.user-data {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  justify-self: flex-end;
  margin-top: auto;
  padding-bottom: 15px;
}
.user-data img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

</style>