<script setup>
const props = defineProps(['source','content','datetime','hash', 'hasHeader'])

let pure_date = new Date(props.datetime);

let diff = new Date().getTime() - pure_date.getTime();

let sent_at = (Math.ceil(diff / (1000 * 3600 * 24))) > 1
                ? pure_date.toLocaleDateString('pt-BR')
                : pure_date.toLocaleTimeString('pt-BR').substring(0,5);
</script>

<template>
  <div class="block" :class="hasHeader ? 'mt-2' : ''">
    <div class="message" :class="props.source != 'me' ? 'received' : 'sent'">
      <b class="origin" v-show="hasHeader && props.source != 'me'"> {{props.source}} </b>
      {{props.content}}
      <time>{{sent_at}}</time>
    </div>
  </div>
</template>

<style scoped>
.block {
  display: flex;
  width: 100%;
}
.message {
  border-radius: 4px;
  display: inline-block;
  background-color: var( --cor-mensagem-enviada);
  margin-bottom: 10px;
  margin-left: auto;
  position: relative;
}
.block.mt-2{
  margin-top: 20px;
}
.message .origin {
  display: block;
  font-weight: bold;
  color: rgb(213, 94, 203);
}
.message time { 
  position: absolute;
  bottom: 2px;
  font-size: 0.7em;
}
.message.received time {
  right: 5px;
}
.message.sent time {
  left: 5px;
}
.message.sent {
  padding: 8px 10px 8px 40px;
}
.message.sent::before {
  content: '';
  right: -9px;
  top: 1px;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid var(--cor-mensagem-enviada);
  position: absolute;
}
.message.received::before {
  content: '';
  left: -9px;
  top: 1px;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid var(--cor-mensagem-recebida);
  position: absolute;
}
.message.received {
  margin-left: 0;
  padding: 8px 40px 8px 10px;
  background-color: var(--cor-mensagem-recebida);
}
</style>
