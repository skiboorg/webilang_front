<template>


  <q-layout view="hHh lpR fFf">


<Header class="lt-md"/>
    <div class="teacher-wrapper">
       <LeftSideBar class="gt-sm"/>

      <div class="teacher-inner">
        <TopBar/>

                 <q-page-container>
      <router-view />
    </q-page-container>



      </div>
    </div>



  </q-layout>

</template>

<script>

import Header from "components/Student/Header";
import LeftSideBar from "components/Teacher/LeftSideBar";
import TopBar from "components/Student/TopBar";

export default {
  components:{
    Header,
    LeftSideBar,
    TopBar
  },
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {

    if (!store.state.auth.loggedIn && !store.state.auth.user.is_teacher) {
        redirect({ path: '/signin' })
       }
    return (
      store.dispatch('data/getTeacherGroups'),
      store.dispatch('data/getNotifications'),
      store.dispatch('data/getRewards')
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
  .student
    &-wrapper
      grid-template-columns: 1fr 5fr

@media (max-width: 1366px)
  .student
    &-wrapper
      grid-template-columns: 1fr 4fr
    &-content
      grid-template-columns: 3fr 1fr


</style>
