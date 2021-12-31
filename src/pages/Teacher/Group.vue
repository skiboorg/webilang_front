<template>
  <!--  <pre>-->
  <!--    {{teacher_current_group.lessons}}-->
  <!--  </pre>-->
  <div class="page-wrapper">
    <div class="group-name">
      <p class="text-center text-body1 text-weight-bolder text-uppercase q-mb-sm">{{teacher_current_group.label}}</p>
      <p class="text-center text-italic q-mb-none text-weight-light ">{{teacher_current_group.level.name}}</p>
    </div>
    <div class="group-add-lesson rounded-block">
      <q-btn  @click="link=teacher_current_group.link, addLessonModal=true" no-caps :label="$t('teacher_add_lesson')" color="primary" unelevated class="border-r-8 add-button" icon="add"/>
      <q-input  dense outlined bg-color="white" :label="$t('dictionary_search')"/>
    </div>
    <div class="group-info">
      <div class="flex items-center">
        <router-link class="text-underline" :to="{name:'teacher-groups'}">{{$t('side_bar_menu_groups')}}</router-link>
        <svg class="q-mx-sm" width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="4" cy="4.5" r="4" fill="#FFB61C"/>
        </svg>
        <p class="q-mb-none text-weight-bold text-underline">{{$t('teacher_group')}} {{teacher_current_group.label}}</p>

      </div>
      <div class="">
        <p class="q-mb-sm group-info-members text-weight-bold">{{$t('group_members')}}</p>
        <div class="group-members q-gutter-sm">
           <AvatarWithModal :user="user" v-for="user in teacher_current_group.users" :key="user.id"/>
