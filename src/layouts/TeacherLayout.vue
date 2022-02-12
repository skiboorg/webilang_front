<template>
  <q-layout view="hHh lpR fFf">
    <q-no-ssr>
    <Header/>
    <div class="teacher-wrapper">
      <LeftSideBar class="gt-sm"/>
      <div class="teacher-inner">
        <TopBar/>
        <q-page-container>
          <router-view />
        </q-page-container>
      </div>
    </div>
    </q-no-ssr>
  </q-layout>
</template>
<script>

import Header from "components/Teacher/Header";
import LeftSideBar from "components/Teacher/LeftSideBar";
import TopBar from "components/Student/TopBar";

export default {
  components:{
    Header,
    LeftSideBar,
    TopBar
  },
  async preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {

    if (!store.state.auth.loggedIn && !store.state.auth.user.is_teacher) {
      redirect({ path: '/signin' })
    }

     await store.dispatch('data/getTeacherGroups')
      await  store.dispatch('data/getNotifications')
      await  store.dispatch('data/getRewards')
    return

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
.teacher
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
  .teacher
    &-wrapper
      grid-template-columns: 1fr 4fr

@media (max-width: 1024px)
  .teacher
    &-wrapper
      grid-template-columns: 1fr
    &-inner
      padding: 0 10px
      margin-top: 65px



</style>
