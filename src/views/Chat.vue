<template>
    <div class="screen">
        <div class="md-layout">
            <div class="md-layout-item md-size-20 scroll">
                <MessagePreviews v-on:chatUpdate="updateChat"/>
            </div>
            <div class="md-layout-item">
                <Message v-bind:chatId="chatId" v-bind:userId="userId"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";

    import {
        MdLayout
    } from "vue-material/dist/components";
    Vue.use(MdLayout);

    import Message from "@/components/Message.vue";
    import MessagePreviews from "@/components/MessagePreviews.vue";

    export default {
        name: "Chat",
        data: () => ({
            chatId: 1,
            userId: null
        }),
        components: {
            'Message' : Message,
            'MessagePreviews': MessagePreviews
        },
        methods: {
            updateChat(chatId) {
                this.chatId = chatId;
            }
        },
        created() {
            this.userId = this.$route.params.userId
            console.log("[Chat.vue] userId: " + this.userId)
        }
    }
</script>


<style lang="scss" scoped>
    .md-layout-item {
        height: 100px;

        &:nth-child(1) {
            border: 1px black;
        }

        &:nth-child(2) {
            border: 1px black;
        }
    }

    .scroll {
        overflow: scroll;
        min-height: 625px;
    }

    .screen {
        overflow: hidden;
    }
</style>