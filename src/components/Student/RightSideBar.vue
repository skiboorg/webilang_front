<template>
  <q-no-ssr>
    <div class="user-menu q-mb-md q-mb-md-none lt-md" @click="menuActive=!menuActive">
        <div class="user-menu-top">
          <q-avatar size=40px >
            <img  class="avatar-img" :src="$auth.user.user_avatar" >
          </q-avatar>
          <p class="no-margin ellipsis ">{{$auth.user.firstname}} </p>
          <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.30296 9.4183C6.90314 9.95691 6.09686 9.95691 5.69704 9.4183L3.78764 6.84604C3.29783 6.1862 3.76882 5.25 4.59059 5.25L8.40941 5.25C9.23118 5.25 9.70217 6.1862 9.21236 6.84604L7.30296 9.4183Z" fill="#545454"/>
          </svg>
        </div>
        <div class="user-menu-bottom" :class="{active:menuActive}">
          <router-link class="user-menu-bottom__item" :to="$auth.user.is_teacher ? {name:'teacher-settings'} : {name:'student-settings'} ">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6C8.40666 6 7.82664 6.17595 7.33329 6.50559C6.83994 6.83524 6.45543 7.30377 6.22836 7.85195C6.0013 8.40013 5.94189 9.00333 6.05765 9.58527C6.1734 10.1672 6.45912 10.7018 6.87868 11.1213C7.29824 11.5409 7.83279 11.8266 8.41473 11.9424C8.99667 12.0581 9.59987 11.9987 10.1481 11.7716C10.6962 11.5446 11.1648 11.1601 11.4944 10.6667C11.8241 10.1734 12 9.59334 12 9C12 8.20435 11.6839 7.44129 11.1213 6.87868C10.5587 6.31607 9.79565 6 9 6ZM9 10.5C8.70333 10.5 8.41332 10.412 8.16665 10.2472C7.91997 10.0824 7.72771 9.84811 7.61418 9.57403C7.50065 9.29994 7.47095 8.99834 7.52882 8.70736C7.5867 8.41639 7.72956 8.14912 7.93934 7.93934C8.14912 7.72956 8.41639 7.5867 8.70737 7.52882C8.99834 7.47094 9.29994 7.50065 9.57403 7.61418C9.84812 7.72771 10.0824 7.91997 10.2472 8.16665C10.412 8.41332 10.5 8.70333 10.5 9C10.5 9.39783 10.342 9.77936 10.0607 10.0607C9.77936 10.342 9.39783 10.5 9 10.5Z" fill="#184055"/>
              <path d="M15.9704 10.425L15.6374 10.233C15.7873 9.41733 15.7873 8.58117 15.6374 7.7655L15.9704 7.5735C16.2264 7.42576 16.4509 7.22903 16.6309 6.99455C16.811 6.76006 16.9431 6.4924 17.0197 6.20686C17.0963 5.92132 17.1159 5.62349 17.0774 5.33037C17.0389 5.03725 16.9431 4.75458 16.7954 4.4985C16.6476 4.24242 16.4509 4.01795 16.2164 3.8379C15.9819 3.65785 15.7143 3.52575 15.4287 3.44915C15.1432 3.37254 14.8453 3.35292 14.5522 3.39142C14.2591 3.42991 13.9764 3.52576 13.7204 3.6735L13.3866 3.86625C12.7563 3.32769 12.0318 2.91019 11.2498 2.63475V2.25C11.2498 1.65326 11.0128 1.08097 10.5908 0.65901C10.1689 0.237053 9.59659 0 8.99985 0C8.40311 0 7.83082 0.237053 7.40886 0.65901C6.9869 1.08097 6.74985 1.65326 6.74985 2.25V2.63475C5.96789 2.91118 5.24374 3.3297 4.61385 3.86925L4.2786 3.675C3.76143 3.37663 3.14691 3.29593 2.57024 3.45065C1.99356 3.60536 1.50197 3.98283 1.2036 4.5C0.905231 5.01717 0.824528 5.63169 0.979246 6.20836C1.13396 6.78504 1.51143 7.27663 2.0286 7.575L2.3616 7.767C2.21168 8.58267 2.21168 9.41883 2.3616 10.2345L2.0286 10.4265C1.51143 10.7249 1.13396 11.2165 0.979246 11.7931C0.824528 12.3698 0.905231 12.9843 1.2036 13.5015C1.50197 14.0187 1.99356 14.3961 2.57024 14.5509C3.14691 14.7056 3.76143 14.6249 4.2786 14.3265L4.61235 14.1337C5.24292 14.6724 5.96758 15.0899 6.74985 15.3652V15.75C6.74985 16.3467 6.9869 16.919 7.40886 17.341C7.83082 17.7629 8.40311 18 8.99985 18C9.59659 18 10.1689 17.7629 10.5908 17.341C11.0128 16.919 11.2498 16.3467 11.2498 15.75V15.3652C12.0318 15.0888 12.756 14.6703 13.3858 14.1307L13.7211 14.3243C14.2383 14.6226 14.8528 14.7033 15.4295 14.5486C16.0061 14.3939 16.4977 14.0164 16.7961 13.4993C17.0945 12.9821 17.1752 12.3676 17.0205 11.7909C16.8657 11.2142 16.4883 10.7226 15.9711 10.4242L15.9704 10.425ZM14.0594 7.593C14.3133 8.5133 14.3133 9.4852 14.0594 10.4055C14.015 10.5657 14.0251 10.7361 14.0881 10.8899C14.1511 11.0437 14.2634 11.1722 14.4073 11.2552L15.2204 11.7248C15.3927 11.8242 15.5185 11.9881 15.57 12.1803C15.6216 12.3725 15.5947 12.5773 15.4952 12.7496C15.3958 12.922 15.2319 13.0478 15.0397 13.0993C14.8475 13.1509 14.6427 13.124 14.4704 13.0245L13.6558 12.5535C13.5118 12.4701 13.344 12.4369 13.179 12.4593C13.014 12.4817 12.8612 12.5584 12.7446 12.6772C12.077 13.3587 11.236 13.845 10.3123 14.0835C10.1511 14.125 10.0083 14.2189 9.90629 14.3504C9.80432 14.482 9.74902 14.6438 9.7491 14.8102V15.75C9.7491 15.9489 9.67008 16.1397 9.52943 16.2803C9.38878 16.421 9.19801 16.5 8.9991 16.5C8.80019 16.5 8.60942 16.421 8.46877 16.2803C8.32812 16.1397 8.2491 15.9489 8.2491 15.75V14.811C8.24918 14.6445 8.19388 14.4828 8.0919 14.3512C7.98993 14.2196 7.84707 14.1257 7.68585 14.0842C6.76211 13.8448 5.92135 13.3575 5.25435 12.675C5.13774 12.5561 4.9849 12.4795 4.81992 12.4571C4.65493 12.4347 4.48718 12.4678 4.3431 12.5513L3.5301 13.0215C3.44477 13.0715 3.35039 13.1042 3.25239 13.1176C3.15439 13.131 3.05471 13.1249 2.95909 13.0996C2.86346 13.0743 2.77379 13.0303 2.69521 12.9703C2.61664 12.9102 2.55073 12.8352 2.50128 12.7495C2.45182 12.6638 2.4198 12.5692 2.40705 12.4712C2.3943 12.3731 2.40108 12.2734 2.42699 12.178C2.45291 12.0825 2.49745 11.9931 2.55805 11.915C2.61865 11.8368 2.69411 11.7714 2.7801 11.7225L3.5931 11.253C3.73706 11.1699 3.84936 11.0414 3.91234 10.8876C3.97533 10.7338 3.98545 10.5634 3.9411 10.4032C3.68712 9.48295 3.68712 8.51105 3.9411 7.59075C3.98465 7.43091 3.97405 7.26115 3.91096 7.10797C3.84787 6.95479 3.73584 6.8268 3.59235 6.744L2.77935 6.2745C2.60699 6.17504 2.4812 6.01119 2.42965 5.81899C2.3781 5.62679 2.40502 5.42198 2.50447 5.24962C2.60393 5.07727 2.76778 4.95148 2.95998 4.89993C3.15218 4.84838 3.35699 4.87529 3.52935 4.97475L4.34385 5.44575C4.48753 5.52939 4.65493 5.56291 4.81974 5.54105C4.98455 5.51919 5.13743 5.4432 5.25435 5.325C5.92191 4.64351 6.76292 4.15727 7.6866 3.91875C7.84832 3.87717 7.99155 3.78281 8.09358 3.65063C8.1956 3.51844 8.2506 3.35598 8.24985 3.189V2.25C8.24985 2.05109 8.32887 1.86032 8.46952 1.71967C8.61017 1.57902 8.80094 1.5 8.99985 1.5C9.19876 1.5 9.38953 1.57902 9.53018 1.71967C9.67083 1.86032 9.74985 2.05109 9.74985 2.25V3.189C9.74977 3.35547 9.80507 3.51723 9.90705 3.64881C10.009 3.78039 10.1519 3.8743 10.3131 3.91575C11.2371 4.15511 12.0781 4.64241 12.7453 5.325C12.862 5.44385 13.0148 5.52052 13.1798 5.54292C13.3448 5.56533 13.5125 5.5322 13.6566 5.44875L14.4696 4.9785C14.5549 4.92848 14.6493 4.89583 14.7473 4.88243C14.8453 4.86903 14.945 4.87514 15.0406 4.90043C15.1362 4.92571 15.2259 4.96965 15.3045 5.02974C15.3831 5.08982 15.449 5.16485 15.4984 5.2505C15.5479 5.33616 15.5799 5.43076 15.5927 5.52884C15.6054 5.62693 15.5986 5.72656 15.5727 5.82202C15.5468 5.91747 15.5023 6.00686 15.4417 6.08503C15.381 6.1632 15.3056 6.22861 15.2196 6.2775L14.4066 6.747C14.2634 6.83003 14.1517 6.95811 14.0889 7.11127C14.026 7.26443 14.0157 7.43407 14.0594 7.59375V7.593Z" fill="#184055"/>
            </svg>
            <p class="no-margin">{{$t('side_bar_menu_settings')}}</p>
          </router-link>
          <router-link v-if="!$auth.user.is_teacher" class="user-menu-bottom__item" :to="{name:'student-payment'}">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.25 6V13.5C17.25 14.325 16.575 15 15.75 15H3.75C3.3375 15 3 14.6625 3 14.25C3 13.8375 3.3375 13.5 3.75 13.5H15.75V6C15.75 5.5875 16.0875 5.25 16.5 5.25C16.9125 5.25 17.25 5.5875 17.25 6ZM3 12C1.755 12 0.75 10.995 0.75 9.75V5.25C0.75 4.005 1.755 3 3 3H12C13.245 3 14.25 4.005 14.25 5.25V10.5C14.25 11.325 13.575 12 12.75 12H3ZM5.25 7.5C5.25 8.745 6.255 9.75 7.5 9.75C8.745 9.75 9.75 8.745 9.75 7.5C9.75 6.255 8.745 5.25 7.5 5.25C6.255 5.25 5.25 6.255 5.25 7.5Z" fill="#184055"/>
            </svg>

            <p class="no-margin">{{$t('side_bar_menu_payment')}}</p>
          </router-link>
          <router-link class="user-menu-bottom__item" :to="$auth.user.is_teacher ?
            {name:'teacher-chats',query: { o_id: 1+947623 }}
            :
            {name:'student-chats',query: { o_id: 1+947623 }}">
            <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.7505 8.318V7.25C15.7505 5.45979 15.0394 3.7429 13.7735 2.47703C12.5076 1.21116 10.7907 0.5 9.00051 0.5C7.2103 0.5 5.49341 1.21116 4.22754 2.47703C2.96167 3.7429 2.25051 5.45979 2.25051 7.25V8.318C1.46388 8.66438 0.820113 9.27046 0.426978 10.0348C0.0338442 10.7991 -0.084792 11.6753 0.0909304 12.5167C0.266653 13.358 0.726068 14.1135 1.39226 14.6566C2.05846 15.1997 2.891 15.4974 3.75051 15.5C4.14834 15.5 4.52987 15.342 4.81117 15.0607C5.09248 14.7794 5.25051 14.3978 5.25051 14V9.5C5.25051 9.10218 5.09248 8.72065 4.81117 8.43934C4.52987 8.15804 4.14834 8 3.75051 8V7.25C3.75051 5.85761 4.30364 4.52226 5.2882 3.53769C6.27277 2.55312 7.60813 2 9.00051 2C10.3929 2 11.7283 2.55312 12.7128 3.53769C13.6974 4.52226 14.2505 5.85761 14.2505 7.25V8C13.8527 8 13.4712 8.15804 13.1899 8.43934C12.9085 8.72065 12.7505 9.10218 12.7505 9.5V14H10.5005C10.3016 14 10.1108 14.079 9.97018 14.2197C9.82953 14.3603 9.75051 14.5511 9.75051 14.75C9.75051 14.9489 9.82953 15.1397 9.97018 15.2803C10.1108 15.421 10.3016 15.5 10.5005 15.5H14.2505C15.11 15.4974 15.9426 15.1997 16.6088 14.6566C17.275 14.1135 17.7344 13.358 17.9101 12.5167C18.0858 11.6753 17.9672 10.7991 17.574 10.0348C17.1809 9.27046 16.5371 8.66438 15.7505 8.318ZM3.75051 14C3.15377 14 2.58148 13.7629 2.15952 13.341C1.73757 12.919 1.50051 12.3467 1.50051 11.75C1.50051 11.1533 1.73757 10.581 2.15952 10.159C2.58148 9.73705 3.15377 9.5 3.75051 9.5V14ZM14.2505 14V9.5C14.8472 9.5 15.4195 9.73705 15.8415 10.159C16.2635 10.581 16.5005 11.1533 16.5005 11.75C16.5005 12.3467 16.2635 12.919 15.8415 13.341C15.4195 13.7629 14.8472 14 14.2505 14Z" fill="#184055"/>
            </svg>

            <p class="no-margin">{{$t('side_bar_menu_help')}}</p>
          </router-link>
          <div class="user-menu-bottom__item cursor-pointer" @click="logoutUserAction">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.40833 12.9917L9.58333 14.1667L13.75 10L9.58333 5.83333L8.40833 7.00833L10.5583 9.16667H2.5V10.8333H10.5583L8.40833 12.9917ZM15.8333 2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V7.5H4.16667V4.16667H15.8333V15.8333H4.16667V12.5H2.5V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V4.16667C17.5 3.25 16.75 2.5 15.8333 2.5Z" fill="#184055"/>
            </svg>

            <p class="no-margin ">{{$t('side_bar_menu_logout')}}</p>
          </div>
        </div>

      </div>
    <div v-if="user_groups" class="right-sidebar">
    <div class="rounded-block timeblock q-mb-md">
      <div class="flex items-center justify-between">
        <q-no-ssr>