<!--          <q-avatar class="group-member" size="40px"  v-for="user in teacher_current_group.users" :key="user.id">-->
<!--            <img :src="user.user_avatar" alt="">-->
<!--          </q-avatar>-->
        </div>
      </div>
    </div>
    <div ref="group-list" class="rounded-block  group-list">
      <div  class="gt-sm group-list-header q-mb-md">
        <p class="no-margin text-bold ">{{$t('lessons_date')}}</p>
        <p class="no-margin text-bold">{{$t('lessons_theme')}}</p>
        <p></p>
        <p></p>
      </div>
      <div  class="group-list">
        <q-no-ssr>
          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            style="max-width: 100%"
            :style="{'height':height - 100 + 'px'}">
            <div class="group-list-row"  v-for="(lesson,index) in teacher_current_group.lessons" :key="lesson.id">
              <div class="group-list-row__item" :class="{'b-w':index%2>0}">
                <q-no-ssr>
                  <p class="lt-md q-mb-sm text-bold ">{{$t('lessons_date')}}</p>
                  <p class="no-margin ">{{new Date(lesson.date).toLocaleDateString()}} |
                    {{$filters.normalizeTime(lesson.date,lesson.time)}}</p>
                </q-no-ssr>
              </div>

              <div :class="{'b-w':index%2>0}" class="flex items-center justify-between group-list-row__item">
                <div style="max-width: 70%">
                  <p class="lt-md q-mb-sm text-bold">{{$t('lessons_theme')}}</p>
                  <p @click="editLessonIndex=index, editLessonModal=true" class="no-margin ellipsis link cursor-pointer">{{lesson.theme}}</p>
                </div>

                <div class="q-mr-none q-mr-md-lg">
                  <q-btn @click="editLessonIndex=index, editLessonModal=true" class="q-mr-sm" size="10px" dense flat round color="warning" icon="edit"/>
                  <q-btn size="10px"
                         @click="lesson_to_delete.id=lesson.id,lesson_to_delete.name=lesson.theme, delLessonModal=true"
                         dense flat round color="negative" icon="delete"/>

                </div>
              </div>
              <div class="group-list-row__item" :class="{'b-w':index%2>0}">
                <p  class="no-margin flex items-center">
                  <svg class="q-mr-sm material-marker "
                       :class="[!lesson.material.length>0 && !lesson.uploaded_material.length>0 ? 'no-material' : '']"
                       width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="7" cy="7.50069" rx="7" ry="6.84444" />
                  </svg>
                  <span @click="selected_lesson_id=lesson.id, addFilesModal=true" class="text-underline cursor-pointer text-caption text-weight-bold">{{$t('teacher_lesson_materials')}}</span>
                </p>
              </div>

              <div class="text-center group-list-row__item">
                <q-btn :to="{name:'teacher-lesson',params:{id:lesson.id}}"
                      size="12px"
                       style="width: 140px"
                       no-caps :label="$t('enter_classroom')" :color="lesson.is_over ? 'grey-5' : 'primary'" />
              </div>
            </div>
          </q-scroll-area>
        </q-no-ssr>


      </div>
    </div>

  </div>
  <!--  add dialog-->
  <q-dialog
    v-model="addLessonModal"
    full-height>
    <q-card class="modal-dialog rounded-block full-height bg-white" style="width: 850px;max-width: 95vw">
      <q-card-section class="row items-center no-padding q-mb-lg">
        <div class="text-h6 text-weight-bolder">{{$t('teacher_add_lesson')}}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="no-padding" >
        <p>{{$t('teacher_add_lesson_choose_dates')}}</p>
        <div ref="add-lesson-top" class="add-lesson-top">
          <div class="">
            <q-date
              class="add-lesson-calendar"
              v-model="added_dates"
              :events="recent_dates"
              :locale="$i18n.locale === 'ru' ? localeRu : localeEn"
              color="positive"
              minimal
              @update:model-value="updateDates"
              multiple
              first-day-of-week="1"
              flat
              event-color = 'grey-5'
            />
          </div>
          <div class="">
            <p>{{$t('teacher_add_lesson_active_dates')}}</p>
            <q-scroll-area
              :thumb-style="thumbStyle"
              :bar-style="barStyle"
              style="max-width: 100%;height: 150px">
              <div class="add-lesson-activeDates">
                <div class="add-lesson-activeDate" v-for="(date,index) in added_dates" :key="index">
                  <p class="no-margin text-weight-thin">{{ new Date(date).toLocaleDateString()}} </p>
                  <q-btn size="8px" @click="removeDate(index,date)" dense class="bg-grey-5" color="white" round  icon="close"/>
                </div>
              </div>
            </q-scroll-area>

            <q-separator spaced="lg" color="grey-3"/>
            <p>{{$t('teacher_add_lesson_recent_dates')}}</p>
            <q-scroll-area
              :thumb-style="thumbStyle"
              :bar-style="barStyle"
              class="q-mb-md q-md-md-none"
              style="max-width: 100%;height: 80px">
              <div class=" add-lesson-activeDates">
                <div class="add-lesson-recentDate" v-for="(lesson,index) in teacher_current_group.lessons" :key="index">
                  <p class="no-margin text-weight-thin text-grey-6">{{ new Date(lesson.date).toLocaleDateString()}} </p>

                </div>
              </div>
            </q-scroll-area>
          </div>
        </div>
        <div class="add-lesson-bottom">
          <div  class="gt-sm add-lesson-bottom-header">
            <p class="no-margin text-weight-bold">{{$t('lessons_dates')}}</p>
            <p class="no-margin text-weight-bold">{{$t('lessons_time')}}</p>
            <p class="no-margin text-weight-bold">{{$t('lessons_theme')}}</p>
          </div>
          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            class="q-mb-md"
            style="max-width: 100%;height: 205px">
            <div class="add-lesson-bottom-lessons">

              <div class="add-lesson-bottom-lesson" v-for="(lesson,index) in new_lessons" :key="index">
                <div class="">
                  <p class="lt-md no-margin text-weight-bold">{{$t('lessons_dates')}}</p>
                  <p class="no-margin">{{new Date(lesson.date).toLocaleDateString()}}</p></div>
                <div class="">
                  <p class="lt-md no-margin text-weight-bold">{{$t('lessons_time')}}</p>
                  <q-input dense mask="time"  outlined v-model="lesson.time">
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                          <q-time format24h v-model="lesson.time">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup :label="$t('save_btn')" color="primary" flat />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>


                <div class="">
                  <p class="lt-md no-margin text-weight-bold">{{$t('lessons_theme')}}</p>
                  <div class="flex items-center justify-between">
                    <q-input style="flex-basis: 80%" dense outlined v-model="lesson.theme"/>
                    <q-btn @click="removeDate(index,lesson.date)" flat dense icon="delete" round/>
                  </div>
                </div>


              </div>
            </div>
          </q-scroll-area>
          <p class="q-mb-sm text-weight-bold">{{$t('teacher_add_lesson_link')}}</p>
          <q-input class="q-mb-sm"  dense outlined v-model="link" />
          <div class="text-right">
            <q-btn @click="saveAction" :loading="is_loading" :label="$t('save_btn')" :disable="!new_lessons.length>0" class="border-r-8" color="primary" unelevated/>
          </div>
        </div>

      </q-card-section>


    </q-card>
  </q-dialog>
  <!--  add dialog-->

  <!--  del dialog-->
  <q-dialog v-model="delLessonModal" persistent>
    <q-card class=" rounded-block bg-white">
      <q-card-section class="q-pb-none">

        <p class="q-ml-sm text-center">{{$t('teacher_del_lesson')}} <br> <span class="text-negative text-bold">{{lesson_to_delete.name}}</span> ?</p>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn class="border-r-8 text-weight-bold" no-caps unelevated :label="$t('notify_cancel')" color="grey-7" v-close-popup />
        <q-btn class="border-r-8 text-weight-bold" :loading="is_loading"
               @click="deleteLesson"
               no-caps unelevated :label="$t('notify_delete')" color="negative"  />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!--  del dialog-->

  <!--  edit dialog-->
  <q-dialog
    v-model="editLessonModal"
    full-height
    @before-show="updateEditLesson">
    <q-card class="modal-dialog rounded-block full-height bg-white" style="width: 850px;max-width: 90vw">
      <q-card-section class="row items-center no-padding q-mb-lg">
        <div class="text-h6 text-weight-bolder">{{$t('teacher_edit_lesson_title')}}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="no-padding" >
        <p>{{$t('teacher_edit_lesson_subtitle')}}</p>
        <div ref="add-lesson-top" class="add-lesson-top">
          <div class="">
            <q-date
              class="add-lesson-calendar"
              v-model="new_lesson_date"
              :events="recent_dates"
              :locale="$i18n.locale === 'ru' ? localeRu : localeEn"
              color="positive"
              minimal
              first-day-of-week="1"
              flat
              :event-color = 'setEventColor'
            />
          </div>
          <div class="">
            <p>{{$t('teacher_edit_lesson_date_change')}}</p>
            <div class="new-dates">
              <q-input outlined dense dark readonly bg-color="primary"  v-model="lesson_to_edit.old_date"/>
              <div class="text-center">
                <q-icon name="east"/>
              </div>

              <q-input dark outlined dense readonly bg-color="positive" v-model="lesson_to_edit.new_date"/>
            </div>

            <q-separator spaced="lg" color="grey-3"/>
            <p>{{$t('teacher_add_lesson_recent_dates')}}</p>
            <q-scroll-area
              :thumb-style="thumbStyle"
              :bar-style="barStyle"
              class="q-mb-md q-md-md-none"
              style="max-width: 100%;height: 180px">
              <div class="add-lesson-activeDates">
                <div class="add-lesson-recentDate" v-for="(lesson,index) in teacher_current_group.lessons" :key="index">
                  <p class="no-margin text-weight-thin text-grey-6">{{ new Date(lesson.date).toLocaleDateString()}} </p>

                </div>
              </div>
            </q-scroll-area>
          </div>
        </div>
        <div class="add-lesson-bottom">

          <p class="q-mb-sm text-weight-bold">{{$t('lessons_time')}}</p>
          <q-input dense mask="time" class="q-mb-sm" outlined v-model="lesson_to_edit.time">
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time format24h v-model="lesson_to_edit.time">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup :label="$t('save_btn')" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <p class="q-mb-sm text-weight-bold">{{$t('lessons_theme')}}</p>
          <q-input class="q-mb-sm"  dense outlined v-model="lesson_to_edit.theme" />
          <p class="q-mb-sm text-weight-bold">{{$t('teacher_add_lesson_link')}}</p>
          <q-input class="q-mb-sm"  dense outlined v-model="lesson_to_edit.link" />
          <div class="text-right">
            <q-btn @click="updateLesson" :loading="is_loading" :label="$t('save_btn')"
                   class="border-r-8" color="primary" unelevated/>
          </div>
        </div>

      </q-card-section>


    </q-card>
  </q-dialog>
  <!--  edit dialog-->

  <!--  add files dialog-->
  <q-dialog
    v-model="addFilesModal"
    full-height
    @before-show="getLessonFiles"
  >
    <q-card class="modal-dialog rounded-block full-height bg-white" style="width: 850px;max-width: 90vw">
      <q-card-section class="row items-center no-padding q-mb-lg">
        <div class="text-h6 text-weight-bolder">{{$t('lessons_material')}}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="no-padding" >
        <p class="text-bold">{{$t('side_bar_menu_library')}}</p>
        <div ref="all_files" class="rounded-block q-mb-md q-mb-lg-lg">
          <div v-if="selectedFolder" class="flex items-center q-mb-lg">
            <p class="q-mb-none cursor-pointer text-underline" @click="closeFolder">{{$t('side_bar_menu_library')}}</p>
            <svg class="q-mx-sm" width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="4" cy="4.5" r="4" fill="#FFB61C"/>
            </svg>
            <p class="q-mb-none text-weight-bold ">{{this.server_folders.find(x=>x.id===selectedFolder).name}}</p>

          </div>
          <div class="files-grid">
            <div :class="[
          !item.files?
           !item.is_single && !selectedFolder ?
            'dn'
                :
                  ''
                    :
                      ''
           ]" v-for="(item,index) in all_files" :key="index">
              <div v-if="item.files">
                <div class="file-item cursor-pointer" @click="openFolder(item.id)">
                  <q-icon class="q-mr-md cursor-pointer" size="60px"
                          :name="item.user ===$auth.user.id ? 'folder_shared' : 'folder' "
                          color="warning"/>
                  <p class="no-margin text-weight-regular ">{{item.name}}</p>
                </div>
              </div>
              <div v-else >
                <div
                  draggable="true"
                  @dragstart="startDrag($event, item)"
                  style="cursor: move"
                  class="file-item  relative-position">
                  <q-icon class="q-mr-md" size="40px" name="description" color="grey-7"/>
                  <p class="no-margin text-weight-regular ellipsis">{{item.filename}} </p>
                  <q-menu
                    touch-position
                    context-menu
                    class="q-pa-sm">
                    <q-list dense style="min-width: 100px">
                      <q-item @click="currentFileUrl=item.file, previewModal=true" clickable v-close-popup>
                        <q-item-section>{{$t('item_preview')}}</q-item-section>
                      </q-item>
                      <!--                      <q-item clickable v-close-popup>-->
                      <!--                        <q-item-section>{{$t('item_add_materials')}}</q-item-section>-->
                      <!--                      </q-item>-->
                      <!--                      <q-item clickable v-close-popup>-->
                      <!--                        <q-item-section>{{$t('item_add_homework')}}</q-item-section>-->
                      <!--                      </q-item>-->
                    </q-list>
                  </q-menu>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p class="text-bold">{{$t('lessons_material')}}</p>
        <div class="rounded-block q-mb-md q-mb-lg-lg">
          <div class="files-grid"
               @dragover.prevent
               @dragenter.prevent
               @drop='onDrop($event, "materials")' >
            <div  class="upload-file">
              <q-icon size="50px" name="add" @click="uploadedMaterialsFiles=null">

                <q-file
                  v-model="uploadedMaterialsFiles"
                  label="Pick files"
                  filled
                  multiple
                  class="absolute"
                  @update:model-value="uploadedMaterialsFilesUpdated"
                  style="right: 0;left: 0;opacity: 0"
                />
              </q-icon>
            </div>
            <div
              v-for="(item,index) in selectedMaterials"
              :key="index"
              @click="selectedFile=item.id"
              :class="[selectedFile===item.id ? 'selected' : '']"
              class="file-item cursor-pointer relative-position">

              <q-badge v-if="selectedFile===item.id" @click="removeDroppedFile('materials',index)" rounded floating color="negative" class="q-pa-xs">
                <q-icon size="15px" name="close" color="white"/>
              </q-badge>
              <q-icon class="q-mr-md" size="40px" name="description" color="grey-7"/>
              <p class="no-margin text-weight-regular ellipsis">{{item.filename}} </p>
            </div>
            <div
              v-for="(item,index) in uploadedMaterials"
              :key="index"
              @click="selectedFile=item.id"
              :class="[selectedFile===item.id ? 'selected' : '']"
              class="file-item cursor-pointer relative-position">

              <q-badge v-if="selectedFile===item.id" @click="removeUploadedFile('materials',index,item.is_uploaded,item.id)" rounded floating color="negative" class="q-pa-xs">
                <q-icon size="15px" name="close" color="white"/>
              </q-badge>
              <q-icon class="q-mr-md" size="40px" name="upload_file" color="grey-5"/>
              <p class="no-margin text-weight-regular ellipsis">{{item.filename}}
                <span style="font-size: 9px" class="block  text-positive" v-if="item.is_uploaded">{{$t('teacher_file_uploaded')}}</span>
              </p>
            </div>

          </div>
        </div>
        <p class="text-bold">{{$t('home_work')}}</p>
        <div class="rounded-block q-mb-md q-mb-lg-lg">
          <div class="files-grid"
               @dragover.prevent
               @dragenter.prevent
               @drop='onDrop($event, "home_work")' >
            <div class="upload-file">
              <q-icon size="50px" name="add" @click="uploadedHomeworkFiles=null">

                <q-file
                  v-model="uploadedHomeworkFiles"
                  label="Pick files"
                  filled
                  multiple
                  class="absolute"
                  @update:model-value="uploadedHomeworkFilesUpdated"
                  style="right: 0;left: 0;opacity: 0"
                />
              </q-icon>
            </div>
            <div
              v-for="(item,index) in selectedHomework"
              :key="index"
              @click="selectedFile=item.id"
              :class="[selectedFile===item.id ? 'selected' : '']"
              class="file-item cursor-pointer relative-position">

              <q-badge v-if="selectedFile===item.id" @click="removeDroppedFile('home_work',index)" rounded floating color="negative" class="q-pa-xs">
                <q-icon size="15px" name="close" color="white"/>
              </q-badge>
              <q-icon class="q-mr-md" size="40px" name="description" color="grey-7"/>
              <p class="no-margin text-weight-regular ellipsis">{{item.filename}} </p>
            </div>
            <div
              v-for="(item,index) in uploadedHomework"
              :key="index"
              @click="selectedFile=item.id"
              :class="[selectedFile===item.id ? 'selected' : '']"
              class="file-item cursor-pointer relative-position">

              <q-badge v-if="selectedFile===item.id" @click="removeUploadedFile('home_work',index,item.is_uploaded,item.id)" rounded floating color="negative" class="q-pa-xs">
                <q-icon size="15px" name="close" color="white"/>
              </q-badge>
              <q-icon class="q-mr-md" size="40px" name="upload_file" color="grey-5"/>
              <p class="no-margin text-weight-regular ellipsis">{{item.filename}}
                <span class="block text-caption text-positive" v-if="item.is_uploaded">{{$t('teacher_file_uploaded')}}</span>
              </p>
            </div>
          </div>
        </div>
        <p class="text-bold">{{$t('teacher_comment')}}</p>
        <q-input class="q-mb-md q-mb-lg-lg" type="textarea" outlined bg-color="white" v-model="comment"/>
        <div class="text-right">
          <q-btn @click="saveLessonFiles" :loading="is_loading" :label="$t('save_btn')"
                 class="border-r-8" color="primary" unelevated/>
        </div>


      </q-card-section>


    </q-card>
  </q-dialog>
  <!--  add files dialog-->
  <!--  preview dialog-->
  <q-dialog v-model="previewModal" full-height transition-show="scale" transition-hide="scale">
    <q-card style="width: 850px;max-width: 90vw">
      <q-card-section class="flex items-center justify-between">

        <div class="text-h6">{{$t('item_preview')}}</div>
        <q-btn v-close-popup icon="close" round flat/>
      </q-card-section>
      <q-card-section style="height: 90%">
        <iframe frameborder="0"  scrolling="yes"
                :src="`https://docs.google.com/gview?url=${currentFileUrl}&embedded=true`"
                height="100%" width="100%"></iframe>
      </q-card-section>




    </q-card>
  </q-dialog>
  <!--  preview dialog-->


