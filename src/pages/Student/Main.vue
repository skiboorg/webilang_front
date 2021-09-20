<template>
  <q-page>
    <div v-if="current_group" class="grid">
      <div class="grid-inner">
        <div v-if="student_upcoming_lessons.length>0" class="rounded-block ">
          <p class="text-bold">{{$t('your_progress')}}</p>
          <q-separator class="bg-grey-3 q-mb-lg"/>
          <div class="q-mb-lg row ">
            <q-circular-progress
            show-value
            :value="$auth.user.total_progress"
            size="140px"
            class="col-4"
            color="warning"
            track-color="amber-1">
              <div class="flex column items-center justify-center">
                <p class="no-margin text-caption text-bold">{{$t('course_done_top')}}</p>
              <p class="no-margin text-h4 text-warning text-weight-bolder">{{$auth.user.total_progress}}%</p>
              <p class="no-margin text-caption  text-bold">{{$t('course_done_bottom')}}</p>
              </div>
            </q-circular-progress>
            <div class="col-7 offset-1">
              <p class="q-mb-none text-weight-light">{{$t('next_lesson')}}</p>
              <q-no-ssr>
                 <p class="text-bold">{{new Date(student_upcoming_lessons[0].date).toLocaleDateString()}} | {{$filters.normalizeTime(student_upcoming_lessons[0].time)}}</p>
              </q-no-ssr>

              <p class="q-mb-none text-weight-light">{{$t('lessons_left')}}</p>
              <p class="text-bold">{{$auth.user.personal_lessons_left}} {{$t('personal_lessons_left')}}</p>
              <p class="q-mb-none text-weight-light">{{$t('lessons_left')}}</p>
              <p class="text-bold">{{$auth.user.group_lessons_left}} {{$t('group_lessons_left')}}</p>
            </div>
          </div>
          <a target="_blank" class="btn" :href="student_upcoming_lessons[0].link">{{$t('enter_classroom')}}</a>
        </div>
        <div class="rounded-block">
          <p class="text-bold no-margin">{{$t('activity_reward')}}</p>
          <q-no-ssr>
          <p class="text-caption text-bold text-grey-5">{{$t('activity_reward_to_date')}} {{new Date().toLocaleDateString()}}</p>
          </q-no-ssr>
          <q-separator class="bg-grey-3 q-mb-lg"/>
          <div class="rewards">
             <q-avatar rounded class="relative-position" size="80px" v-for="reward in $auth.user.rewards">
            <img  :src="reward.reward.image" alt="">
            <div v-if="reward.count>1" class="reward-count"><p class="no-margin text-body1">{{reward.count}}</p></div>
          </q-avatar>
          </div>


        </div>

         <div v-if="current_group.teacher" class="rounded-block">
          <p class="text-bold ">{{$t('your_teacher')}}</p>
          <q-separator class="bg-grey-3 q-mb-lg"/>
           <div class="flex items-center q-mb-lg">

             <q-avatar size="60px" class="q-mr-lg">
               <img :src="current_group.teacher.user_avatar" alt="">
             </q-avatar>
             <p  class="no-margin text-weight-bolder text-fs-18">{{current_group.teacher.firstname}} {{current_group.teacher.lastname}}</p>

           </div>
           <q-btn :to="{name:'student-chats',query: { o_id: current_group.teacher.id+947623 }}" color="primary" icon="mail_outline" no-caps class="border-r-8 full-width text-bold q-py-sm" :label="$t('chat_w_teacher')"/>
        </div>

      </div>
      <div class="grid-inner">
        <div v-if="student_upcoming_lessons.length>0" class="rounded-block">
          <p class="text-bold ">{{$t('lessons_materials')}}</p>
          <q-separator class="bg-grey-3 q-mb-lg"/>
           <p class="text-caption text-weight-light">{{$t('lesson_materials')}}</p>

          <div class="files-grid">
            <a class="file-item" :href="item.file" target="_blank" v-for="item in student_upcoming_lessons[0].material">
                <q-icon class="q-mr-md" size="40px" name="description" color="grey-7"/>
              <p class="no-margin text-weight-regular ellipsis">{{item.file.split('/')[6]}}</p>
              </a>
            <a class="file-item" :href="item.file" target="_blank" v-for="item in student_upcoming_lessons[0].uploaded_material">
                <q-icon class="q-mr-md" size="40px" name="description" color="grey-7"/>
              <p class="no-margin text-weight-regular ellipsis">{{item.file.split('/')[7]}}</p>
              </a>
          </div>
           <q-separator class="bg-grey-3 q-mb-lg"/>
           <p class="text-caption text-weight-light">{{$t('home_work')}}</p>
            <div class="files-grid">
              <a class="file-item" :href="item.file" target="_blank" v-for="item in student_upcoming_lessons[0].homeWork">
                <q-icon class="q-mr-md" size="40px" name="description" color="grey-7"/>
              <p class="no-margin text-weight-regular ellipsis">{{item.file.split('/')[6]}}</p>
              </a>
              <a class="file-item" :href="item.file" target="_blank" v-for="item in student_upcoming_lessons[0].uploaded_homework">
                <q-icon class="q-mr-md" size="40px" name="description" color="grey-7"/>
              <p class="no-margin text-weight-regular ellipsis">{{item.file.split('/')[7]}}</p>
              </a>

          </div>
           <q-separator class="bg-grey-3 q-mb-lg"/>
           <p @click="comment_visible=!comment_visible" class="comments q-mb-none">{{$t('teacher_comment')}}</p>
          <q-slide-transition>
      <div v-show="comment_visible">
        <p class="q-mb-none q-pt-md">{{student_upcoming_lessons[0].comment}}</p>
      </div>
    </q-slide-transition>

        </div>
          <div class="rounded-block">
          <p class="text-bold ">{{$t('dictionary_title')}}</p>
          <q-separator class="bg-grey-3 q-mb-lg"/>
            <div class="q-mb-lg dict-rows">
              <div class="dict-row" v-for="item in dictionary" :key="item.id">
                <p class="no-margin text-weight-light">{{item.word}}</p>
                <p class="no-margin text-weight-bold">{{item.translate}}</p>
              </div>

            </div>
           <q-btn  color="positive" :to="{name:'student-dictionary'}" icon="description" no-caps class="border-r-8 full-width text-bold q-py-sm" :label="$t('open_dictionary')"/>
        </div>
           <div class="rounded-block">
          <p class="text-bold ">{{$t('notes_title')}}</p>
          <q-separator class="bg-grey-3 q-mb-lg"/>
             <div class="notes-wrapper q-mb-lg">
                <div class="note" v-for="item in notes" :key="item.id" v-html="item.text"></div>
             </div>

           <q-btn  color="primary" :to="{name:'student-notes'}" icon="edit_note" no-caps class="border-r-8 full-width text-bold q-py-sm" :label="$t('open_notes')"/>
        </div>
      </div>


    </div>

  </q-page>

