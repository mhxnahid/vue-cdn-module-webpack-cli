<template>
  <div class="container">
    <div class="card">
      <div class="card-header">Chat</div>
      <div class="card-body">
        <div class="row">
          <div class="col-4">
            <ul class="list-group list-group-scroll p-1">
              <li
                @click="showChat(e)"
                v-for="(e,index) in getChatUsers.filter(ele => ele.id != getUser.id)"
                v-bind:key="index+'-'+e.id+'-userlist'"
                :class="e.id == activeChat ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'"
                style="cursor:pointer;"
              >{{e.id}} {{e.name}}</li>
            </ul>
          </div>
          <div class="col-8">
            <div>

              <div id="chatWindow" class="p-2 m-2" style="height:70vh;overflow:overlay;">
                <div v-if="activeChatUser">
                <div :class="e.socket ? 'text-right p-2' : 'text-left p-2'"
                  v-for="(e,index) in getChatList.filter(ele => (ele.to_user_id == activeChat))"
                  v-bind:key="index"
                >
                <span :class="e.socket ? 'rounded border bg-primary p-2 text-white shadow' : 'rounded border bg-white p-2 text-dark shadow'">
                  {{e.time}} > {{e.message}}
                </span>
                </div>
                <div class="clearfix"></div>
              </div>
              </div>
              
              <form v-if="activeChatUser" action @submit.prevent="newTestChat">
                <div class="form-group">
                  <label for="chat">{{activeChatUser.id}} {{activeChatUser.name}}</label>
                  <input v-model="chat" type="text" class="form-control w-50" id="chat" />
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      chat: "",
      activeChat: null,
      activeChatUser: null
    };
  },
  mounted() {
    //this.listen();
    this.fetchChatUsers();
  },
  computed: {
    ...mapGetters(["getChatList", "getUser", "getChatUsers", "getUserLogged"]),
  },
  methods: {
    ...mapActions([
      "fetchChatMessages",
      "submitTestChat",
      "addChatMessage",
      "tryAutologin",
      "fetchChatUsers"
    ]),
    ...mapMutations(["addChatMessageM"]),
    showChat(user) {
      this.activeChatUser = user;
      this.activeChat = user.id;
      this.fetchChatMessages(user.id)
    },
    async newTestChat() {
      const msg = {
        message: this.chat,
        to_user_id: this.activeChat,
        socket: false,
      };
      this.addChatMessage(msg);
      this.chat = "";
      const res = await this.submitTestChat(msg);
    }
    /*async listen() {
      return;
      Echo.disconnect();
      this.$tokenFetchEcho();
      const res = await this.tryAutologin({
        bypsss: false,
        toDashboard: false
      });
      const logged = await this.getUserLogged;
      console.log(logged);
      if (!logged) return;
      console.log(this.getUser);
      Echo.channel(`private-notification.user.${this.getUser.id}`).listen(
        "TestEvent",
        message => {
          console.log(message.message);
          this.addChatMessage(message.message);
        }
      );
    }*/
  }
};
</script>

<style>
.list-group-scroll {
  height: 80vh;
  margin-bottom: 10px;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-y-scrolling: touch;
}
</style>