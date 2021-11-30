<template>
  <div ref="page-wrapper" class="page-wrapper">
    <div style="margin-top: 0" class="tariffs-wrapper">
          <div class="tariff-item" v-for="category in tariffs" :key="category.id">
            <p class="text-fs-24 text-weight-bolder q-mb-lg">{{$i18n.locale === 'ru' ? category.name : category.name_en}}</p>
            <div class="tariff-item-block">
              <p class="text-fs-20 text-weight-bold q-mb-lg">{{$t('tariff_mini_group')}}</p>
<!--             bordered-->
              <div class="tariff-item-block__item with-dot dot-blue flex items-center justify-between "
                   v-for="tariff in category.tariffs.filter(x=>!x.is_personal)"
                   :key="tariff.id">
                <div class="">
                  <p class="text-weight-bold no-margin">
                    {{$i18n.locale === 'ru' ? tariff.name : tariff.name_en}}
                    <b v-if="tariff.discount>0" class="text-positive">({{$t('tariff_discount')}} {{tariff.discount}} %)</b>
                    <span class="block text-weight-regular text-caption">{{$i18n.locale === 'ru' ? tariff.info : tariff.info_en}}</span>
                  </p>
                </div>
                <div class="tariff-item-block__item-price">
                   <q-btn class="border-r-8"
                          :to="{name:'student-checkout',params:{cat_id:category.id,t_id:tariff.id}}"
                          unelevated
                          color="positive"
                          :label="$i18n.locale === 'ru' ? tariff.price_rub +' ₽' : tariff.price_usd +' $'"/>
                </div>
              </div>
            </div>
             <div class="tariff-item-block">
              <p class="text-fs-20 text-weight-bold q-mb-lg">{{$t('tariff_individual')}}</p>
                <div class="tariff-item-block__item with-dot dot-blue flex items-center justify-between "
                   v-for="tariff in category.tariffs.filter(x=>x.is_personal)"
                   :key="tariff.id">
                <div class="">
                  <p class="text-weight-bold no-margin">
                    {{$i18n.locale === 'ru' ? tariff.name : tariff.name_en}}
                    <b v-if="tariff.discount>0" class="text-positive">({{$t('tariff_discount')}} {{tariff.discount}} %)</b>
                    <span class="block text-weight-regular text-caption">{{$i18n.locale === 'ru' ? tariff.info : tariff.info_en}}</span>
                  </p>
                </div>
                <div class="tariff-item-block__item-price">
                  <q-btn class="border-r-8"
                         :to="{name:'student-checkout',params:{cat_id:category.id,t_id:tariff.id}}"
                         unelevated
                         color="positive"
                         :label="$i18n.locale === 'ru' ? tariff.price_rub +' ₽' : tariff.price_usd +' $'"/>
                </div>
              </div>
            </div>
          </div>
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