<!--          :class="{pm:!timeFormat}"-->
          <p  class=" time no-margin">{{displayTime}}</p>
        </q-no-ssr>
        <q-icon @click="timeSettingsOpen = !timeSettingsOpen" size="18px" class="cursor-pointer" color="grey-6" name="settings"/>
      </div>
      <q-btn-toggle
        v-if="timeSettingsOpen"
        class="q-mb-md"
        v-model="timeFormat"
        :disable="is_loading"
        spread
        no-caps
        toggle-color="primary"
        color="white"
        rounded
        padding="10px"
        unelevated
        text-color="black"
        :options="[
          {label: '24 hr', value: true},
          {label: 'AM/PM', value: false}
        ]"
      />


    </div>
    <div class="rounded-block q-mb-md">
      <q-date
        v-model="calendar"
        class="calendar "
        :events="current_group_lesson_dates"
        :locale="$i18n.locale === 'ru' ? localeRu : localeEn"
        color="positive"
        :first-day-of-week="1"
        minimal
        flat
        :event-color = 'setEventColor'
      />
      <div class="">
        <p class="q-mb-sm">
          <svg width="8" height="8" class="q-mr-sm" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="4" cy="4" r="3.5" stroke="#FFB61C"/>
          </svg>
          {{$t('today')}}
        </p>
        <p class="q-mb-sm">
          <svg width="8" height="8" class="q-mr-sm" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="4" cy="4" r="4" fill="#C1C1C1"/>
          </svg>

          {{$t('over_lesson')}}
        </p>
        <p class="q-mb-sm">
        <svg width="8" height="8" class="q-mr-sm" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="4" cy="4" r="4" fill="#39CE3F"/>
        </svg>

        {{$t('coming_lesson')}}
      </p>
        <p class="q-mb-none">
          <svg width="8" height="8" class="q-mr-sm" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="4" cy="4" r="4" fill="#09B5EC"/>
          </svg>

          {{$t('replaced_lesson')}}
        </p>
      </div>
    </div>
    <div class="rounded-block">
      <p class="text-caption text-bold">{{$t('call_friends')}}</p>
      <p class="text-caption text-weight-thin">{{$t('share_promo')}}</p>
      <p class="q-mb-none text-negative text-bold text-h6">{{$auth.user.promo.code}}</p>
    </div>
  </div>
  </q-no-ssr>