</template>

<script>


import {mapGetters} from "vuex";

export default {
  data() {
    return {
      comment_visible:false,
      dictionary:[],
      notes:[]
    }
  },
  async beforeMount(){
    const resp = await this.$api.get('/api/user/dictionary?type=last5')
    this.dictionary = resp.data
    const resp1 = await this.$api.get('/api/user/note?type=last3')
    this.notes = resp1.data
  },
  methods: {

  },
  computed:{
    ...mapGetters('data',['current_group','student_upcoming_lessons']),
    startTime(){
      return `${this.student_upcoming_lessons[0].time.split(':')[0]}:${this.student_upcoming_lessons[0].time.split(':')[1]}`
    }
   },


}
</script>
<style lang="sass" scoped>

.rewards
  display: grid
  grid-template-columns: repeat(5,1fr)
  grid-gap: 20px
.reward-count
  position: absolute
  width: 28px
  height: 28px
  border-radius: 100%
  background: $negative
  color: #FFFFFF
  display: flex
  align-items: center
  justify-content: center
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.15)
  right: -5px
  top: -5px
.grid
  display: grid

  align-items: flex-start
  grid-template-columns: 2fr 2fr
  grid-gap: 30px
  &-item
    border: 1px solid
  &-inner
    display: grid
    grid-template-columns: 1fr
    grid-gap: 30px

.btn
  background: #FFB61C
  border-radius: 8px
  padding: 10px 0
  display: flex
  align-items: center
  justify-content: center
  font-weight: 600
  color: #FFFFFF
.comments
  display: inline-block
  color: $primary
  border-bottom: 1px dashed $primary
  cursor: pointer
  font-size: 16px
  font-weight: 500
.dict-rows
  display: grid
  grid-template-columns: 1fr
  grid-gap: 10px
.dict-row
  display: grid
  grid-template-columns: 1fr 1fr
  align-items: center
  grid-gap: 30px
  &:nth-child(odd)
    background: #ecedf5
.notes-wrapper
  display: grid
  grid-template-columns: 1fr
  grid-gap: 15px
.note
  border-bottom: 1px solid $grey-3
  padding-bottom: 15px
  &:last-child
    border-bottom: none
</style>
