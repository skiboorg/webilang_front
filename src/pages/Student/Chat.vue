<template>
  <div class="grid">
    <div :class="[chatOpen ? 'panel-hide' : '']" class="chats-wrapper">
<!--      <q-scroll-area-->
<!--        :thumb-style="thumbStyle"-->
<!--        :bar-style="barStyle"-->
<!--        style="max-width: 100%"-->
<!--        :style="{'height':heigth  + 'px'}">-->
<!--          </q-scroll-area>-->
        <q-separator/>
        <q-list separator>
          <q-item clickable @click="openChat(chat.id)" v-ripple v-for="chat in chats" :key="chat.id" :class="{'bg-grey-2': current_chat===chat.id}">
            <q-item-section avatar>
              <q-avatar v-if="!chat.group" size="30px">
                <img class="avatar-img" :src="$auth.user.id === chat.starter.id ? chat.opponent.user_avatar : chat.starter.user_avatar" alt="">
              </q-avatar>
              <q-avatar v-else size="30px">
                <img class="avatar-img" :src="chat.group.image" alt="">
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <div v-if="chat.group">
                <q-item-label class="text-weight-bold">{{chat.group.label}}</q-item-label>
              </div>
              <div v-else>
                <q-item-label v-if="chat.starter.is_superuser" class="text-weight-bold">{{$t('admin')}}</q-item-label>
                <q-item-label v-else class="text-weight-bold">{{$auth.user.id === chat.starter.id ? chat.opponent.firstname : chat.starter.firstname}}</q-item-label>
              </div>
              <q-item-label caption lines="1" class="ellipsis text-weight-light" style="max-width: 150px">
                <span class="text-primary text-bold text-caption" v-if="$auth.user.id === parseInt(chat.last_message_user_id)">{{$t('chat_own_last_message')}}</span>
                {{chat.last_message}}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-separator/>

    </div>
    <div :class="[!chatOpen ? 'panel-hide' : '']" ref="messages-wrapper" class="messages-wrapper">
      <q-inner-loading :showing="data_loading">
        <q-spinner-comment size="50px" color="primary" />
      </q-inner-loading>
      <div class="messages-top flex items-center justify-between">
        <div class="flex items-center">
          <q-avatar size="30px" class="q-mr-md">
            <img class="avatar-img" v-if="!chatData.group" :src="chatData.user_avatar" alt="">
            <img class="avatar-img" v-else :src="chatData.group.image" alt="">
          </q-avatar>
          <p v-if="!chatData.group" class="no-margin text-weight-bold">
            {{chatData.is_superuser ? $t('admin') : chatData.firstname + ' ' + chatData.lastname}}
          </p>
          <p v-else class="no-margin text-weight-bold">{{chatData.group.label}} </p>
        </div>
        <q-btn class="border-r-8 q-px-sm lt-sm"
               @click="chatOpen = !chatOpen"
               dense
               icon="arrow_left"
               no-caps
               unelevated
               text-color="dark"
               color="white"
               :label="$t('back')"/>
      </div>
      <div ref="messagesContainer" class="messages-center" :style="{'height':heigth - 100 + 'px'}">
        <!--               :text="[message.message]"-->
        <div  class="q-pa-xs">
          <q-chat-message
            v-for="message in messages" :key="message.id"
            :sent="message.user.id === $auth.user.id"
            text-html
            text-color="dark"
            bg-color="indigo-1">
            <template v-slot:stamp class="text-caption">{{new Date(message.createdAt).toLocaleDateString()}}, {{new Date(message.createdAt).toLocaleTimeString().split(':')[0]}}:{{new Date(message.createdAt).toLocaleTimeString().split(':')[1]}}</template>
            <template v-if="chatData.group" v-slot:name>{{message.user.firstname}}</template>
            <template v-if="chatData.group" v-slot:avatar>
              <img
                class="q-message-avatar "
                :class="[message.user.id === $auth.user.id ? 'q-message-avatar--sent':'q-message-avatar--received']"
                :src="message.user.user_avatar" alt="">
            </template>
            <div>
              <p class="q-mb-xs" v-html="message.message"></p>
              <p class="q-py-xs chat-attachment" v-if="message.file">
                <a target="_blank" :href="message.file">{{$t('chat_attachment')}}</a>
              </p>
            </div>
          </q-chat-message>
        </div>
      </div>
      <div class="messages-bottom">
        <q-icon size="24px" class="cursor-pointer" :color="file ? 'positive' : 'grey-6'" name="attach_file" >
          <q-file style="position: absolute; width: 42px; opacity: 0;" v-model="file" />
        </q-icon>
        <q-icon size="24px"  class="cursor-pointer" color="grey-6" name="sentiment_satisfied_alt" >
          <q-menu auto-close>
            <q-card class="smiles-card">
              <div class="smiles-grid">
                <p class="smiley-icon no-margin text-h5 cursor-pointer" v-for="(smiley,index) in smiles"
                   :key="index" v-html="smiley.code" @click="pasteSmiley(smiley.code)"></p>
              </div>
            </q-card>
          </q-menu>
        </q-icon>
        <q-input  bg-color="white"
                  :loading="is_loading"
                  :disable="is_loading"
                  @keydown="keyDown"
                  input-class="text-dark"
                  rounded
                  standout="bg-white text-dark shadow-0"
                  v-model="message" :label="$t('chat_new_message')">
          <template v-slot:append>
            <q-btn round text-color="dark" :disable="!message && !file" :loading="is_loading"  @click="sendChatMessage()" flat icon="send" />
          </template>
        </q-input>
      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters,mapActions} from 'vuex'
