<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div v-for="(message, index) in messages" v-bind:key="index">
      {{message}}
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import axios from "axios";

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data: () => ({
    messages: []
  }),
  methods: {
    getMessages() {
      axios.get('http://localhost:8080/messages', {
        headers: { 'Access-Control-Allow-Origin': '*' }
      })
              .then((response) => {
                this.messages = response.data;
                //console.log("success");
                //console.log( this.messages);
                this.$emit("success");
              })
              .catch(() => {
                //console.log("CATCH [Message.vue]");
              });
    },

  },
  created() {
    this.getMessages();
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
