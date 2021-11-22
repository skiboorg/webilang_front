<template>
  <q-page>
    <section class="tariffs">
      <div class="container">
        <div class="tariffs-wrapper">
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
                  <p class="no-margin text-warning">{{$i18n.locale === 'ru' ? tariff.price_rub +' ₽' : tariff.price_usd +' $'}} </p>
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
                  <p class="no-margin text-warning">{{$i18n.locale === 'ru' ? tariff.price_rub +' ₽' : tariff.price_usd +' $'}} </p>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </section>
    <section class="callback">
      <div class="container">
        <div class="callback-wrapper">
          <div class="">
            <p class="text-fs-28 text-weight-bolder q-mb-lg">{{$t('choose_tarif')}}</p>
            <p class="callback-text">{{$t('need_data')}}</p>
            <q-no-ssr>
               <CallbackForm/>
            </q-no-ssr>

          </div>
           <img class="img" src="~assets/tariff-callback-img.png" alt="">
        </div>


      </div>
    </section>

  </q-page>
</template>

<script>

import CallbackForm from "components/CallbackForm";
import {mapGetters} from "vuex";

export default {
   components:{
    CallbackForm
  },
  data(){
    return{

    }
  },
  computed:{
    ...mapGetters('data',['tariffs'])
  }

}
</script>
<style lang="sass">
.callback
  margin-bottom: 80px
  &-wrapper
    display: grid
    grid-template-columns: 1fr 1fr
    align-items: flex-end
  &-text
    max-width: 350px
    margin-bottom: 40px
@media (max-width: 768px)
  .callback
    &-wrapper
      grid-template-columns: 1fr
</style>
