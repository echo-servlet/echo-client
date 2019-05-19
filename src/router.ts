import Vue from "vue";
import Router from "vue-router";
import Message from "./components/Message.vue";
import Chat from "./views/Chat.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [

        {
            path: "/chat",
            name: "chat",
            component: Chat,
            children: [
                {
                    path: "/message/:chatId",
                    name: "message",
                    component: Message
                }
            ]
        },
    ]
});
