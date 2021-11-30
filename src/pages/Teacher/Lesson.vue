<template>


  <div class="page-wrapper">
    <q-no-ssr>
      <div class="group-name">
        <p class="text-center text-body1 text-weight-bolder text-uppercase q-mb-sm">{{lesson.theme}}</p>
        <q-no-ssr>
        <p class="text-center text-italic text-weight-light ">{{new Date(lesson.date).toLocaleDateString()}} | {{$filters.normalizeTime(lesson.date,lesson.time)}}</p>
        </q-no-ssr>
      </div>
    </q-no-ssr>
    <div class="group-info">
      <div class="flex items-center">
        <router-link class="text-underline" :to="{name:'teacher-groups'}">{{$t('side_bar_menu_groups')}}</router-link>
        <svg class="q-mx-sm" width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="4" cy="4.5" r="4" fill="#FFB61C"/>
        </svg>
        <router-link :to="{name:'teacher-group',params: {id:lesson.group.id}}">
          <p class="q-mb-none text-underline">{{$t('teacher_group')}} {{lesson.group.label}}</p>
        </router-link>

        <svg class="q-mx-sm" width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="4" cy="4.5" r="4" fill="#FFB61C"/>
        </svg>
        <p class="q-mb-none text-weight-bold ">{{$t('side_bar_menu_lesson')}} {{lesson.theme}}</p>

      </div>

    </div>
    <div ref="group-list" class="rounded-block  group-list">
      <div class="group-list-header q-mb-md">
        <p class="no-margin text-bold ">{{$t('teacher_lesson_student_name')}}</p>
        <p class="no-margin text-bold">{{$t('teacher_lesson_student_presence')}}</p>
        <p class="no-margin text-bold">{{$t('teacher_lesson_student_comment')}}</p>
        <p class="no-margin text-bold">{{$t('teacher_lesson_student_reward')}}</p>



      </div>
      <div  class="group-list">
        <q-no-ssr>
          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            style="max-width: 100%"
            :style="{'height':height - 210 + 'px'}">
            <div class="group-list-row" v-for="(user,index) in users" :key="lesson.id">
              <div class="group-list-row__item" :class="{'b-w':index%2>0}">
                <p class="no-margin ">{{user.firstname}} {{user.lastname}}</p>
              </div>

              <div :class="{'b-w':index%2>0}" class="flex items-center justify-between group-list-row__item">
                <q-checkbox v-model="user.is_present"/>
              </div>
              <div class="group-list-row__item" :class="{'b-w':index%2>0}">
                <router-link :to="{name:'teacher-chats',query: { o_id: user.id+947623 }}"  class="no-margin link">{{$t('teacher_lesson_student_message')}}</router-link>
              </div>

              <div class="text-center group-list-row__item">
                <q-select dense outlined bg-color="white" :label="$t('teacher_lesson_student_choose_reward')"
                          :options="rewards"  v-model="user.selected_reward">
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-item-section  avatar>
                        <q-avatar>
                          <img class="avatar-img" :src="scope.opt.image" >
                        </q-avatar>

                      </q-item-section>
                      <q-item-section>
                        <q-item-label v-html="scope.opt.label" />

                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
            </div>
          </q-scroll-area>
        </q-no-ssr>
        <div class="flex justify-between q-mb-md">
          <q-btn :to="{name:'teacher-chats'}" color="warning" no-caps unelevated class="border-r-8" :label="$t('teacher_lesson_group_chat')"/>
          <div class="q-gutter-md">
            <a v-if="!lesson.is_over" style="line-height: 28px"
               class="cursor-pointer q-btn q-btn-item non-selectable no-outline q-btn--unelevated q-btn--rectangle
               bg-positive text-white q-btn--actionable q-focusable q-hoverable q-btn--no-uppercase border-r-8"
               :href="lesson.link" target="_blank">{{$t('teacher_lesson_start')}}</a>

            <q-btn color="primary" :loading="is_loading" @click="saveActivity" no-caps unelevated class="border-r-8" :label="$t('save_btn')"/>
          </div>
        </div>
        <div class="">
          <p class="q-mb-sm text-bold">{{$t('teacher_lesson_account')}}</p>
          <p class="q-mb-none text-bold">Login: {{lesson.group.login}}</p>
          <p class="q-mb-none text-bold">Password: {{lesson.group.password}}</p>

        </div>
      </div>

    </div>

  </div>