import {api} from "boot/axios";
export default {
  // preFetch ({ store,currentRoute }) {
  //   let o_id = currentRoute.query.o_id
  //   if(o_id){
  //     store.dispatch('data/getMessages',{o_id})
  //   }else{
  //     console.log('open first')
  //   }
  //
  //   return  store.dispatch('data/getUserChats')
  //
  // },
  data() {
    return {
      data_loading:false,
      smiles:[
        {code:'😀'},
        {code:'😄'},
        {code:'😁'},
        {code:'😆'},
        {code:'😅'},
        {code:'😂'},
        {code:'🤣'},
        {code:'😊'},
        {code:'😇'},
        {code:'🙂'},
        {code:'😉'},
        {code:'😌'},
        {code:'😍'},
        {code:'😚'},
        {code:'😋'},
        {code:'😛'},
        {code:'😜'},
        {code:'🤪'},
        {code:'🤓'},
        {code:'😎'},
        {code:'🤩'},
        {code:'🥳'},
        {code:'😏'},
        {code:'😔'},
        {code:'😕'},
        {code:'🥺'},
        {code:'🤗'},
        {code:'🤔'},
        {code:'😯'},
        {code:'😴'},
        {code:'👋'},
        {code:'👌'},
        {code:'✌'},
        {code:'🤞'},
        {code:'👍'},
        {code:'👎'},
        {code:'✊ '},
        {code:'🙏'}
      ],
      chats:[],
      messages:[],
      file:null,
      socket:null,
      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#09B5EC',
        width: '3px',
        opacity: 0.75
      },
      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#09B5EC',
        width: '6px',
        opacity: 0.2
      },
      heigth:0,
      message:null,
      is_loading:false,
      chatOpen:false,
      chatData:{},
    }
  },
  async beforeMount(){
    await this.$api.post('/api/user/notification',{action:'set_read_chat'})
    await this.getNotifications()

    this.setCurrentChat(0)
    let query = this.$route.query
    //console.log(this.$route.query)
    if (query.o_id){
      await this.getMessages(query)
      await this.getChats()
    }else {
      await this.getChats()
      if (this.$q.screen.gt.sm){
        await this.openChat(this.chats[0].id)
      }

    }
  },
  updated() {
    this.$nextTick(() => this.scrollToEnd());
  },

  mounted() {
    this.heigth = this.$refs['messages-wrapper'].offsetHeight
    console.log(this.chatData)

  },
  methods: {
    ...mapActions('data',['setCurrentChat','getNotifications']),
    pasteSmiley(code){
      this.message ? this.message += ` ${code} ` : this.message = `${code} `
    },
    async keyDown(e){
      if (e.keyCode===13) {
        console.log('13')
        if (this.message) {
          await this.sendChatMessage()
        }
      }
    },
    async sendChatMessage(){//
      if (this.message){
        const rex = /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug;
        const updated = this.message.replace(rex, match => `<span class="chat-emoji text-h5">&#x${match.codePointAt(0).toString(16)};</span>`);
      }


      //await this.$axios.post(`/api/v1/chat/add/${this.current_chat_id}`,{message:updated})

      this.is_loading = true
      let formData = new FormData()
      formData.set('message', JSON.stringify(this.message))
      formData.set('file',this.file)
      console.log(formData)
      await this.$api({
        method: 'post',
        headers:{
          'content-type': 'multipart/form-data'
        },
        url: `/api/chat/add/${this.current_chat}`,
        data: formData
      }).then((response) => {
        console.log('chat message response',response)
        this.message = null
        this.file = null
        this.is_loading = false
      })
        .catch(function (error) {
          // handle error
        })
        .then(function () {
          // always executed
        });
    },
    async openChat(chat_id){
      this.chatOpen = !this.chatOpen
      this.data_loading = true
      this.setCurrentChat(chat_id)
      this.socket = new WebSocket(`${process.env.WS}/ws/chat/${chat_id}`)
      const opened_chat = await this.$api.get(`/api/chat/get_chat?chat_id=${chat_id}`)
      console.log(opened_chat.data)
      console.log(this.$auth.user.id)

      if (opened_chat.data.starter){
        if (opened_chat.data.starter.id !== this.$auth.user.id){
          this.chatData= opened_chat.data.starter
        } else {
          this.chatData= opened_chat.data.opponent
        }
      }
      this.chatData.group = opened_chat.data.group
      await this.$api.post(`/api/chat/set_chat_read/${chat_id}`)
      this.socket.onmessage = async (res) =>{
        console.log('message in chat',JSON.parse(res.data))
        let updated = null
        let data = JSON.parse(res.data)['message']
        console.log('DATA',data)
        if(data.chat === this.current_chat){
          if (data.message){
            const rex = /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug;
            updated = data.message.replace(rex, match => `<span class="chat-emoji text-h5">&#x${match.codePointAt(0).toString(16)};</span>`);
            console.log(updated)
          }

          this.messages.push(
            {
              id:data.id,
              is_socket:true,
              message: updated ? updated : null,//data.message,
              file: data.file ? data.file : null,//data.message,
              createdAt: Date.now(),
              user:{
                id:data.user.id,
                firstname:data.user.firstname,
                user_avatar: data.user.user_avatar //? process.env.API+data.user.user_avatar : '/no-avatar.svg',
              }
            }
          )

        }
        await this.getChats()
        this.scrollToEnd()

      }

      const response = await this.$api.get(`/api/chat/get_chat_messages?chat_id=${chat_id}`)
      console.log(response.data)
      this.messages = response.data
      this.scrollToEnd()
      this.data_loading = false
    },
    scrollToEnd() {
      let content = this.$refs.messagesContainer;
      content.scrollTop = content.scrollHeight
    },
    async getChats(){
      const response = await this.$api.get( '/api/chat/all')
      this.chats = response.data
    },
    async getMessages(data){
      console.log('data',data)
      if (data.o_id){
        const response_get_chat_id = await this.$api.get( `/api/chat/get_specific_chat?o_id=${parseInt(data.o_id)-947623}`)
        let chat_id = response_get_chat_id.data.id
        //const response_get_messages = await this.$api.get( `/api/chat/get_chat_messages?chat_id=${chat_id}`)
        //this.messages = response_get_messages.data

        await this.openChat(chat_id)
      }
    },


  },
  beforeUnmount() {
    console.log('beforeDestroy')
    this.setCurrentChat('000')
    try{
      this.socket.close()
    }catch (e) {
      console.log('not connected')
    }
  },
  computed:{
    ...mapGetters('data',['current_chat'])
  }

}
</script>
<style lang="sass" scoped>
.chat-attachment
  font-size: 10px
  color: $grey-6
  border-bottom: 1px dashed $grey-6
