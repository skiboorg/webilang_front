<template>
  <div ref="page-wrapper" class="page-wrapper">
    <div v-if="notifications.length>0" class="flex items-center justify-end q-mb-lg">
      <p v-if="selectMode" @click="selectAll" class="q-mb-none action q-mr-md inline-block cursor-pointer">{{$t('notify_select_all')}}</p>
      <p v-if="selectMode" @click="deleteAction"  class="q-mb-none action q-mr-md inline-block cursor-pointer">{{$t('notify_delete')}}</p>
      <p v-if="!selectMode" @click="selectMode=!selectMode" class="q-mb-none action q-mr-md inline-block cursor-pointer">{{$t('notify_select')}}</p>
      <p v-if="selectMode" @click="cancelSelect" class="q-mb-none action inline-block cursor-pointer">{{$t('notify_cancel')}}</p>
    </div>
    <q-scroll-area
      v-if="notifications.length>0"
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      style="max-width: 100%"
      :style="{'height':height -19 - 24 + 'px'}">
     <div class="notify-cards">
        <div v-show="!item.is_chat" v-for="(item,index) in notifications" :key="index">
           <div class="notify-card " :class="{'new':item.is_new}"  >
          <div class="notify-card__inner">
            <div class="">
              <q-checkbox v-if="selectMode" v-model="item.is_selected" />
              <p v-if="!item.is_first" class="text-weight-bold text-fs-16">{{item.title}}</p>
              <p v-else class="text-weight-bold text-fs-16">{{$t('greetings_message_title')}}</p>
              <p v-if="!item.is_first">{{item.text}}</p>
               <p v-else>{{$t('greetings_message_teacher')}}

                 <router-link class="action" :to="{name:'student-settings'}">{{$t('greetings_message_link_text')}}</router-link>
               </p>
            </div>
            <div class="">
              <p class="no-margin text-right text-caption">{{new Date(item.created_at).toLocaleDateString()}}</p>
            </div>
          </div>


        </div>
        </div>
      </div>

    </q-scroll-area>
    <div v-else class="">
      <p class="text-weight-bold text-body1">{{$t('notify_not_present')}}</p>
    </div>

  </div>

</template>

<script>

import {mapActions} from 'vuex'
export default {
  data() {
    return {
      notifications:[],
      selectMode:false,
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
      height:0,

    }
  },
  async mounted() {
    this.height = this.$refs['page-wrapper'].offsetHeight
    await this.getItems()
    await this.$api.post('/api/user/notification',{action:'set_read'})
    await this.getNotifications()
  },
  methods: {
    ...mapActions('data',['getNotifications']),
    async getItems(){
      const resp = await this.$api.get('/api/user/notification')
      this.notifications = resp.data
    },
    selectAll(){
      this.notifications.map(x=>x.is_selected=true)
    },
    cancelSelect(){
      this.notifications.map(x=>x.is_selected=false)
      this.selectMode = false
    },
    async deleteAction(){
      let ids = this.notifications.filter(x=>x.is_selected).map(x=>x.id)
      const resp = await this.$api.post('/api/user/notification',{
        action:'delete',
        ids
      })
      await this.getItems()
    }

  }
}
</script>
<style lang="sass" scoped>
.page-wrapper
  height: calc(100vh - 30px - 30px - 30px - 51px)

.action
  font-size: 12px
  font-weight: 400
  color: #606060
  border-bottom: 1px dashed #606060
.notify-cards
  display: grid
  grid-template-columns: 1fr
  grid-gap: 10px
.notify-card
  background: #FBFBFB
  border-radius: 15px
  padding: 20px
  &__inner
    display: grid
    grid-template-columns: 6fr 1fr
  &.new
    background: #EFFBEF


</style>
