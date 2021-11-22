<template>
  <div ref="page-wrapper" class="page-wrapper">
  ccc
  </div>

</template>

<script>

import {mapActions, mapGetters} from 'vuex'
export default {
  data() {
    return {
      notifications:[],
      selectMode:false,



    }
  },
  async mounted() {

  },
  methods: {
    ...mapActions('data',['getNotifications']),


  },

}
</script>
<style lang="sass" scoped>


</style>