</template>

<script>


import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      menuActive:false,
      currentTime:'',
      displayTime:'',
      timeLeft:'',
      timerID:null,
      timeFormat:this.$auth.user.is_time_24h,
      timeSettingsOpen:false,
      is_loading:false,
      localeRu:{
       days: 'Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота'.split('_'),
        daysShort: 'Вс_Пн_Вт_Ср_Чт_Пт_Сб'.split('_'),
        months: 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split('_'),
        monthsShort: 'Янв_Фев_Мар_Апр_Май_Июн_Июл_Авг_Сен_Окт_Ноя_Дек'.split('_'),

      },
      localeEn:{
        days: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        daysShort: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Augu_Sep_Oct_Nov_Dec'.split('_'),

      },
      calendar:[],



    }
  },
  mounted() {
    this.startTimer()

  },
  methods: {
    ...mapActions('auth',['getUser']),
    setEventColor(val){
      let date = val.replaceAll('/','-')
      if (this.current_group){
        let lesson = this.current_group.lessons.find(x=>x.date === date)
        if (lesson.is_over){
          return 'grey-5'
        }
        // new Date() < new Date(lesson.date)
        if (lesson.is_has_new_datetime  ) {
          return 'primary'
        }
        return 'positive'
      }
    },
    startTimer(){
      this.currentTime = new Date().toLocaleTimeString()
      this.timerID = setInterval(function(){
        this.currentTime = new Date().toLocaleTimeString()
      }.bind(this), 1000);
    },
    async updateUserTimeFormat(){
      this.is_loading = !this.is_loading
      await this.$api.post('/api/user/set_time_format',{format:this.timeFormat})
      await this.getUser()
      this.is_loading = !this.is_loading
    }
  },
  beforeUnmount() {
    clearInterval(this.timerID)
  },
  watch:{
    async timeFormat(val){
      await this.updateUserTimeFormat()
    },
    currentTime(val){
      if(this.timeFormat){
        console.log('24',val)
        if(this.student_upcoming_lessons.length>0){
          this.displayTime = `${val.split(':')[0]}:${val.split(':')[1]}`
        }
      }else {
        let time  =  val.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [val];
        //console.log('am',time)
        if (time.length > 1) { // If time format correct
          time.splice(4,1)
          time.splice(5,1)
          time = time.slice (1);  // Remove full string match value
          time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
          time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        this.displayTime = time.join (''); // return adjusted time or original string
      }
    }
  },
  computed:{
    ...mapGetters('data',['current_group','student_upcoming_lessons','current_group_lesson_dates','user_groups']),

  }

}
</script>
<style lang="sass">
//.right-sidebar
//  display: grid
//  grid-template-columns: 1fr
//  grid-gap: 30px
.timeblock
  height: fit-content

.time
  font-weight: 900
  font-size: 46px
  color: $primary
  &.pm
    font-size: 26px
.calendar
  background: none
</style>
