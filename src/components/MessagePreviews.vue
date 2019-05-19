<template>
    <div>
        <md-toolbar :md-elevation="1">
      <span class="md-title">
        Chats
        <md-button class="button-group" v-on:click="createChat">
          <md-icon>add_circle_outline</md-icon>
        </md-button>
      </span>
        </md-toolbar>
        <div class="viewport">
            <md-list class="md-double-line">
                <div v-for="(chat, index) in chats" v-bind:key="index">
                    <router-link :to="{ name: 'message', params: { chatId: chat.id } }">
                        <md-button v-on:click="displayChat(chat.id)">
                            <md-list-item class="chat_section">
                                <md-icon>group</md-icon>
                                <span>
                  <md-subheader>{{chat.title}}</md-subheader>
                </span>
                            </md-list-item>
                        </md-button>
                    </router-link>
                    <div class="divider">
                        <md-divider></md-divider>
                    </div>
                </div>
            </md-list>
        </div>
    </div>
</template>

<script>
    import axios, { AxiosResponse, AxiosError } from "axios";
    export default {
        name: "MessagePreviews",
        data: () => ({
            chats: []
        }),
        methods: {
            getChats() {
                axios
                    .get("https://echo-servlet.herokuapp.com/chat")
                    .then((response) => {
                        this.chats = response.data;
                        console.log("success");
                        this.$emit("success");
                    })
                    .catch((res) => {
                        console.log("[MessagePreviews.vue]");
                    });
            },
            createChat() {
                axios
                    .post("https://echo-servlet.herokuapp.com/chat", {
                        groupId: 0,
                        title: "Gina"
                    })
                    .then((response) => {
                        console.log(
                            "[MessagePreviews.vue] new chat" + JSON.stringify(response.data)
                        );
                        this.chats.push(response.data);
                    })
                    .catch((response) => {
                        console.log("[MessagePreviews.vue] chat error");
                    });
            },
            displayChat(chatId) {
                console.log("displaying chat #" + chatId)
                this.$emit("chatUpdate", chatId);
            }
        },
        created() {
            this.getChats();
        }
    };
</script>

<style lang="scss" scoped>
    .viewport {
        width: 320px;
        max-width: 100%;
        max-height: 500px;
        display: inline-block;
        vertical-align: top;
        overflow-y: scroll;
        border: 1px solid rgba(#000, 0.12);
    }

    .button-group {
        position: absolute;
        right: 0px;
        margin: 0;
    }

    .divider {
        display: block;
        margin: 10px 0 10px 0;
        border-top: 1px solid rgba(0, 0, 0, 0.12);
        width: 100%;
    }

</style>
