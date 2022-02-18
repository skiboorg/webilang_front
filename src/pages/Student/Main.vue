<template>
  <q-page>
    <div v-if="current_group" class="grid">
      <div class="grid-inner">
        <div  class="rounded-block ">
          <p class="text-bold">{{$t('your_progress')}}</p>
          <q-separator class="bg-grey-3 q-mb-lg"/>
          <div class="q-mb-lg row ">


            <q-circular-progress
              show-value
              :value="$auth.user.total_progress"
              :size="$q.screen.lt.md ?  '50px' : '140px'"
              class="col-6 col-md-4 offset-3 offset-md-0"
              color="warning"
              track-color="amber-1">
              <div class="flex column items-center justify-center">
                <p class="no-margin text-caption text-bold">{{$t('course_done_top')}}</p>
                <p class="no-margin text-h4 text-warning text-weight-bolder">{{$auth.user.total_progress}}%</p>
                <p class="no-margin text-caption  text-bold">{{$t('course_done_bottom')}}</p>
              </div>
            </q-circular-progress>
            <div  class="col-12 col-md-7 offset-0 offset-md-1">
              <p v-if="student_upcoming_lessons.length>0" class="q-mb-none text-weight-light">{{$t('next_lesson')}}</p>


              <p v-if="student_upcoming_lessons.length>0" class="text-bold">{{new Date(student_upcoming_lessons[0].date).toLocaleDateString()}} |
                {{$filters.normalizeTime(student_upcoming_lessons[0].date, student_upcoming_lessons[0].time,student_upcoming_lessons[0].timeoffset)}}</p>
              <!--              <p class="text-bold">{{new Date(student_upcoming_lessons[0].date).toLocaleDateString()}} | {{new Date(student_upcoming_lessons[0].date + 'T' + student_upcoming_lessons[0].time+'+03:00').toLocaleTimeString()}}</p>-->

              <p class="q-mb-none text-weight-light">{{$t('lessons_left')}}</p>
              <p class="text-bold">{{$auth.user.personal_lessons_left}} {{$t('personal_lessons_left')}}</p>
              <p class="q-mb-none text-weight-light">{{$t('lessons_left')}}</p>
              <p class="text-bold">{{$auth.user.group_lessons_left}} {{$t('group_lessons_left')}}</p>
            </div>
          </div>
          <a v-if="student_upcoming_lessons.length>0"
             target="_blank" class="btn" :href="student_upcoming_lessons[0].link">{{$t('enter_classroom')}}</a>
        </div>
        <div v-if="student_upcoming_lessons.length>0" class="lt-md rounded-block">
          <p class="text-bold ">{{$t('lessons_materials')}}</p>
          <q-separator class="bg-grey-3 q-mb-lg"/>
          <p class="text-caption text-weight-light">{{$t('lesson_materials')}}</p>

          <div class="files-grid">
            <!--            <a class="file-item" :href="item.file" target="_blank" v-for="item in student_upcoming_lessons[0].material"></a>-->
            <div class="file-item" v-for="item in student_upcoming_lessons[0].material" :key="item.id">
              <q-icon class="q-mr-md" size="40px" name="description" color="grey-7"/>
              <p class="no-margin text-weight-regular ellipsis">{{item.filename}}</p>
              <a :href="item.file" class="file-item__icon download">
                <q-icon  name="cloud_download" size="25px" color="positive"/>
              </a>
              <q-icon class="file-item__icon preview" @click="currentFileUrl=item.file, previewModal=true" name="visibility" size="25px" color="primary"/>
            </div>

            <div class="file-item" v-for="item in student_upcoming_lessons[0].uploaded_material" :key="item.id">
              <q-icon class="q-mr-md" size="40px" name="description" color="grey-7"/>
              <p class="no-margin text-weight-regular ellipsis">{{item.filename}}</p>
              <a :href="item.file" class="file-item__icon download">
                <q-icon  name="cloud_download" size="25px" color="positive"/>
              </a>
              <q-icon class="file-item__icon preview" @click="currentFileUrl=item.file, previewModal=true" name="visibility" size="25px" color="primary"/>

            </div>
          </div>
          <q-separator class="bg-grey-3 q-mb-lg"/>
          <p class="text-caption text-weight-light">{{$t('home_work')}}</p>
          <div v-if="student_upcoming_lessons.length>0">
            <div class="files-grid">
            <div class="file-item" v-for="item in student_upcoming_lessons[0].homeWork" :key="item.id">
              <q-icon class="q-mr-md" size="40px" name="description" color="grey-7"/>
              <p class="no-margin text-weight-regular ellipsis">{{item.filename}}</p>
              <a :href="item.file" class="file-item__icon download">
                <q-icon  name="cloud_download" size="25px" color="positive"/>
              </a>
              <q-icon class="file-item__icon preview" @click="currentFileUrl=item.file, previewModal=true" name="visibility" size="25px" color="primary"/>

            </div>

            <div class="file-item" v-for="item in student_upcoming_lessons[0].uploaded_homework" :key="item.id">
              <q-icon class="q-mr-md" size="40px" name="description" color="grey-7"/>
              <p class="no-margin text-weight-regular ellipsis">{{item.filename}}</p>
              <a :href="item.file" class="file-item__icon download">
                <q-icon  name="cloud_download" size="25px" color="positive"/>
              </a>
              <q-icon class="file-item__icon preview" @click="currentFileUrl=item.file, previewModal=true" name="visibility" size="25px" color="primary"/>

            </div>

          </div>
          <div v-if="student_upcoming_lessons[0].comment">
            <q-separator  class="bg-grey-3 q-mb-lg"/>
            <p  class="text-primary q-mb-none">{{$t('teacher_comment')}}</p>
            <div class="q-mb-none q-pt-md teacher-comment" v-html="student_upcoming_lessons[0].comment"></div>
          </div>
          </div>

        </div>
         <div v-if="current_group.teacher" class="rounded-block">
          <p class="text-bold ">{{$t('your_teacher')}}</p>
          <q-separator class="bg-grey-3 q-mb-lg"/>
          <div class="flex items-center q-mb-lg">
              <AvatarWithModal  size="60px" :user="current_group.teacher" />
