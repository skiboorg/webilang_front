<template>
  <q-header elevated class="lt-md bg-grey-1 ">
    <q-toolbar>
      <img @click="$router.push($auth.user.is_teacher ?{name:'teacher-groups'} : {name:'student-index'})" src="~assets/logo.svg">
      <q-space/>
      <q-btn dense flat round icon="widgets" class="q-mr-md" text-color="grey-9" @click="studentMenu=!studentMenu"  />
      <q-btn dense flat round icon="menu" text-color="grey-9"  @click="studentWidgets=!studentWidgets"/>
    </q-toolbar>
  </q-header>
  <q-drawer v-model="studentMenu"   bordered>
    <LeftSideBar/>
  </q-drawer>
  <q-drawer v-model="studentWidgets"  side="right" bordered class="q-pa-sm">
    <RightSideBar />
  </q-drawer>
</template>

<script>


import LeftSideBar from "components/Student/LeftSideBar";
import RightSideBar from "components/Student/RightSideBar";

export default {
  components:{
    LeftSideBar,
    RightSideBar
  },
  data() {
    return {
      studentMenu: false,
      studentWidgets: false
    }
  },
  methods: {

  }

}
</script>
<style lang="sass">

</style>