.grid
  display: grid
  grid-template-columns: 2fr 5fr
  grid-gap: 30px
  padding-bottom: 30px
  height: calc(100vh - 30px - 30px - 30px - 51px)
.chats-wrapper
  background: #F7F9FF
  border-radius: 20px
  padding: 20px
  height: 100%

.messages-wrapper
  position: relative
  border-radius: 20px
  height: 100%
  background: #F7F9FF
  overflow: hidden
.messages-top
  background: #E6EFFF
  padding: 10px 20px
.messages-bottom
  position: absolute
  bottom: 0
  left: 0
  right: 0
  background: #E6EFFF
  padding: 10px 30px
  display: grid
  grid-template-columns: 1fr 1fr 20fr
  grid-gap: 10px
  align-items: center

.smiles-card
  width: 400px
  padding: 10px
.smiles-grid
  display: grid
  grid-template-columns: repeat(8,1fr)
  grid-gap: 20px
.smiley-icon
  &:hover
    filter: drop-shadow(1px 1px 3px $primary)
.chat-emoji
  font-size: 20px
.messages-center
  padding: 10px
  overflow-y: auto
  overflow-x: hidden


::-webkit-scrollbar
  width: 5px

::-webkit-scrollbar-track
  background: #f1f1f1

::-webkit-scrollbar-thumb
  background: $primary
  border-radius: 500px

::-webkit-scrollbar-thumb:hover
  background: $primary

@media (max-width: 768px)
  .grid
    grid-template-columns: 1fr
  .panel-hide
    display: none
  .messages-bottom
    position: fixed
  .messages-center
    height: 85%
  .messages-wrapper
    height: 70vh
</style>
