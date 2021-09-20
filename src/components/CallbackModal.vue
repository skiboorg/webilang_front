<template>
  <q-no-ssr>
     <q-btn style="z-index: 1" :color="color"  @click="modalActive=true" class="text-manrope border-r-8" :no-caps="nocaps" :class="extra_class" :outline="outline"  :label="label"/>


 <q-dialog
      v-model="modalActive"
    >
      <q-card class="callback-modal">
        <q-card-section class="absolute-top-right z-max row items-center q-pb-none">

          <q-space />
          <q-btn icon="close" size="lg" color="positive" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="callback-modal__inner">
          <p class="callback-modal__title text-primary" v-html="$t('callback_modal_form')"></p>
          <q-form  @submit.prevent="callbackSubmit">
                <q-input
                  outlined
                  v-model="cbData.name"
                  bg-color="white"
                  class="q-mb-md"
                  :label="$t('your_firstname')" />
                <q-input
                  outlined
                  v-model="cbData.phone"
                  bg-color="white"
                   class="q-mb-md"
                  :label="$t('your_phone')" />
            <q-select class="q-mb-lg" outlined v-model="cbData.cource" :options="options" :label="$t('choose_cource')" />
            <div class="text-center">
              <q-btn class=" text-manrope border-r-8 q-py-md q-px-xl"
                       :loading="is_loading" no-caps color="positive" type="submit" :label="$t('open_callback_form')"/>
            </div>

            </q-form>
       </q-card-section>
      </q-card>
    </q-dialog>
  </q-no-ssr>
</template>
<script>
export default {
  props:['label','color','outline','extra_class','nocaps'],
  data(){
    return{
      modalActive:false,
      is_loading:false,
      options: [
        this.$t('kids_title'), this.$t('adult_title'), this.$t('exams_title')
      ],
      cbData:{
        name:null,
        phone:null,
        cource:this.$t('kids_title')
      }
    }
  },
  methods:{
    async callbackSubmit() {
      this.is_loading = !this.is_loading
      await this.$api.post('/api/data/callback',{
        name:this.cbData.name,
        phone:this.cbData.phone,
        course:this.cbData.cource
      })
      this.cbData.name = null
      this.cbData.phone = null
      this.cbData.cource = this.$t('kids_title')
      this.modalActive = false
      this.is_loading = !this.is_loading
    }
  }

}
</script>
<style lang="sass" scoped>
.callback-modal
  position: relative
  width: 630px
  max-width: 90vw
  z-index: 1
  overflow: hidden
  &__inner
    padding: 100px
  &__title
    font-size: 54px
    line-height: 65px
    text-align: center
    font-weight: 900
    text-transform: uppercase
  &::before
    position: absolute
    content: url(~assets/callbackModal-top.png)
    top: 0
    left: 0
    z-index: -1
  &::after
    position: absolute
    content: url(~assets/callbackModal-bottom.png)
    right: 0
    bottom: -6px
    z-index: -1

@media (max-width: 768px)
  .callback-modal
    &__inner
      padding: 80px 30px
    &__title
      font-size: 45px
      line-height: 54px
    &::after
      bottom: -80px
      right: -120px
</style>
