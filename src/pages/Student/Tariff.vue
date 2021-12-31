<template>
  <div ref="page-wrapper" class="page-wrapper">
    <div style="margin-top: 0" class="tariffs-wrapper gt-sm">
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
              <p class="no-margin text-warning text-lh-120 text-right tariff-price">{{tariff.price_rub +' ₽'}}<br>
                <span class="text-grey-7">{{ tariff.price_usd +' $'}}</span></p>
              <q-btn style="line-height: 200%" class=" text-bold tariff-price-btn"
                     :to="{name:'student-checkout',params:{cat_id:category.id,t_id:tariff.id}}"
                     unelevated
                     color="positive"
                     rounded
                     no-caps
                     text-color="white"
                     label="Выбрать"/>
              <!--                          :label="$i18n.locale === 'ru' ? tariff.price_rub +' ₽' : tariff.price_usd +' $'"/>-->
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
              <p class="no-margin text-warning text-lh-120 text-right tariff-price">{{tariff.price_rub +' ₽'}}<br>
                <span class="text-grey-7">{{ tariff.price_usd +' $'}}</span></p>
              <q-btn style="line-height: 200%" class=" text-bold tariff-price-btn"
                     :to="{name:'student-checkout',params:{cat_id:category.id,t_id:tariff.id}}"
                     unelevated
                     color="positive"
                     rounded
                     no-caps
                     text-color="white"
                     label="Выбрать"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top: 0" class="lt-md tariffs-wrapper">
      <div class="tariff-item" v-for="category in tariffs" :key="category.id">
        <p class="text-fs-24 text-weight-bolder q-mb-md">{{$i18n.locale === 'ru' ? category.name : category.name_en}}</p>
        <div class="tariff-item-block q-mb-md">
          <p class="text-fs-20 text-weight-bold q-mb-lg">{{$t('tariff_mini_group')}}</p>
          <!--             bordered-->

          <carousel :items-to-show="1.25" >

            <slide class="" :class="[$q.screen.lt.sm ? 'q-px-sm' : 'q-px-md']" v-for="tariff in category.tariffs.filter(x=>!x.is_personal)"
                   :key="tariff.id">
              <div class="tariff-mobile-item">
                <p class="text-weight-bold  text-left">
                    {{$i18n.locale === 'ru' ? tariff.name : tariff.name_en}}
                    <b v-if="tariff.discount>0" class="text-positive">({{$t('tariff_discount')}} {{tariff.discount}} %)</b>
                    <span class="block text-weight-regular text-caption">{{$i18n.locale === 'ru' ? tariff.info : tariff.info_en}}</span>
                  </p>
                <q-separator color="grey-2 q-mb-md"/>
                <div class="flex items-center justify-between">

                    <q-btn style="line-height: 200%" class=" text-bold "
                     :to="{name:'student-checkout',params:{cat_id:category.id,t_id:tariff.id}}"
                     unelevated
                     color="positive"
                     rounded
                     no-caps
                     text-color="white"
                     label="Выбрать"/>


                     <p class="no-margin text-bold text-warning text-lh-120 text-right tariff-price">{{tariff.price_rub +' ₽'}}<br>
                <span class="text-grey-7">{{ tariff.price_usd +' $'}}</span></p>

                </div>
              </div>


            </slide>
          </carousel>

        </div>

        <div class="tariff-item-block">
          <p class="text-fs-20 text-weight-bold q-mb-md">{{$t('tariff_individual')}}</p>
           <carousel :items-to-show="1.25" >

            <slide class="" :class="[$q.screen.lt.sm ? 'q-px-sm' : 'q-px-md']" v-for="tariff in category.tariffs.filter(x=>x.is_personal)"
                   :key="tariff.id">
              <div class="tariff-mobile-item">
                <p class="text-weight-bold  text-left">
                    {{$i18n.locale === 'ru' ? tariff.name : tariff.name_en}}
                    <b v-if="tariff.discount>0" class="text-positive">({{$t('tariff_discount')}} {{tariff.discount}} %)</b>
                    <span class="block text-weight-regular text-caption">{{$i18n.locale === 'ru' ? tariff.info : tariff.info_en}}</span>
                  </p>
                <q-separator color="grey-2 q-mb-md"/>
                <div class="flex items-center justify-between">

                    <q-btn style="line-height: 200%" class=" text-bold "
                     :to="{name:'student-checkout',params:{cat_id:category.id,t_id:tariff.id}}"
                     unelevated
                     color="positive"
                     rounded
                     no-caps
                     text-color="white"
                     label="Выбрать"/>


                     <p class="no-margin text-bold text-warning text-lh-120 text-right tariff-price">{{tariff.price_rub +' ₽'}}<br>
                <span class="text-grey-7">{{ tariff.price_usd +' $'}}</span></p>

                </div>
              </div>


            </slide>
          </carousel>
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

.pay-btn
  background: #F7F9FF !important
  transition: all .2s linear
  &:hover
    background: $positive !important
    color: #ffffff !important
.tariff-price-btn
  display: none
.tariff-item-block__item
  cursor: pointer
  border-radius: 6px
  transition: all .2s linear
  &:hover
    background: #EBEEF7
    transform: scale(0.99)
    padding: 5px 5px 5px 32px
    &.with-dot::before
      left: 5px
    & .tariff-price
      display: none
    & .tariff-price-btn
      display: block
@media (max-width: 768px)
  .page-wrapper
    margin-top: -50px

.tariff-mobile-item
  background: #FFFFFF
  box-shadow: 4px 4px 7px rgba(0, 0, 0, 0.07)
  border-radius: 8px
  padding: 15px
  width: 100%
</style>