</template>

<script>


import {mapGetters,mapActions} from "vuex";

export default {
  preFetch ({ store, currentRoute}) {
    return store.dispatch('data/getLesson',currentRoute.params.id)
  },
  data() {
    return {
      users:[],
      precence:[],
      is_loading:false,
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
      height: 0,
    }
  },

  mounted() {
    this.height = this.$refs['group-list'].offsetHeight

  },
  async beforeMount() {
    const resp = await this.$api.get(`/api/lesson/get_presence?l_id=${this.lesson.id}`)
    this.precence = resp.data.map(x=>x.user)
    console.log(this.precence)

    for(let user of this.lesson.group.users){
      this.users.push({
        id:user.id,
        firstname:user.firstname,
        lastname:user.lastname,
        is_present:this.precence.includes(user.id) ,
        selected_reward:null
      })
    }

  },

  methods: {
    async saveActivity(){
      this.is_loading = true
      await this.$api.post('/api/user/lesson_activity',{
        lesson_id:this.lesson.id,
        data:this.users
      })
      this.$q.notify({
          message: this.$t('data_saved'),
          position: this.$q.screen.lt.sm ? 'bottom' : 'bottom-right',
          color:'positive',
          icon: 'announcement'
        })
      this.is_loading = false
    }


  },
  computed:{
    ...mapGetters('data',['teacher_current_group','lesson','rewards']),
  }

}
</script>
<style lang="sass">
.new-dates
  display: grid
  grid-template-columns: 1fr 1fr 1fr
  align-items: center
.page-wrapper
  height: calc(100vh - 30px - 30px - 30px - 51px)
  display: grid
  grid-template-columns: 1fr
  grid-gap: 24px
.group-add-lesson
  height: fit-content
  display: grid
  grid-template-columns: 1fr 6fr
  grid-gap: 10px
.group-info
  height: fit-content
  display: grid
  grid-template-columns: 1fr 1fr
.group
  &-members
    display: flex
    flex-direction: row-reverse
  &-member
    margin-left: 10px
    &:last-child
      margin-left: 0
.group-list
  height: calc(100vh - 30px - 30px - 30px - 51px - 200px)
  &-header
    display: grid
    grid-template-columns: 1fr 1fr 1fr 1fr
    grid-gap: 20px
    padding: 0 30px
  &-row
    display: grid
    grid-template-columns: 1fr 1fr 1fr 1fr
    padding: 15px 30px
    background: #FFFFFF
    border-radius: 8px
    grid-gap: 20px
    margin-bottom: 5px
    align-items: center
    overflow: hidden
    &:nth-child(even)
      background: $grey-2
    &__item
      position: relative
      &::after
        position: absolute
        content: ''
        width: 1px
        background: $grey-3
        right: 0
        top: -22px
        bottom: -22px
      &:last-child
        &::after
          content: none
      &.b-w
        &::after
          background: white

  &-divider
    height: 1px
    background: #CFCFCF
    margin: 15px 0
.material-marker
  ellipse
    fill: #39CE3F
  &.no-material
    ellipse
      fill: #FFB61C !important

.add-lesson
  &-top
    display: grid
    grid-template-columns: 1fr 2fr
    grid-gap: 30px
  &-calendar
    background: #F7F9FF
    border-radius: 10px
  &-activeDates
    display: grid
    grid-template-columns: 1fr
    grid-gap: 10px
  &-activeDate
    background: #F7F9FF
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.05)
    border-radius: 8px
    display: flex
    align-items: center
    justify-content: space-between
    padding: 5px 15px
  &-recentDate
    background: #FaFcFF
    border-radius: 8px
    padding: 5px 15px
  &-bottom
    &-header
      display: grid
      grid-template-columns: 1fr 1fr 3fr
      grid-gap: 30px
      padding: 0 30px
    &-lessons
      display: grid
      grid-template-columns: 1fr
    &-lesson
      display: grid
      grid-template-columns: 1fr 1fr 3fr
      align-items: center
      grid-gap: 30px
      padding: 5px 30px
      border-radius: 8px
      &:nth-child(even)
        background: #F5F5F5

</style>
