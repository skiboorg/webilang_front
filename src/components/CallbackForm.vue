<template>
  <q-form  @submit.prevent="callbackSubmit">
                <q-input
                  outlined
                  v-model="cbData.name"
                  bg-color="white"
                  class="q-mb-md"
                  :label="$t('your_name')" />
                <q-input
                  outlined
                  v-model="cbData.phone"
                  bg-color="white"
                   class="q-mb-md"
                  :label="$t('your_phone')" />
                <q-btn  class="full-width text-manrope border-r-8 q-py-md " :class="[$q.screen.lt.sm ? 'full-width' : 'q-px-xl']"
                       :loading="is_loading" no-caps color="primary" type="submit" :label="$t('free_lesson')"/>
            </q-form>
</template>
<script>
export default {
  data(){
    return{
      is_loading:false,
      cbData:{
        name:null,
        phone:null
      }
    }
  },
  methods:{
    async callbackSubmit() {
      this.is_loading = !this.is_loading
      await this.$api.post('/api/data/callback',{
        name:this.cbData.name,
        phone:this.cbData.phone,
      })
      this.cbData.name = null
      this.cbData.phone = null
      this.is_loading = !this.is_loading
    }
  }

}
</script>
<style lang="sass" scoped>
.q-form
  max-width: 370px
</style>
