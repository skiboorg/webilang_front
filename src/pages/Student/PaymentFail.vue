<template>
  <div ref="page-wrapper" class="page-wrapper">
    <div style="margin-top: 0" class="tariffs-wrapper">
      <p>ВЫ не успешно оплатили</p>
    </div>
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
  computed:{
    ...mapGetters('data',['tariffs'])
  }
}
</script>
<style lang="sass" scoped>


</style>
