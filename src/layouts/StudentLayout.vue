<template>
  <q-layout view="hHh lpR fFf">
    <q-no-ssr>


      <Header />
    <div class="student-wrapper">
      <LeftSideBar class="gt-sm"/>
      <div class="student-inner">
        <TopBar/>
        <div :class="{'student-content' : $route.name !== 'student-payment'}">
          <q-page-container>
            <router-view />
          </q-page-container>
          <RightSideBar v-if="$route.name !== 'student-payment'" class="gt-sm"/>
        </div>
      </div>
    </div>
    </q-no-ssr>
  </q-layout>
</template>

<script>

import Header from "components/Student/Header";
import LeftSideBar from "components/Student/LeftSideBar";
import RightSideBar from "components/Student/RightSideBar";
import TopBar from "components/Student/TopBar";

export default {
  components:{
    Header,
    LeftSideBar,
    RightSideBar,
    TopBar
  },
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {

    if (!store.state.auth.loggedIn ) {
      redirect({ path: '/signin' })
    }
    // if (!store.state.auth.user.personal_lessons_left > 0 || !store.state.auth.user.group_lessons_left > 0) {
    //     redirect({ path: '/student/payment' })
    //    }
    return (
      store.dispatch('data/getUserGroups'),
        store.dispatch('data/getNotifications'),
        store.dispatch('data/updateUserGroups')
    )
  },
  data(){
    return{
      leftMenuOpen:true,
      rightMenuOpen:false,
    }
  },


}
</script>
<style lang="sass" scoped>
.student
  &-wrapper
    display: grid
    grid-template-columns: 1fr 6fr
    grid-gap: 30px
  &-inner
    display: grid
    grid-template-columns: 1fr
    grid-template-rows: min-content
    margin-top: 30px
    grid-gap: 30px
    padding-right: 30px
  &-content
    display: grid
    grid-template-columns: 4fr 1fr
    grid-gap: 30px

@media (max-width: 1580px)
  .student
    &-wrapper
      grid-template-columns: 1fr 5fr

@media (max-width: 1366px)
  .student
    &-wrapper
      grid-template-columns: 1fr 4fr
    &-content
      grid-template-columns: 65% 32%

@media (max-width: 1024px)
  .student
    &-wrapper
      grid-template-columns: 1fr
    &-content
      grid-template-columns: 1fr
    &-inner
      padding: 0 10px
      margin-top: 65px

</style>
