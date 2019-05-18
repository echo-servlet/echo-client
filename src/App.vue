<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div>hi shannon</div>
    <div v-for="(message, index) in messages" v-bind:key="index">
      {{message}}
    </div>
  </div>
</template>

<script>
  import axios from "axios";
export default {
  name: "App",
  data: () => ({
    messages: []
  }),
  methods: {
    getMessages() {
      axios
              .get("https://echo-servlet.herokuapp.com/messages")
              .then((response) => {
                this.messages = response.data;
                this.$emit("success");
              })
              .catch(() => {
              });
    },

  },
  created() {
    this.getMessages();
  }
};
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