<!--            <q-avatar size="60px" class="q-mr-lg">-->
<!--              <img class="avatar-img" :src="current_group.teacher.user_avatar" alt="">-->
<!--            </q-avatar>-->
            <p  class="q-mb-none q-ml-md text-weight-bolder text-fs-18">{{current_group.teacher.firstname}} {{current_group.teacher.lastname}}</p>
          </div>
          <q-btn :to="{name:'student-chats',query: { o_id: current_group.teacher.id+947623 }}" color="primary" icon="mail_outline" no-caps class="border-r-8 full-width text-bold q-py-sm" :label="$t('chat_w_teacher')"/>
        </div>
        <div class="rounded-block">
          <p class="text-bold no-margin">{{$t('activity_reward')}}</p>
          <q-no-ssr>
            <p class="text-caption text-bold text-grey-5">{{$t('activity_reward_to_date')}} {{new Date().toLocaleDateString()}}</p>
          </q-no-ssr>
          <q-separator class="bg-grey-3 q-mb-lg"/>
          <div class="rewards">
            <div v-show="!reward.reward.is_full_cource_reward" v-for="reward in $auth.user.rewards" :key="reward.id">
              <q-avatar  rounded class="relative-position" size="80px" >
              <img class="avatar-img" :src="reward.reward.image" alt="">
              <div v-if="reward.count>1" class="reward-count"><p class="no-margin text-body1">{{reward.count}}</p></div>
            </q-avatar>
            </div>

          </div>
          <q-separator spaced="md"/>
          <div class="rewards">
            <div v-show="reward.reward.is_full_cource_reward" v-for="reward in $auth.user.rewards" :key="reward.id">
              <q-avatar  rounded class="relative-position" size="80px" >
              <img class="avatar-img" :src="reward.reward.image" alt="">
              <div v-if="reward.count>1" class="reward-count"><p class="no-margin text-body1">{{reward.count}}</p></div>
            </q-avatar>
            </div>

          </div>
        </div>

      </div>
      <div class="grid-inner">
        <div v-if="student_upcoming_lessons.length>0" class="gt-sm rounded-block">
          <p class="text-bold ">{{$t('lessons_materials')}}</p>
          <q-separator class="bg-grey-3 q-mb-lg"/>
          <p class="text-caption text-weight-light">{{$t('lesson_materials')}}</p>

          <div class="files-grid">
            <!--            <a class="file-item" :href="item.file" target="_blank" v-for="item in student_upcoming_lessons[0].material"></a>-->
            <div class="file-item" v-for="item in student_upcoming_lessons[0].material" :key="item.id">
              <q-icon class="q-mr-md" size="40px" name="description" color="grey-7"/>
              <p class="no-margin text-weight-regular ellipsis">{{item.filename}}</p>
              <a :href="item.file" class="file-item__icon download">
                <q-icon  name="cloud_download" size="25px" color="positive"/>
              </a>
              <q-icon class="file-item__icon preview" @click="currentFileUrl=item.file, previewModal=true" name="visibility" size="25px" color="primary"/>
            </div>

            <div class="file-item" v-for="item in student_upcoming_lessons[0].uploaded_material" :key="item.id">
              <q-icon class="q-mr-md" size="40px" name="description" color="grey-7"/>
              <p class="no-margin text-weight-regular ellipsis">{{item.filename}}</p>
              <a :href="item.file" class="file-item__icon download">
                <q-icon  name="cloud_download" size="25px" color="positive"/>
              </a>
              <q-icon class="file-item__icon preview" @click="currentFileUrl=item.file, previewModal=true" name="visibility" size="25px" color="primary"/>

            </div>
          </div>
          <q-separator class="bg-grey-3 q-mb-lg"/>
          <p class="text-caption text-weight-light">{{$t('home_work')}}</p>
          <div class="files-grid">
            <div class="file-item" v-for="item in student_upcoming_lessons[0].homeWork" :key="item.id">
              <q-icon class="q-mr-md" size="40px" name="description" color="grey-7"/>
              <p class="no-margin text-weight-regular ellipsis">{{item.filename}}</p>
              <a :href="item.file" class="file-item__icon download">
                <q-icon  name="cloud_download" size="25px" color="positive"/>
              </a>
              <q-icon class="file-item__icon preview" @click="currentFileUrl=item.file, previewModal=true" name="visibility" size="25px" color="primary"/>

            </div>

            <div class="file-item" v-for="item in student_upcoming_lessons[0].uploaded_homework" :key="item.id">
              <q-icon class="q-mr-md" size="40px" name="description" color="grey-7"/>
              <p class="no-margin text-weight-regular ellipsis">{{item.filename}}</p>
              <a :href="item.file" class="file-item__icon download">
                <q-icon  name="cloud_download" size="25px" color="positive"/>
              </a>
              <q-icon class="file-item__icon preview" @click="currentFileUrl=item.file, previewModal=true" name="visibility" size="25px" color="primary"/>

            </div>

          </div>
          <div v-if="student_upcoming_lessons[0].comment">
            <q-separator  class="bg-grey-3 q-mb-lg"/>
            <p  class="text-primary q-mb-none">{{$t('teacher_comment')}}</p>
          <div class="q-mb-none q-pt-md teacher-comment" v-html="student_upcoming_lessons[0].comment"></div>
          </div>
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
    <div v-else class="">
      <div class="info-block q-mb-lg">
        <p class="text-bold ">{{$t('student_info_block_1_title')}}</p>
        <p class="no-margin">{{$t('student_info_block_1_text')}}</p>
      </div>
      <div class="grid q-mb-lg">
        <div class="info-block">
          <p class="text-bold " v-html="$t('student_info_block_2_title')"></p>
          <p class="q-mb-lg"  v-html="$t('student_info_block_2_text')"></p>
          <a class="link" target="_blank" href="https://wa.me/79609980136">{{$t('student_info_block_2_link')}}</a>
        </div>
        <div class="info-block">
          <p class="text-bold " v-html="$t('student_info_block_3_title')"></p>
          <p class="q-mb-lg"  v-html="$t('student_info_block_3_text')"></p>
          <div class="link flex items-center">
            <svg class="q-mr-sm" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6C8.40666 6 7.82664 6.17595 7.33329 6.50559C6.83994 6.83524 6.45543 7.30377 6.22836 7.85195C6.0013 8.40013 5.94189 9.00333 6.05765 9.58527C6.1734 10.1672 6.45912 10.7018 6.87868 11.1213C7.29824 11.5409 7.83279 11.8266 8.41473 11.9424C8.99667 12.0581 9.59987 11.9987 10.1481 11.7716C10.6962 11.5446 11.1648 11.1601 11.4944 10.6667C11.8241 10.1734 12 9.59334 12 9C12 8.20435 11.6839 7.44129 11.1213 6.87868C10.5587 6.31607 9.79565 6 9 6ZM9 10.5C8.70333 10.5 8.41332 10.412 8.16665 10.2472C7.91997 10.0824 7.72771 9.84811 7.61418 9.57403C7.50065 9.29994 7.47095 8.99834 7.52882 8.70736C7.5867 8.41639 7.72956 8.14912 7.93934 7.93934C8.14912 7.72956 8.41639 7.5867 8.70737 7.52882C8.99834 7.47094 9.29994 7.50065 9.57403 7.61418C9.84812 7.72771 10.0824 7.91997 10.2472 8.16665C10.412 8.41332 10.5 8.70333 10.5 9C10.5 9.39783 10.342 9.77936 10.0607 10.0607C9.77936 10.342 9.39783 10.5 9 10.5Z" fill="#09B5EC"/>
              <path d="M15.9704 10.425L15.6374 10.233C15.7873 9.41733 15.7873 8.58117 15.6374 7.7655L15.9704 7.5735C16.2264 7.42576 16.4509 7.22903 16.6309 6.99455C16.811 6.76006 16.9431 6.4924 17.0197 6.20686C17.0963 5.92132 17.1159 5.62349 17.0774 5.33037C17.0389 5.03725 16.9431 4.75458 16.7954 4.4985C16.6476 4.24242 16.4509 4.01795 16.2164 3.8379C15.9819 3.65785 15.7143 3.52575 15.4287 3.44915C15.1432 3.37254 14.8453 3.35292 14.5522 3.39142C14.2591 3.42991 13.9764 3.52576 13.7204 3.6735L13.3866 3.86625C12.7563 3.32769 12.0318 2.91019 11.2498 2.63475V2.25C11.2498 1.65326 11.0128 1.08097 10.5908 0.65901C10.1689 0.237053 9.59659 0 8.99985 0C8.40311 0 7.83082 0.237053 7.40886 0.65901C6.9869 1.08097 6.74985 1.65326 6.74985 2.25V2.63475C5.96789 2.91118 5.24374 3.3297 4.61385 3.86925L4.2786 3.675C3.76143 3.37663 3.14691 3.29593 2.57024 3.45065C1.99356 3.60536 1.50197 3.98283 1.2036 4.5C0.905231 5.01717 0.824528 5.63169 0.979246 6.20836C1.13396 6.78504 1.51143 7.27663 2.0286 7.575L2.3616 7.767C2.21168 8.58267 2.21168 9.41883 2.3616 10.2345L2.0286 10.4265C1.51143 10.7249 1.13396 11.2165 0.979246 11.7931C0.824528 12.3698 0.905231 12.9843 1.2036 13.5015C1.50197 14.0187 1.99356 14.3961 2.57024 14.5509C3.14691 14.7056 3.76143 14.6249 4.2786 14.3265L4.61235 14.1337C5.24292 14.6724 5.96758 15.0899 6.74985 15.3652V15.75C6.74985 16.3467 6.9869 16.919 7.40886 17.341C7.83082 17.7629 8.40311 18 8.99985 18C9.59659 18 10.1689 17.7629 10.5908 17.341C11.0128 16.919 11.2498 16.3467 11.2498 15.75V15.3652C12.0318 15.0888 12.756 14.6703 13.3858 14.1307L13.7211 14.3243C14.2383 14.6226 14.8528 14.7033 15.4295 14.5486C16.0061 14.3939 16.4977 14.0164 16.7961 13.4993C17.0945 12.9821 17.1752 12.3676 17.0205 11.7909C16.8657 11.2142 16.4883 10.7226 15.9711 10.4242L15.9704 10.425ZM14.0594 7.593C14.3133 8.5133 14.3133 9.4852 14.0594 10.4055C14.015 10.5657 14.0251 10.7361 14.0881 10.8899C14.1511 11.0437 14.2634 11.1722 14.4073 11.2552L15.2204 11.7248C15.3927 11.8242 15.5185 11.9881 15.57 12.1803C15.6216 12.3725 15.5947 12.5773 15.4952 12.7496C15.3958 12.922 15.2319 13.0478 15.0397 13.0993C14.8475 13.1509 14.6427 13.124 14.4704 13.0245L13.6558 12.5535C13.5118 12.4701 13.344 12.4369 13.179 12.4593C13.014 12.4817 12.8612 12.5584 12.7446 12.6772C12.077 13.3587 11.236 13.845 10.3123 14.0835C10.1511 14.125 10.0083 14.2189 9.90629 14.3504C9.80432 14.482 9.74902 14.6438 9.7491 14.8102V15.75C9.7491 15.9489 9.67008 16.1397 9.52943 16.2803C9.38878 16.421 9.19801 16.5 8.9991 16.5C8.80019 16.5 8.60942 16.421 8.46877 16.2803C8.32812 16.1397 8.2491 15.9489 8.2491 15.75V14.811C8.24918 14.6445 8.19388 14.4828 8.0919 14.3512C7.98993 14.2196 7.84707 14.1257 7.68585 14.0842C6.76211 13.8448 5.92135 13.3575 5.25435 12.675C5.13774 12.5561 4.9849 12.4795 4.81992 12.4571C4.65493 12.4347 4.48718 12.4678 4.3431 12.5513L3.5301 13.0215C3.44477 13.0715 3.35039 13.1042 3.25239 13.1176C3.15439 13.131 3.05471 13.1249 2.95909 13.0996C2.86346 13.0743 2.77379 13.0303 2.69521 12.9703C2.61664 12.9102 2.55073 12.8352 2.50128 12.7495C2.45182 12.6638 2.4198 12.5692 2.40705 12.4712C2.3943 12.3731 2.40108 12.2734 2.42699 12.178C2.45291 12.0825 2.49745 11.9931 2.55805 11.915C2.61865 11.8368 2.69411 11.7714 2.7801 11.7225L3.5931 11.253C3.73706 11.1699 3.84936 11.0414 3.91234 10.8876C3.97533 10.7338 3.98545 10.5634 3.9411 10.4032C3.68712 9.48295 3.68712 8.51105 3.9411 7.59075C3.98465 7.43091 3.97405 7.26115 3.91096 7.10797C3.84787 6.95479 3.73584 6.8268 3.59235 6.744L2.77935 6.2745C2.60699 6.17504 2.4812 6.01119 2.42965 5.81899C2.3781 5.62679 2.40502 5.42198 2.50447 5.24962C2.60393 5.07727 2.76778 4.95148 2.95998 4.89993C3.15218 4.84838 3.35699 4.87529 3.52935 4.97475L4.34385 5.44575C4.48753 5.52939 4.65493 5.56291 4.81974 5.54105C4.98455 5.51919 5.13743 5.4432 5.25435 5.325C5.92191 4.64351 6.76292 4.15727 7.6866 3.91875C7.84832 3.87717 7.99155 3.78281 8.09358 3.65063C8.1956 3.51844 8.2506 3.35598 8.24985 3.189V2.25C8.24985 2.05109 8.32887 1.86032 8.46952 1.71967C8.61017 1.57902 8.80094 1.5 8.99985 1.5C9.19876 1.5 9.38953 1.57902 9.53018 1.71967C9.67083 1.86032 9.74985 2.05109 9.74985 2.25V3.189C9.74977 3.35547 9.80507 3.51723 9.90705 3.64881C10.009 3.78039 10.1519 3.8743 10.3131 3.91575C11.2371 4.15511 12.0781 4.64241 12.7453 5.325C12.862 5.44385 13.0148 5.52052 13.1798 5.54292C13.3448 5.56533 13.5125 5.5322 13.6566 5.44875L14.4696 4.9785C14.5549 4.92848 14.6493 4.89583 14.7473 4.88243C14.8453 4.86903 14.945 4.87514 15.0406 4.90043C15.1362 4.92571 15.2259 4.96965 15.3045 5.02974C15.3831 5.08982 15.449 5.16485 15.4984 5.2505C15.5479 5.33616 15.5799 5.43076 15.5927 5.52884C15.6054 5.62693 15.5986 5.72656 15.5727 5.82202C15.5468 5.91747 15.5023 6.00686 15.4417 6.08503C15.381 6.1632 15.3056 6.22861 15.2196 6.2775L14.4066 6.747C14.2634 6.83003 14.1517 6.95811 14.0889 7.11127C14.026 7.26443 14.0157 7.43407 14.0594 7.59375V7.593Z" fill="#09B5EC"/>
            </svg>
            <router-link :to="{name:'student-settings'}">{{$t('student_info_block_3_link')}}</router-link>
          </div>
        </div>
        <div class="info-block">
          <p class="text-bold " v-html="$t('student_info_block_4_title')"></p>
          <p class="q-mb-lg" v-html="$t('student_info_block_4_text')"></p>
          <div class="link flex items-center">
            <svg class="q-mr-sm" width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.3333 3.66732V12.0007C18.3333 12.9173 17.5833 13.6673 16.6667 13.6673H3.33333C2.875 13.6673 2.5 13.2923 2.5 12.834C2.5 12.3756 2.875 12.0007 3.33333 12.0007H16.6667V3.66732C16.6667 3.20898 17.0417 2.83398 17.5 2.83398C17.9583 2.83398 18.3333 3.20898 18.3333 3.66732ZM2.5 10.334C1.11667 10.334 0 9.21732 0 7.83398V2.83398C0 1.45065 1.11667 0.333984 2.5 0.333984H12.5C13.8833 0.333984 15 1.45065 15 2.83398V8.66732C15 9.58398 14.25 10.334 13.3333 10.334H2.5ZM5 5.33398C5 6.71732 6.11667 7.83398 7.5 7.83398C8.88333 7.83398 10 6.71732 10 5.33398C10 3.95065 8.88333 2.83398 7.5 2.83398C6.11667 2.83398 5 3.95065 5 5.33398Z" fill="#09B5EC"/>
            </svg>

            <router-link :to="{name:'student-payment'}">{{$t('student_info_block_4_link')}}</router-link>
          </div>
        </div>
        <div class="info-block grey-bg">
          <p class="text-bold " v-html="$t('student_info_block_5_title')"></p>
          <p class="q-mb-lg" v-html="$t('student_info_block_5_text')"></p>
          <p class="flex items-center q-mb-none">
            <svg class="q-mr-sm" width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_1840_21048)">
                <path d="M10.5 0.5C9.125 0.5 8 1.625 8 3V38C8 39.375 9.125 40.5 10.5 40.5H35.5C36.875 40.5 38 39.375 38 38V10.5L28 0.5H10.5Z" fill="#FFF5E0"/>
                <path d="M30.5 10.5H38L28 0.5V8C28 9.375 29.125 10.5 30.5 10.5Z" fill="#FFE9BA"/>
                <path d="M38 18L30.5 10.5H38V18Z" fill="#A7AAB4" fill-opacity="0.2"/>
                <path d="M33 33C33 33.6875 32.4375 34.25 31.75 34.25H4.25C3.5625 34.25 3 33.6875 3 33V20.5C3 19.8125 3.5625 19.25 4.25 19.25H31.75C32.4375 19.25 33 19.8125 33 20.5V33Z" fill="#FF6262"/>
                <path d="M8.44922 24.1841C8.44922 23.8541 8.70922 23.4941 9.12797 23.4941H11.4367C12.7367 23.4941 13.9067 24.3641 13.9067 26.0316C13.9067 27.6116 12.7367 28.4916 11.4367 28.4916H9.76797V29.8116C9.76797 30.2516 9.48797 30.5004 9.12797 30.5004C8.79797 30.5004 8.44922 30.2516 8.44922 29.8116V24.1841ZM9.76797 24.7529V27.2429H11.4367C12.1067 27.2429 12.6367 26.6516 12.6367 26.0316C12.6367 25.3329 12.1067 24.7529 11.4367 24.7529H9.76797Z" fill="white"/>
                <path d="M15.8638 30.5002C15.5338 30.5002 15.1738 30.3202 15.1738 29.8815V24.204C15.1738 23.8452 15.5338 23.584 15.8638 23.584H18.1526C22.7201 23.584 22.6201 30.5002 18.2426 30.5002H15.8638ZM16.4938 24.804V29.2815H18.1526C20.8513 29.2815 20.9713 24.804 18.1526 24.804H16.4938Z" fill="white"/>
                <path d="M24.2411 24.8833V26.472H26.7898C27.1498 26.472 27.5098 26.832 27.5098 27.1808C27.5098 27.5108 27.1498 27.7808 26.7898 27.7808H24.2411V29.8795C24.2411 30.2295 23.9923 30.4983 23.6423 30.4983C23.2023 30.4983 22.9336 30.2295 22.9336 29.8795V24.202C22.9336 23.8433 23.2036 23.582 23.6423 23.582H27.1511C27.5911 23.582 27.8511 23.8433 27.8511 24.202C27.8511 24.522 27.5911 24.882 27.1511 24.882H24.2411V24.8833Z" fill="white"/>
                <path d="M31.75 34.25H8V35.5H31.75C32.4375 35.5 33 34.9375 33 34.25V33C33 33.6875 32.4375 34.25 31.75 34.25Z" fill="#CAD1D8"/>
              </g>
              <defs>
                <clipPath id="clip0_1840_21048">
                  <rect width="40" height="40" fill="white" transform="translate(0.5 0.5)"/>
                </clipPath>
              </defs>
            </svg>
            <a class="link" target="_blank" :href="$i18n.locale === 'ru' ? '/help_ru.pdf' : '/help_en.pdf'" >{{$t('student_info_block_5_link')}}</a></p>
        </div>
      </div>
      <div class="info-block w-bg">
        <p class="text-bold ">{{$t('student_info_block_6_title')}}</p>
        <p class="no-margin">{{$t('student_info_block_6_text')}}</p>
      </div>
    </div>
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
  </q-page>

</template>

<script>


import {mapGetters} from "vuex";
import AvatarWithModal from "components/Student/AvatarWithModal";
export default {
   components: {AvatarWithModal},
  data() {
    return {
      currentFileUrl:'',
      previewModal:false,
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
@media (max-width: 1024px)
  .grid
    grid-template-columns: 1fr

.info-block
  background: #EFFBEF
  border-radius: 15px
  padding: 20px
  &.grey-bg
    background: #F5F5F5
  &.w-bg
    background: #FFE0E0
</style>
