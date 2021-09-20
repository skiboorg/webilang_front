<template>
  <div class="lessons-wrapper">
    <div ref="lessons-list" class="rounded-block  lessons-list">
      <div class="lessons-list-header q-mb-md">
        <p class="no-margin text-bold ">{{$t('lessons_date')}}</p>
        <p class="no-margin text-bold">{{$t('lessons_theme')}}</p>
        <p class="no-margin text-bold">{{$t('lessons_teacher')}}</p>
        <p class="no-margin text-bold">{{$t('lessons_status')}}</p>

      </div>
      <div  class="lessons-list">

        <q-scroll-area
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          style="max-width: 100%"
          :style="{'height':height - 100 + 'px'}">
          <div class="lessons-list-row" @click="selectedLesson=lesson.id" v-for="(lesson,index) in student_upcoming_lessons" :key="lesson.id">
            <q-no-ssr>
              <p class="no-margin text-weight-light">{{new Date(lesson.date).toLocaleDateString()}} | {{$filters.normalizeTime(lesson.time)}}</p>
            </q-no-ssr>

            <p class="no-margin text-weight-light ellipsis lesson-theme">{{lesson.theme}}</p>
            <p class="no-margin text-weight-light">{{current_group.teacher.firstname}} {{current_group.teacher.lastname}}</p>
            <p class="no-margin text-weight-light">
              <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="5" cy="5.5" r="5" fill="#39CE3F"/>
              </svg>
              {{$t('lessons_status_planned')}}</p>

          </div>
          <div class="lessons-list-divider"></div>

         <div class="lessons-list-row" @click="selectedLesson=lesson.id" v-for="(lesson,index) in student_over_lessons" :key="lesson.id">
           <q-no-ssr>
              <p class="no-margin text-weight-light">{{new Date(lesson.date).toLocaleDateString()}} | {{$filters.normalizeTime(lesson.time)}}</p>
           </q-no-ssr>

            <p class="no-margin text-weight-light ellipsis lesson-theme">{{lesson.theme}}</p>
            <p class="no-margin text-weight-light">{{current_group.teacher.firstname}} {{current_group.teacher.lastname}}</p>
            <p class="no-margin text-weight-light">
              <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="5" cy="5.5" r="5" fill="#C1C1C1"/>
              </svg>
              {{$t('lessons_status_over')}}</p>

          </div>
        </q-scroll-area>

      </div>
    </div>
    <div class="rounded-block lessons-material">
      <p class="no-margin text-body1 text-weight-bold">{{lessonInfo.theme}}</p>
      <p class="text-weight-light">{{$t('lessons_material')}}</p>
       <div class="files-grid">
            <a class="file-item" :href="item.file" target="_blank" v-for="item in lessonInfo.material">
                <q-icon class="q-mr-md" size="40px" name="description" color="grey-7"/>
              <p class="no-margin text-weight-regular ellipsis">{{item.file.split('/')[6]}}</p>
              </a>
            <a class="file-item" :href="item.file" target="_blank" v-for="item in lessonInfo.uploaded_material">
                <q-icon class="q-mr-md" size="40px" name="description" color="grey-7"/>
              <p class="no-margin text-weight-regular ellipsis">{{item.file.split('/')[7]}}</p>
              </a>
          </div>

    </div>
  </div>


</template>

<script>


import {mapGetters} from "vuex";

export default {
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {


    return store.dispatch('data/updateUserGroups')

  },
  data() {
    return {
      selectedLesson:0,
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
  mounted() {
    this.height = this.$refs['lessons-list'].offsetHeight
  },
  methods: {

  },
  computed: {
    ...mapGetters('data', ['current_group','student_upcoming_lessons','student_over_lessons']),
    lessonInfo(){
      if (this.selectedLesson>0){
        return this.current_group.lessons.find(x=>x.id===this.selectedLesson)
      }else{
        return this.current_group.lessons[0]
      }
    }
  }

}
</script>
<style lang="sass" scoped>
.lessons-wrapper
  height: calc(100vh - 30px - 30px - 30px - 51px)
  display: grid
  grid-template-columns: 1fr
  grid-gap: 24px
.lesson-theme
  max-width: 80%
.lessons-list
  height: calc(100vh - 30px - 30px - 30px - 51px - 200px)
  &-header
    display: grid
    grid-template-columns: repeat(4,1fr)
    padding: 0 30px
  &-row
    display: grid
    cursor: pointer
    grid-template-columns: repeat(4,1fr)
    padding: 15px 30px
    background: #FFFFFF
    margin-bottom: 5px
    &:nth-child(even)
      background: $grey-2
  &-divider
    height: 1px
    background: #CFCFCF
    margin: 15px 0
.lessons-material
  height: 190px
</style>
