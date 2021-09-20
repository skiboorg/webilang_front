<template>
  <q-layout view="hHh lpR fFf">


<Header/>
    <q-page-container>
      <router-view />
    </q-page-container>
 <Footer/>
  </q-layout>

</template>

<script>

import Header from "components/Header";
import Footer from "components/Footer";
export default {
  components:{
    Header,
    Footer
  },

}
</script>