</template>

<script>

import AvatarWithModal from "components/Student/AvatarWithModal";
import {mapGetters,mapActions} from "vuex";

export default {
   components: {AvatarWithModal},
  preFetch ({ store, currentRoute}) {
    return store.dispatch('data/setTeacherCurrentGroup',currentRoute.params.id)
  },
  data() {
    return {
      currentFileUrl:'',
      previewModal:false,
      comment:'',
      selectedFolder:null,
      selectedFile:null,
      selectedMaterials:[],
      selectedHomework:[],
      uploadedMaterials:[],
      uploadedHomework:[],
      uploadedMaterialsFiles:[],
      uploadedHomeworkFiles:[],
      all_files:[],
      server_folders:[],
      server_files:[],
      selected_lesson_id:null,
      is_loading:false,
      addLessonModal:false,
      delLessonModal:false,
      editLessonModal:false,
      addFilesModal:false,
      editLessonIndex:0,
      lesson_to_delete:{
        id:0,
        name:''
      },
      new_lesson_date:null,
      lesson_to_edit:{
        id:0,
        theme:'',
        link:'',
        old_date:'',
        old_date_natural:'',
        new_date:'',
        new_date_natural:''
      },
      added_dates:[],
      recent_dates:[],
      new_lessons:[ ],
      link:'',
      localeRu:{
        days: 'Понедельник_Вторник_Среда_Четверг_Пятница_Суббота_Воскресенье'.split('_'),
        daysShort: 'Пн_Вт_Ср_Чт_Пт_Сб_Вс'.split('_'),
        months: 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split('_'),
        monthsShort: 'Янв_Фев_Мар_Апр_Май_Июн_Июл_Авг_Сен_Окт_Ноя_Дек'.split('_'),
        firstDayOfWeek: 0
      },
      localeEn:{
        days: 'Monday_Tuesday_Wednesday_Thursday_Friday_Saturday_Sunday'.split('_'),
        daysShort: 'Mo_Tu_We_Th_Fr_Sa_Su'.split('_'),
        months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Augu_Sep_Oct_Nov_Dec'.split('_'),
        firstDayOfWeek: 0
      },
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
  watch:{
    new_lesson_date(val){
      if (val){
        this.lesson_to_edit.new_date = this.$t('teacher_edit_lesson_date_change_to') + ' ' + new Date(val).toLocaleDateString()
        this.lesson_to_edit.new_date_natural = val.replaceAll('/','-')
      }

    }
  },
  async mounted() {
    this.height = this.$refs['group-list'].offsetHeight
    this.recent_dates = this.teacher_current_group.lessons.map(x=>x.date.replaceAll('-','/'))
    await this.updateFiles()
  },
  methods: {
    ...mapActions('data',['getTeacherGroups','setTeacherCurrentGroup']),

    getLessonFiles(){
      let curr_lesson = this.teacher_current_group.lessons.find(x=>x.id===this.selected_lesson_id)
      console.log(curr_lesson)
      this.comment = curr_lesson.comment
      for(let file of curr_lesson.material){
        this.selectedMaterials.push(file)
      }
      for(let file of curr_lesson.homeWork){
        this.selectedHomework.push(file)
      }
      for(let file of curr_lesson.uploaded_homework){
        this.uploadedHomework.push(file)
      }
      for(let file of curr_lesson.uploaded_material){
        this.uploadedMaterials.push(file)
      }

    },
    async saveLessonFiles(){
      this.is_loading = true
      let formData = new FormData()
      formData.set('id',this.selected_lesson_id)
      formData.set('comment',this.comment)
      formData.set('selectedMaterials',JSON.stringify(this.selectedMaterials))
      formData.set('selectedHomework',JSON.stringify(this.selectedHomework))
      for (let file of this.uploadedHomeworkFiles){
        formData.append("uploaded_homework", file)
      }
      for (let file of this.uploadedMaterialsFiles){
        formData.append("uploaded_materials", file)
      }
      const response = await this.$api({
        method: 'post',
        headers:{
          'content-type': 'multipart/form-data'
        },
        url: '/api/lesson/save_lesson_files',
        data: formData
      })
      this.selectedMaterials=[]
      this.selectedHomework=[]
      this.uploadedMaterials=[]
      this.uploadedHomework=[]
      this.uploadedMaterialsFiles=[]
      this.uploadedHomeworkFiles=[]
      this.comment=''
      this.is_loading = false
      await this.getTeacherGroups()
      this.setTeacherCurrentGroup(this.teacher_current_group.id)
      this.addFilesModal = false
    },
    async removeUploadedFile(list,index,uploaded,id){
      console.log(uploaded,id)
      if (uploaded){
        this.is_loading = true
        await this.$api.post('/api/lesson/delete_file',{id,list})
        this.is_loading = false
      }
      if(list==='materials'){
        this.uploadedMaterials.splice(index,1)
        this.uploadedMaterialsFiles.splice(index,1)
      }
      if(list==='home_work'){
        this.uploadedHomework.splice(index,1)
        this.uploadedHomeworkFiles.splice(index,1)
      }
    },
    uploadedMaterialsFilesUpdated(){
      this.uploadedMaterials = this.uploadedMaterials.filter(x=>x.is_uploaded)
      let id = 1000
      for(let file of this.uploadedMaterialsFiles){
        this.uploadedMaterials.push({
          id:id,
          filename:file.name,
          is_uploaded:false
        })
        id+=1
      }
    },
    uploadedHomeworkFilesUpdated(){
      this.uploadedHomework = this.uploadedHomework.filter(x=>x.is_uploaded)
      let id = 2000
      for(let file of this.uploadedHomeworkFiles){
        this.uploadedHomework.push({
          id:id,
          filename:file.name,
          is_uploaded:false
        })
        id+=1
      }
    },
    startDrag(evt, item){
      evt.dataTransfer.setData('itemID', item.id)
    },
    onDrop (evt, list) {
      const itemID = evt.dataTransfer.getData('itemID')
      const item = this.all_files.find(x=>x.id === parseInt(itemID))
      if (list==='materials'){
        if (this.selectedMaterials.findIndex(x=>x.id===item.id)===-1){
          this.selectedMaterials.push(item)
        }
      }
      if (list==='home_work'){
        if (this.selectedHomework.findIndex(x=>x.id===item.id)===-1){
          this.selectedHomework.push(item)
        }
      }
    },
    removeDroppedFile(list,index){
      if(list==='materials'){
        this.selectedMaterials.splice(index,1)
      }
      if(list==='home_work'){
        this.selectedHomework.splice(index,1)
      }
    },
    async updateFiles(){
      this.all_files = []
      // for(let x of this.$auth.user.folders){
      //   this.all_files.push(x)
      // }
      // for(let x of this.$auth.user.files){
      //   this.all_files.push(x)
      // }
      const folders = await this.$api.get('/api/lesson/folders')
      this.server_folders = folders.data
      const files = await this.$api.get('/api/lesson/files')
      this.server_files = files.data
      for(let x of this.server_folders){
        this.all_files.push(x)
      }
      for(let x of this.server_files){
        this.all_files.push(x)
      }

    },
    closeFolder(){
      this.selectedFolder = null
      this.updateFiles()
    },
    openFolder(id){
      this.selectedFolder = id

      // this.all_files=this.$auth.user.folders.find(x=>x.id===id).files
      this.all_files=this.server_folders.find(x=>x.id===id).files
    },
    optionsFn (date) {
      return new Date(date).toLocaleDateString() >= new Date().toLocaleDateString()
    },
    setEventColor(val){

      return val === this.teacher_current_group.lessons[this.editLessonIndex].date.replaceAll('-','/') ?
        'primary' :
        'grey-5'
    },
    removeDate(index,date){
      this.added_dates.splice(index,1)
      this.new_lessons.splice(this.new_lessons.findIndex(x=>x.date===date),1)
    },
    updateEditLesson(){

      this.lesson_to_edit.id = this.teacher_current_group.lessons[this.editLessonIndex].id
      this.lesson_to_edit.theme = this.teacher_current_group.lessons[this.editLessonIndex].theme
      this.lesson_to_edit.link = this.teacher_current_group.lessons[this.editLessonIndex].link
      this.lesson_to_edit.time = this.teacher_current_group.lessons[this.editLessonIndex].time
      this.lesson_to_edit.old_date =this.$t('teacher_edit_lesson_date_change_from') + ' ' + new Date(this.teacher_current_group.lessons[this.editLessonIndex].date).toLocaleDateString()
      this.lesson_to_edit.old_date_natural =this.teacher_current_group.lessons[this.editLessonIndex].date
    },
    async updateLesson(){
      this.is_loading = true
      await this.$api.post('/api/lesson/update',{
        data:this.lesson_to_edit,
      })
      await this.getTeacherGroups()
      this.setTeacherCurrentGroup(this.teacher_current_group.id)
      this.recent_dates = this.teacher_current_group.lessons.map(x=>x.date.replaceAll('-','/'))
      this.is_loading = false
      this.new_lesson_date = null
      this.editLessonIndex = 0
      this.editLessonModal =false
    },
    async deleteLesson(){
      this.is_loading = true
      await this.$api.post('/api/lesson/delete',{
        lesson_id:this.lesson_to_delete.id,
      })
      await this.getTeacherGroups()
      this.setTeacherCurrentGroup(this.teacher_current_group.id)
      this.is_loading = false
      this.delLessonModal =false
    },
    updateDates(value, reason, details){
      let date = `${details.year}/${details.month>=10 ? details.month : '0'+details.month}/${details.day}`

      if (reason==='add-day'){
        this.new_lessons.push({date:date,time:'00:00',theme:''})
      }
      if (reason==='remove-day'){
        this.new_lessons.splice(this.new_lessons.findIndex(x=>x.date===date),1)
      }
    },
    async saveAction(){
      this.is_loading = true
      console.log(this.new_lessons)
      await this.$api.post('/api/lesson/add',{
        group_id:this.teacher_current_group.id,
        lessons:this.new_lessons,
        link:this.link
      })
      await this.getTeacherGroups()
      this.setTeacherCurrentGroup(this.teacher_current_group.id)
      this.is_loading = false
      this.added_dates=[]
      this.recent_dates=[]
      this.new_lessons=[ ]
      this.addLessonModal =false


    }

  },
  computed:{
    ...mapGetters('data',['teacher_current_group'])
  }

}
</script>
<style lang="sass">
.upload-file
  border: 1px solid transparent
  text-align: center
  & .q-icon
    border: 1px dashed $grey-7

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
  &-members
    text-align: right
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
    grid-template-columns: 1fr 2fr 1fr 1fr
    grid-gap: 20px
    padding: 0 30px
  &-row
    display: grid
    grid-template-columns: 1fr 2fr 1fr 1fr
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
    width: 100%
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
@media (max-width: 1024px)
  .add-button
    position: absolute
    right: 10px
    top: 60px
  .group
    &-info
      grid-template-columns: 1fr
      grid-gap: 15px
      &-members
        text-align: left
    &-add-lesson
      grid-template-columns: 1fr
    &-list-row
      grid-template-columns: 1fr
      background: #F6F9FF !important
      padding: 30px
      border-radius: 20px
      grid-gap: 20px
      margin-bottom: 15px
      &__item
        &::after
          content: none
  .add-lesson
    &-top
      grid-template-columns: 1fr
    &-bottom-lessons
      grid-gap: 15px
    &-bottom-lesson
      grid-template-columns: 1fr
      padding: 30px
      background: #F6F9FF !important
      border-radius: 20px
  .modal-dialog
    padding: 10px
</style>
