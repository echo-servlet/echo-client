<!--<template>-->
<!--  <div id="app">-->
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
<!--    <div>hi shannon</div>-->
<!--    <div v-for="(message, index) in messages" v-bind:key="index">-->
<!--      {{message}}-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--  import axios from "axios";-->
<!--export default {-->
<!--  name: "App",-->
<!--  data: () => ({-->
<!--    messages: []-->
<!--  }),-->
<!--  methods: {-->
<!--    getMessages() {-->
<!--      axios-->
<!--              .get("https://echo-servlet.herokuapp.com/messages")-->
<!--              .then((response) => {-->
<!--                this.messages = response.data;-->
<!--                this.$emit("success");-->
<!--              })-->
<!--              .catch(() => {-->
<!--              });-->
<!--    },-->

<!--  },-->
<!--  created() {-->
<!--    this.getMessages();-->
<!--  }-->
<!--};-->
<!--</script>-->


<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary" md-elevation="0">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Echo Messenger</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>Navigation</span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
<!--          <router-link to="/chat" tag="li">-->
            <router-link :to="{ name: 'chat', params: { userId: userId } }" tag="li">
            <md-list-item @click="changeActive(0)">
              <md-icon v-if="active==0" class="nav_button_active">chat_bubble</md-icon>
              <md-icon v-if="active!=0" class="nav_button">chat_bubble</md-icon>

              <span class="md-list-item-text">Messages</span>
            </md-list-item>
          </router-link>

          <router-link to="/contacts" tag="li">
            <md-list-item @click="changeActive(1)">
              <md-icon v-if="active==1" class="nav_button_active">perm_contact_calendar</md-icon>
              <md-icon v-if="active!=1" class="nav_button">perm_contact_calendar</md-icon>
              <span class="md-list-item-text">Contacts</span>
            </md-list-item>
          </router-link>

          <router-link to="/my-profile" tag="li">
            <md-list-item @click="changeActive(2)">
              <md-icon v-if="active==2" class="nav_button_active">account_circle</md-icon>
              <md-icon v-if="active!=2" class="nav_button">account_circle</md-icon>
              <!-- <md-icon class="nav_button">account_circle</md-icon> -->
              <span class="md-list-item-text">Profile</span>
            </md-list-item>
          </router-link>
        </md-list>
        <GoogleLogin
                v-if="!isLoggedIn"
                :params="params"
                :onSuccess="onSuccess"
                :onFailure="onFailure"
        >Login</GoogleLogin>
        <button v-else v-on:click="logout()">
          <GoogleLogin :params="params" :logoutButton="true">Logout</GoogleLogin>
        </button>
      </md-app-drawer>
      <md-app-content>
        <router-view class="container"/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
  import Vue from "vue";
  import VueChatScroll from "vue-chat-scroll";
  import axios from "axios";
  import { GoogleLogin, LoaderPlugin } from "vue-google-login";
  import {
    MdApp,
    MdDrawer,
    MdToolbar,
    MdButton,
    MdIcon,
    MdList,
    MdContent,
    MdSubheader,
    MdDivider,
    MdAvatar
  } from "vue-material/dist/components";

  Vue.use(MdApp);
  Vue.use(MdDrawer);
  Vue.use(MdToolbar);
  Vue.use(MdButton);
  Vue.use(MdIcon);
  Vue.use(MdList);
  Vue.use(MdContent);
  Vue.use(MdSubheader);
  Vue.use(MdDivider);
  Vue.use(MdAvatar);
  Vue.use(VueChatScroll);
  Vue.use(GoogleLogin);
  Vue.use(LoaderPlugin, {
    client_id:
            "474603672707-q9fsarap9hqa131ilol56dg7vc1vrfob.apps.googleusercontent.com"
  });
  // Vue.GoogleAuth.then(auth2 => {
  //   console.log(auth2.isSignedIn.get());
  // });

  export default {
    name: "App",
    components: {
      GoogleLogin: GoogleLogin
    },
    data: () => ({
      menuVisible: false,
      active: null,
      isLoggedIn: null,
      userId: null,
      params: {
        client_id:
                "474603672707-q9fsarap9hqa131ilol56dg7vc1vrfob.apps.googleusercontent.com"
      }
    }),
    methods: {
      toggleMenu() {
        this.menuVisible = !this.menuVisible;
      },
      changeActive(num) {
        this.active = num;
      },
      onSuccess(googleUser) {
        console.log(googleUser);
        console.log(googleUser.getBasicProfile());
        this.isLoggedIn = true;
        this.getUser(googleUser);
      },
      getUser(googleUser) {
        var profile = googleUser.getBasicProfile();
        axios
                .post("https://echo-servlet.herokuapp.com/user", {
                  email: profile.U3,
                  firstName: profile.ofa,
                  lastName: profile.wea,
                  picture: profile.Paa
                })
                .then((response) => {
                  console.log(
                          "[MessagePreviews.vue] new user: " + JSON.stringify(response.data)
                  );
                  this.userId = response.data.id;
                  console.log("current user: " + this.userId);
                })
                .catch(() => {
                  console.log("[MessagePreviews.vue] login backend error");
                });
      },
      onFailure() {
        console.log("failed");
      },
      logout() {
        this.isLoggedIn = false;
        Vue.GoogleAuth.then(auth2 => {
          console.log(auth2.isSignedIn.get());
        });
      }
    },
    created() {
      Vue.GoogleAuth.then(auth2 => {
        this.isLoggedIn = auth2.isSignedIn.get();
      });
      Vue.GoogleAuth.then(auth2 => {
        this.getUser(auth2.currentUser.get());
      });

    }
  };
</script>

<style lang="scss" scoped>
  //@import "~bulma/css/bulma.css";
  .md-app {
    min-height: 700px;
    max-height: 700px;
    //border: 1px solid rgba(#000, 0.12);
  }
  .nav_button {
    color: black;
  }
  .nav_button_active {
    color: green;
  }
  .nav_button:hover {
    color: red;
  }

  // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }

  .viewport {
    width: 320px;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    overflow: auto;
    border: 1px solid rgba(#000, 0.12);
  }
</style>

