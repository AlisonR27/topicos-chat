<script setup>
import { nextTick, onBeforeMount, onMounted, reactive, ref, watch } from 'vue'
import { state, socket } from "../../socket";
import { useRoute } from 'vue-router'

import Message from '../../components/Message.vue'
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL

const route = useRoute()

const currentId = route.params.id

let msg = ""

let chat = ref(0)

let lastSender = null;

const user = JSON.parse(localStorage.getItem('current_user'))

const data = reactive({
  chat,
  lastSender
})

function beep() {
  const beeping = new Audio(`${window.location.origin}/whatsapp_whistle.mp3`);
  beeping.play();
}

function organizeNames() {
  var last = null;
  data.chat.history.forEach(msg => {
    if (last != msg.by) {
      last = msg.by;
      msg.hasHeader = true;
    }
    else {
      msg.hasHeader = false;
    } 
  })
}

onBeforeMount(async () => {
  await axios.get(`${API_URL}/chats/${currentId}`)
    .then(response => {
      data.chat = response.data
  })
  organizeNames();
})

onMounted(() => {
  socket.connect();
  socket.on(`message.chat.${route.params.id}`, (...args) => {
    const incoming = JSON.parse(args)
    if (incoming.by !== user.email) beep();

    data.chat.history.push(incoming)

    organizeNames();

    // Esperar atualização acontecer para descer
    nextTick(()=> {
      const chatEl = document.querySelector('#chat')
      chatEl.scroll({
        top: chatEl.scrollHeight,
        behavior: 'smooth'
      })
    })
  })
})


async function handleSubmit(event) {
  await axios.post(`${API_URL}/chats/${currentId}/message`, {
    by: user.email,
    datetime: new Date(),
    content: this.msg
  })
  this.msg = '';
}


</script>

<template>
  <div id="chat-holder" style="height: 100%; display:grid; grid-auto-rows: 1fr 9fr;">
    <header class="chat-name">
    {{ chat.name }}
    </header>
    <main id="chat">
      <Message v-for="message in chat.history" :hasHeader="message.hasHeader" :key="message.hash" :content="message.content" :datetime="message.datetime" :source="message.by == user.email ? 'me' : message.by"/>
    </main>
    <footer>
      <form @submit.prevent="handleSubmit()" id="send-message">
        <input type="text" name="msg" v-model="msg" placeholder="Escreva sua mensagem..." id="msg">
        <button type="submit">send</button>
      </form>
    </footer>
  </div>
</template>

<style  scoped>
#beep_sound {
  display: none;
  position: absolute;
  width: 0;
}
div {
  text-align: left;
}
div > b{
  display: block;
  font-size: 4em;
}
.chat-name {
  font-size: 1.4em;
  font-weight: bold;
  border-bottom: 2px solid #333;
}
#chat {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  align-self: end;
  width:100%;
  height:100%;
  padding: 5px 25px 10px 20px;
  overflow-y:scroll;
}
#chat::-webkit-scrollbar {
  width: 5px;
}
#chat::-webkit-scrollbar-thumb {
  background: #3d3d3d;
  border-radius: 5px;
}
#chat-holder {
  height:100%;
  /* display: grid;
  grid-auto-rows: 1fr 9fr; */
}
#chat footer {
  width: 100%;
}
#send-message input {
  padding: 10px 20px;
  width:80%;
  border-radius: 20px;
  background: transparent;
  border: 1px solid #f9f9f9;
  color: white;
}
#send-message button {
  padding: 10px 20px;
  background: transparent;
  color: white;
  border-radius: 50px;
  border: 1px solid white;
}
#send-message button:hover {
  background-color: white;
  color: black;
  cursor: pointer;
}
</style>