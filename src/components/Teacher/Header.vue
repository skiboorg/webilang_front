<template>
  <q-header class="lt-md bg-grey-1 shadow-3">
    <q-toolbar>
      <img @click="$router.push({name:'teacher-groups'})" src="~assets/logo.svg">
      <q-space/>
      <q-btn dense flat round icon="menu" text-color="grey-9" @click="teacherMenu=!teacherMenu" />
    </q-toolbar>
  </q-header>
  <q-drawer v-model="teacherMenu" side="right" behavior="default" bordered>
   <LeftSideBar/>
  </q-drawer>
</template>
<script>

import LeftSideBar from "components/Teacher/LeftSideBar";

export default {
  components:{
    LeftSideBar,
  },
  data() {
    return {
      teacherMenu: false
    }
  },
  methods: {

  }

}
</script>
<style lang="sass">

</style>
