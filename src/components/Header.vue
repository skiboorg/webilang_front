<template>
  <q-header reveal :elevated="$q.screen.lt.md" :reveal-offset="50" class="bg-grey-1 text-white " height-hint="98">

    <q-toolbar class="header-top text-dark">
      <q-toolbar-title>
        <router-link to="/">
          <img src="~assets/logo.svg">
        </router-link>

      </q-toolbar-title>

      <div class="flex items-center justify-between gt-sm">
        <div class="q-mr-lg">
<!--          <p class="q-mb-sm flex items-center">-->
<!--            <svg class="q-mr-sm" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--              <path fill-rule="evenodd" clip-rule="evenodd" d="M1.99033 3.87254C2.30665 3.34878 4.0495 1.44376 5.29322 1.50127C5.665 1.53208 5.99364 1.75699 6.26067 2.01784C6.87379 2.61656 8.62897 4.88101 8.72859 5.35753C8.97096 6.52621 7.57833 7.1999 8.00454 8.37783C9.09112 11.0366 10.9634 12.9088 13.6233 13.9943C14.8003 14.4205 15.474 13.0279 16.6428 13.2713C17.1183 13.3709 19.3839 15.126 19.9826 15.7391C20.2425 16.0051 20.4684 16.3347 20.4992 16.7065C20.5454 18.0159 18.5222 19.7833 18.1278 20.0092C17.1974 20.6747 15.9834 20.6634 14.5035 19.9753C10.3739 18.2572 3.77426 11.7822 2.02422 7.49669C1.35461 6.02505 1.30839 4.80297 1.99033 3.87254Z" stroke="#545454" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--            </svg>-->
<!--            <a class="text-weight-bold" href="tel:+79853045253">+7 (985) 304 - 52 - 53</a>-->
<!--          </p>-->
          <p class="no-margin flex items-center">
            <svg class="q-mr-sm" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9589 4.00809C17.8539 1.90063 15.0545 0.739517 12.0721 0.738281C5.92662 0.738281 0.925095 5.73967 0.922623 11.8868C0.921799 13.8518 1.43513 15.77 2.41086 17.4608L0.829102 23.2383L6.73961 21.6878C8.36819 22.5762 10.2017 23.0444 12.0676 23.0449H12.0722C18.217 23.0449 23.2191 18.0431 23.2214 11.8957C23.2227 8.9165 22.064 6.1154 19.9589 4.00809ZM12.0721 21.162H12.0683C10.4055 21.1613 8.77469 20.7144 7.35168 19.8703L7.01344 19.6694L3.50606 20.5895L4.44223 17.1698L4.22182 16.8192C3.29416 15.3438 2.80431 13.6384 2.80513 11.8875C2.80705 6.77815 6.96428 2.62134 12.0758 2.62134C14.551 2.62216 16.8778 3.58731 18.6274 5.33894C20.3769 7.09057 21.3399 9.41885 21.3391 11.895C21.3369 17.0048 17.1799 21.162 12.0721 21.162ZM17.1552 14.2215C16.8767 14.082 15.507 13.4083 15.2515 13.3152C14.9964 13.2222 14.8104 13.1759 14.6249 13.4547C14.4391 13.7335 13.9053 14.3611 13.7427 14.5469C13.5801 14.7328 13.4178 14.7561 13.1391 14.6166C12.8605 14.4772 11.9629 14.1829 10.8988 13.2339C10.0707 12.4952 9.51159 11.5829 9.349 11.3041C9.18667 11.0251 9.34762 10.8888 9.47122 10.7356C9.77279 10.3611 10.0748 9.96844 10.1676 9.78264C10.2606 9.59669 10.214 9.43396 10.1443 9.29457C10.0748 9.15518 9.51764 7.78395 9.28555 7.22598C9.05923 6.68298 8.82976 6.75632 8.65864 6.7478C8.49632 6.7397 8.31051 6.73805 8.12471 6.73805C7.93904 6.73805 7.63719 6.80768 7.38176 7.08673C7.12646 7.36564 6.40686 8.03952 6.40686 9.41075C6.40686 10.782 7.4051 12.1067 7.54436 12.2926C7.68361 12.4785 9.50885 15.2924 12.3034 16.499C12.968 16.7863 13.4869 16.9575 13.8916 17.0859C14.559 17.298 15.1661 17.268 15.6462 17.1963C16.1815 17.1163 17.2943 16.5223 17.5267 15.8717C17.7588 15.2209 17.7588 14.6632 17.689 14.5469C17.6195 14.4307 17.4337 14.3611 17.1552 14.2215Z" fill="#545454"/>
            </svg>
            <a class="text-weight-bold" target="_blank" href="https://wa.me/79609980136">+7 (960) 998 - 01 - 36</a>
          </p>
        </div>



        <CallbackModal :label="$t('open_callback_form')" color="warning" :nocaps="true" :outline="true" extra_class="q-py-sm q-mr-md"/>
        <q-btn :to="$auth.loggedIn ?
                      $auth.user.is_teacher ? {name:'teacher-groups'} : {name:'student-index'} :
                      {name:'front-signin'}"
               icon="person_outline"  color="primary" class="text-manrope border-r-8 q-py-sm" no-caps :label="$t('open_profile')"/>
      </div>
      <q-btn dense flat round color="primary"
             class="lt-md"
             :icon="rightDrawerOpen ? 'close' : 'menu'"
             @click="rightDrawerOpen=!rightDrawerOpen" />
    </q-toolbar>
    <div class="header-bottom gt-sm">
      <div class="header-bottom__inner flex items-center justify-between">
        <q-tabs :ripple="false" align="left" class="text-dark " indicator-color="transparent">
          <q-route-tab exact :ripple="false" :to="{name:'front-index'}" :label="$t('home_link')" />
          <q-route-tab exact :ripple="false" :to="{name:'front-tariff'}" :label="$t('tarif_link')" />
          <q-route-tab exact :ripple="false" :to="{name:'front-education'}" :label="$t('edu_progress_link')" />
          <q-route-tab exact :ripple="false" :to="{name:'front-teachers'}" :label="$t('teachers_link')" />
          <q-route-tab exact :ripple="false" :to="{name:'front-about'}" :label="$t('about_link')" />
          <q-route-tab exact :ripple="false" :to="{name:'front-contacts'}" :label="$t('contact_link')" />
        </q-tabs>
        <q-select
          v-model="locale"
          :options="localeOptions"
          dense
          rounded
          outlined
          bg-color="white"
          emit-value
          map-options
          options-dense

        />
      </div>

    </div>
    <div class="header-mobile-bottom lt-md">
      <q-btn dense icon="sort" color="dark" round flat/>
      <q-btn dense icon="widgets" color="dark" round flat/>
    </div>

  </q-header>
  <q-drawer v-model="rightDrawerOpen" side="right" overlay behavior="desktop" bordered>
     <div class="q-px-md q-mt-lg">
 <q-btn :to="$auth.loggedIn ?
                      $auth.user.is_teacher ? {name:'teacher-groups'} : {name:'student-index'} :
                      {name:'front-signin'}"
             icon="person_outline"  color="primary"
             class="text-manrope border-r-8 q-py-sm full-width q-mb-md" no-caps :label="$t('open_profile')"/>
      <CallbackModal :label="$t('open_callback_form')" color="warning" :nocaps="true" :outline="true" extra_class="q-py-sm  full-width"/>


    </div>
    <q-list class="q-mb-lg">
      <q-item clickable v-ripple exact active-class="text-warning" class="text-fs-18 text-bold" :to="{name:'front-index'}">
        <q-item-section>{{$t('home_link')}}</q-item-section>
      </q-item>
      <q-item clickable v-ripple exact active-class="text-warning" class="text-fs-18 text-bold" :to="{name:'front-tariff'}">
        <q-item-section>{{$t('tarif_link')}}</q-item-section>
      </q-item>
      <q-item clickable v-ripple exact active-class="text-warning" class="text-fs-18 text-bold" :to="{name:'front-education'}">
        <q-item-section>{{$t('edu_progress_link')}}</q-item-section>
      </q-item>
      <q-item clickable v-ripple exact active-class="text-warning" class="text-fs-18 text-bold" :to="{name:'front-teachers'}">
        <q-item-section>{{$t('teachers_link')}}</q-item-section>
      </q-item>
      <q-item clickable v-ripple exact active-class="text-warning" class="text-fs-18 text-bold" :to="{name:'front-about'}">
        <q-item-section>{{$t('about_link')}}</q-item-section>
      </q-item>
      <q-item clickable v-ripple exact active-class="text-warning" class="text-fs-18 text-bold" :to="{name:'front-contacts'}">
        <q-item-section>{{$t('contact_link')}}</q-item-section>
      </q-item>
    </q-list>
    <div class="q-px-md q-mb-lg">
      <p class="q-mb-md flex items-center">
        <svg class="q-mr-sm" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1.99033 3.87254C2.30665 3.34878 4.0495 1.44376 5.29322 1.50127C5.665 1.53208 5.99364 1.75699 6.26067 2.01784C6.87379 2.61656 8.62897 4.88101 8.72859 5.35753C8.97096 6.52621 7.57833 7.1999 8.00454 8.37783C9.09112 11.0366 10.9634 12.9088 13.6233 13.9943C14.8003 14.4205 15.474 13.0279 16.6428 13.2713C17.1183 13.3709 19.3839 15.126 19.9826 15.7391C20.2425 16.0051 20.4684 16.3347 20.4992 16.7065C20.5454 18.0159 18.5222 19.7833 18.1278 20.0092C17.1974 20.6747 15.9834 20.6634 14.5035 19.9753C10.3739 18.2572 3.77426 11.7822 2.02422 7.49669C1.35461 6.02505 1.30839 4.80297 1.99033 3.87254Z" stroke="#545454" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <a class="text-weight-bold" href="tel:+79853045253">+7 (985) 304 - 52 - 53</a>
      </p>
      <p class="no-margin flex items-center">
        <svg class="q-mr-sm" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9589 4.00809C17.8539 1.90063 15.0545 0.739517 12.0721 0.738281C5.92662 0.738281 0.925095 5.73967 0.922623 11.8868C0.921799 13.8518 1.43513 15.77 2.41086 17.4608L0.829102 23.2383L6.73961 21.6878C8.36819 22.5762 10.2017 23.0444 12.0676 23.0449H12.0722C18.217 23.0449 23.2191 18.0431 23.2214 11.8957C23.2227 8.9165 22.064 6.1154 19.9589 4.00809ZM12.0721 21.162H12.0683C10.4055 21.1613 8.77469 20.7144 7.35168 19.8703L7.01344 19.6694L3.50606 20.5895L4.44223 17.1698L4.22182 16.8192C3.29416 15.3438 2.80431 13.6384 2.80513 11.8875C2.80705 6.77815 6.96428 2.62134 12.0758 2.62134C14.551 2.62216 16.8778 3.58731 18.6274 5.33894C20.3769 7.09057 21.3399 9.41885 21.3391 11.895C21.3369 17.0048 17.1799 21.162 12.0721 21.162ZM17.1552 14.2215C16.8767 14.082 15.507 13.4083 15.2515 13.3152C14.9964 13.2222 14.8104 13.1759 14.6249 13.4547C14.4391 13.7335 13.9053 14.3611 13.7427 14.5469C13.5801 14.7328 13.4178 14.7561 13.1391 14.6166C12.8605 14.4772 11.9629 14.1829 10.8988 13.2339C10.0707 12.4952 9.51159 11.5829 9.349 11.3041C9.18667 11.0251 9.34762 10.8888 9.47122 10.7356C9.77279 10.3611 10.0748 9.96844 10.1676 9.78264C10.2606 9.59669 10.214 9.43396 10.1443 9.29457C10.0748 9.15518 9.51764 7.78395 9.28555 7.22598C9.05923 6.68298 8.82976 6.75632 8.65864 6.7478C8.49632 6.7397 8.31051 6.73805 8.12471 6.73805C7.93904 6.73805 7.63719 6.80768 7.38176 7.08673C7.12646 7.36564 6.40686 8.03952 6.40686 9.41075C6.40686 10.782 7.4051 12.1067 7.54436 12.2926C7.68361 12.4785 9.50885 15.2924 12.3034 16.499C12.968 16.7863 13.4869 16.9575 13.8916 17.0859C14.559 17.298 15.1661 17.268 15.6462 17.1963C16.1815 17.1163 17.2943 16.5223 17.5267 15.8717C17.7588 15.2209 17.7588 14.6632 17.689 14.5469C17.6195 14.4307 17.4337 14.3611 17.1552 14.2215Z" fill="#545454"/>
        </svg>
        <a class="text-weight-bold" href="#">+7 (960) 998 - 01 - 36</a>
      </p>
    </div>
    <div class="q-px-md q-mb-lg ">
      <q-select
        v-model="locale"
        :options="localeOptions"
        dense
        borderless

        bg-color="white"
        emit-value
        map-options
        options-dense

      />
    </div>


  </q-drawer>
