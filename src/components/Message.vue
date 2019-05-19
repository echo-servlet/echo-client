<template>
    <div class="container" v-chat-scroll>
        <div class="message-content">
            <div class="message-content__item" v-for="(message, index) in messages" v-bind:key="index">
                <div v-if="message.userId==1">
                    <div class="outgoing">
                        <div class="box-text">{{message.message}}</div>
                        <div class="time">{{getDate(message.date)}}</div>
                    </div>
                </div>
                <div v-else>
                    <div class="incoming">
                        <div class="box-text">{{message.message}}</div>
                        <div class="time">{{getDate(message.date)}}</div>
                    </div>
                </div>
            </div>
            <div class="message-form">
                <input v-model="newMessage">
                <button v-on:click="sendMessage">send</button>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from "moment";
    import axios, { AxiosResponse, AxiosError } from "axios";
    export default {
        name: "Message",
        props: ['chatId', 'userId'],
        data: () => ({
            messages: [],
            newMessage: "",
            cId: 1
        }),
        watch: {
            chatId: function () {
                this.cId = this.chatId;
                this.getMessages();
            }
        },
        methods: {
            getDate(date) {
                const formattedDate = moment(date).format("hh:mm");
                return formattedDate;
            },
            getMessages() {
                axios
                    .get("https://echo-servlet.herokuapp.com/messages/" + this.cId)
                    .then((response) => {
                        this.messages = response.data;
                        console.log("success");
                        this.$emit("success");
                    })
                    .catch(() => {
                        console.log("[Message.vue]");
                    });
            },
            sendMessage() {
                console.log;
                axios
                    .post("https://echo-servlet.herokuapp.com/message", {
                        date: new Date(),
                        message: this.newMessage,
                        chatId: this.chatId,
                        userId: this.userId
                    })
                    .then((response) => {
                        console.log(
                            "[Message.vue] new message" + JSON.stringify(response.data)
                        );
                        this.newMessage = "";
                        this.messages.push(response.data);
                    })
                    .catch((response) => {
                        console.log("[Message.vue] message error");
                    });
            },

        },
        created() {
            this.getMessages();
        }
    };
</script>

<style scoped>
    .page{
        overflow-y: scroll;

        width:150px;
        height:150px;
        transform:rotateX(180deg);
        -moz-transform:rotateX(180deg); /* Mozilla */
        -webkit-transform:rotateX(180deg); /* Safari and Chrome */
        -ms-transform:rotateX(180deg); /* IE 9+ */
        -o-transform:rotateX(180deg); /* Opera */
    }
    .sub{
        transform:rotateX(180deg);
        -moz-transform:rotateX(180deg); /* Mozilla */
        -webkit-transform:rotateX(180deg); /* Safari and Chrome */
        -ms-transform:rotateX(180deg); /* IE 9+ */
        -o-transform:rotateX(180deg); /* Opera */
    }

    .container {
        align-self: center;
        position: fixed;
        min-height: 600px;
        max-height: 600px;
        min-width: 800px;
        max-width: 800px;
        border-style: double;
        padding: 10px;
        overflow-y: scroll;
    }
    .message-content {
        border-radius: 7px;
        width: 100%;
        height: 100%;
        float: center;

        /* position: relative; */
        /*line-height: 5px;*/
        /* margin-left: 15px;*/
    }
    .incoming {
        text-align: left;
    }
    .incoming .time {
        right: 0;
    }
    .outgoing {
        text-align: right;
    }
    .outgoing .time {
        left: 0;
    }
    .incoming .box-text {
        background: #f0f2f4;
        display: inline-block;
        padding: 20px 15px;
        padding-right: 50px;
        font-size: 16px;
        color: #535357;
        border-radius: 7px;
        max-width: 60%;
        margin-top: 10px;
        text-align: left;
        position: relative;
        margin-bottom: 20px;
        word-wrap: break-word;
    }

    .outgoing .box-text {
        background: lightblue;
        display: inline-block;
        padding: 20px 15px;
        padding-right: 50px;
        font-size: 16px;
        color: #535357;
        border-radius: 7px;
        max-width: 60%;
        margin-top: 10px;
        text-align: left;
        position: relative;
        margin-bottom: 20px;
        word-wrap: break-word;
    }
    .outgoing .time {

        bottom: -25px;
        font-size: 13px;
        color: #939397;
        margin-top: -18px;
    }
    .incoming .time {
        bottom: -25px;
        font-size: 13px;
        color: #939397;
        margin-top: -18px;
    }

    .message-form {
        height: 75px;
        border-top: 1px solid #e0e2e4;
        margin: 10px;
        padding: 20px 15px;
        bottom: 0;
        position: fixed;
    }
    .message-form input {
        width: calc(100% - 50px);
        border-style: solid;
        font-size: 16px;
        margin-top: 5px;
    }

</style>
