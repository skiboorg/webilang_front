<template>
  <q-no-ssr>
    <div v-if="user_groups" class="right-sidebar">
    <div class="rounded-block timeblock q-mb-md">
      <div class="flex items-center justify-between">
        <q-no-ssr>
          <p :class="{pm:!timeFormat}" class="time no-margin">{{displayTime}}</p>
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
      <p class="no-margin" >{{$t('time_left')}} {{timeLeft}}</p>

    </div>
    <div class="rounded-block q-mb-md">
      <q-date
        v-model="calendar"
        class="calendar "
        :events="current_group_lesson_dates"
        :locale="$i18n.locale === 'ru' ? localeRu : localeEn"
        color="positive"
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
      <p class="q-mb-none text-negative text-bold text-h6">{{$auth.user.promo}}</p>
    </div>
  </div>
  </q-no-ssr>



</template>

<script>


import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      currentTime:'',
      displayTime:'',
      timeLeft:'',
      timerID:null,
      timeFormat:this.$auth.user.is_time_24h,
      timeSettingsOpen:false,
      is_loading:false,
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
        if (lesson.is_has_new_datetime){
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
        //console.log('24',val)
        if(this.student_upcoming_lessons.length>0){
          this.displayTime = this.$filters.normalizeTime(val)
          let h_cur = parseInt(val.split(':')[0])
          let m_cur = parseInt(val.split(':')[1])
          let h_lesson = parseInt(this.student_upcoming_lessons[0].time.split(':')[0])
          let m_lesson = parseInt(this.student_upcoming_lessons[0].time.split(':')[1])
          let h_left = (h_lesson-h_cur) - 1
          let m_left = (m_lesson-m_cur) + 60
          this.timeLeft = h_left >=10 ? h_left + ' : ' + m_left : '0'+h_left + ' : ' + m_left
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