</template>

<script>


import CallbackModal from "components/CallbackModal";
import { Cookies } from 'quasar'
export default {
  components:{

    CallbackModal
  },
  data(){
    return{
      locale : this.$cookies.get('lang'),
      localeOptions: [
        { value: 'en-US', label: '🇬🇧 English' },
        { value: 'ru', label: '🇷🇺 Русский' }
      ],
      rightDrawerOpen:false,
      menu_links:[
        {title:this.$t('home_link'),url:'front-index'},
        {title:this.$t('tarif_link'),url:'front-tariff'},
        {title:this.$t('edu_progress_link'),url:'front-education'},
        {title:this.$t('teachers_link'),url:'front-teachers'},
        {title:this.$t('about_link'),url:'front-about'},
        {title:this.$t('contact_link'),url:'front-contacts'},
      ]
    }
  },
  beforeMount() {
    this.locale = this.$cookies.get('lang')
    console.log(Cookies.get('lang'))
  },
  watch:{
    locale(val){
      console.log(this.$i18n.locale)
      this.$i18n.locale = val

      Cookies.set('lang',val)
      console.log(this.$i18n.locale)
    }
  }


}
</script>
<style lang="sass">
.header-top
  max-width: 1170px
  margin: 0 auto
  padding: 25px 10px
.header-bottom
  background: $info
  &__inner
    max-width: 1170px
    margin: 0 auto
    padding: 0 15px
  & .q-tab
    padding: 10px 0
    margin-right: 40px
    &__label
      font-weight: 700
      color: $dark
      text-transform: none
    &.q-hoverable:hover > .q-focus-helper
      background: #beefff !important
      opacity: 0
.header-mobile-bottom
  display: none
  //display: flex
  align-items: center
  justify-content: space-between
  padding: 0 10px 5px 10px
@media (min-width: 1440px)
  .header-bottom .q-tab__content
    min-width: unset
@media (max-width: 768px)
  .header-top
    padding-top: 15px
    padding-bottom: 10px
</style>
