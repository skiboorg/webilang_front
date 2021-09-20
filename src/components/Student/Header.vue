<template>
 <q-header elevated class="lt-md bg-grey-1 ">
      <q-toolbar>


             <img src="~assets/logo.svg">
<q-space/>


 <q-btn dense flat round icon="widgets" text-color="grey-9" @click="studentWidgets=!studentWidgets" />
 <q-btn dense flat round icon="menu" text-color="grey-9" @click="studentMenu=!studentMenu" />
      </q-toolbar>
    </q-header>
<!--  side="right"-->
   <q-drawer v-model="studentMenu"   bordered>
     <LeftSideBar/>
    </q-drawer>
</template>

<script>


import LeftSideBar from "components/Student/LeftSideBar";

export default {
  components:{
    LeftSideBar,
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
