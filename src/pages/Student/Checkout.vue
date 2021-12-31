<template>
  <div ref="page-wrapper" class="page-wrapper">
    <h1 class="section-title q-my-lg">{{$t('your_tariff')}}</h1>
      <div class="flex items-center justify-between q-mb-lg">
        <p class="no-margin text-fs-16 text-weight-bold q-mb-lg">{{$i18n.locale === 'ru' ? current_tariff_category.name : current_tariff_category.name_en}}</p>
        <router-link class="link" :to="{name:'student-payment'}">{{$t('change_tariff')}}</router-link>

      </div>

     <div class="faq q-mb-lg">
        <div @click="faq_open = !faq_open" class="faq-item">
          <div  class="faq-item__top ">
            <div class="with-dot dot-blue col-grow">
              <p class="no-margin">{{$i18n.locale === 'ru' ? current_tariff.name : current_tariff.name_en}} <b v-if="current_tariff.discount>0" class="text-positive">({{$t('tariff_discount')}} {{current_tariff.discount}} %)</b></p>
              <p v-if="current_tariff.info" class="no-margin">{{$i18n.locale === 'ru' ? current_tariff.info : current_tariff.info_en}}</p>
            </div>
            <p class="q-mb-none text-warning text-bold q-mr-lg">{{current_tariff.price_rub +'₽'}}({{current_tariff.price_usd +'$'}})</p>
            <svg class="arrow " :class="{rotate:faq_open}" width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.914 0.999141L11.0273 8.11247L18.1407 0.999141C18.8557 0.284141 20.0107 0.284141 20.7257 0.999141C21.4407 1.71414 21.4407 2.86914 20.7257 3.58414L12.3107 11.9991C11.5957 12.7141 10.4407 12.7141 9.72566 11.9991L1.31066 3.58414C0.595664 2.86914 0.595664 1.71414 1.31066 0.999141C2.02566 0.302474 3.199 0.284141 3.914 0.999141V0.999141Z" fill="#545454"/>
            </svg>
          </div>
          <div  class="faq-item__bottom" :class="{active:faq_open}" >
             <p class="text-fs-18 text-weight-bold q-mb-sm">{{$t('tariff_mini_group')}}</p>
           <div @click="current_tariff=tariff" class="faq-item__top q-pb-md can-hover"
                v-for="tariff in current_tariff_category.tariffs.filter(x=>!x.is_personal)" :key="tariff.id">
            <div class="with-dot dot-blue col-grow">
              <p class="no-margin">{{$i18n.locale === 'ru' ? tariff.name : tariff.name_en}} <b v-if="tariff.discount>0" class="text-positive">({{$t('tariff_discount')}} {{tariff.discount}} %)</b></p>
              <p v-if="tariff.info" class="no-margin">{{$i18n.locale === 'ru' ? tariff.info : tariff.info_en}}</p>
            </div>
            <p class="q-mb-none text-warning text-bold">{{tariff.price_rub +'₽'}}({{tariff.price_usd +'$'}})</p>

          </div>
<q-separator class="q-mb-md"/>
              <p class="text-fs-18 text-weight-bold q-mb-sm">{{$t('tariff_individual')}}</p>
           <div @click="current_tariff=tariff" class="faq-item__top q-pb-md can-hover"
                v-for="tariff in current_tariff_category.tariffs.filter(x=>x.is_personal)" :key="tariff.id">
            <div class="with-dot dot-blue col-grow">
              <p class="no-margin">{{$i18n.locale === 'ru' ? tariff.name : tariff.name_en}} <b v-if="tariff.discount>0" class="text-positive">({{$t('tariff_discount')}} {{tariff.discount}} %)</b></p>
              <p v-if="tariff.info" class="no-margin">{{$i18n.locale === 'ru' ? tariff.info : tariff.info_en}}</p>
            </div>
            <p class="q-mb-none text-warning text-bold">{{tariff.price_rub +'₽'}}({{tariff.price_usd +'$'}})</p>

          </div>

          </div>
        </div>

      </div>
    <div class="q-mb-lg">

      <p class="text-bold">{{$t('enter_promo')}}</p>
     <q-form  @submit.prevent="promoFormSubmit" class="flex items-center no-wrap">
            <q-input outlined v-model="promo_code" bg-color="white"  />
            <q-btn class=" text-manrope  q-py-md q-px-xl" :disable="!promo_code"
                   :loading="is_loading" no-caps color="primary" type="submit" :label="$t('lessons_sort_apply')"/>
          </q-form>
    </div>
    <div class="">
      <p v-if="active_promo.id && !active_promo.is_free_lessons" class="text-bold text-fs-16">{{$t('discount')}}
        <span v-if="active_promo.discount_percent">{{active_promo.discount_percent}} %</span>
        <span v-if="active_promo.discount_money_rub">{{$i18n.locale === 'ru' ? active_promo.discount_money_rub +' ₽' : active_promo.discount_money_usd +' $'}}</span>
      </p>
      <p v-if="active_promo.id && active_promo.is_free_lessons" class="text-positive text-bold text-fs-20">
        {{$t('bonus_lessons')}}  {{active_promo.free_lessons_count}}  {{$t('bonus_lessons_1')}}
      </p>
      <p class="text-weight-bolder text-fs-20">{{$t('total')}} {{total_price}} RUB</p>
      <p class="text-bold text-fs-20">{{$t('payment_method')}}</p>
      <div class="flex items-center q-mb-lg">
         <q-radio dense v-model="payment_method" val="bank" color="grey-7" class="q-mr-lg text-bold" :label="$t('bank_card')" />
      <q-radio dense v-model="payment_method" val="paypal" color="grey-7" class="text-bold" :label="$t('paypal')" />
      </div>
      <q-btn @click="pay" unelevated color="positive" :loading="is_loading" no-caps class="text-manrope border-r-8  q-py-md q-px-xl q-mb-lg" :label="$t('pay')"/>
      <p><span v-html="$t('warning')"></span> <a class="link" target="_blank" :href="$i18n.locale === 'ru' ? '/terms.pdf' : '/terms_en.pdf'" >{{$t('policy_link_text')}}</a></p>
<p class="text-caption" v-html="$t('payment_info')"></p>

    </div>

  </div>

</template>

<script>

import {mapActions, mapGetters} from 'vuex'
export default {
  data() {
    return {
      faq_open:false,
      is_loading:false,
      promo_code:null,
      payment_method:'bank',
      active_promo:{},
      notifications:[],
      selectMode:false,
      current_tariff_category:{},
      current_tariff:{}


    }
  },
   beforeMount() {
    this.current_tariff_category = this.tariffs.find(x=>x.id===parseInt(this.$route.params.cat_id))
    this.current_tariff = this.current_tariff_category.tariffs.find(x=>x.id===parseInt(this.$route.params.t_id))
  },
  methods: {
    ...mapActions('data',['getNotifications']),
    async pay(){
       this.is_loading = !this.is_loading
      if(this.payment_method==='bank'){
        const response_sber = await this.$api.post('/api/user/sber_payment',{
          language: this.$i18n.locale,
          amount: this.total_price * 100,
          tariff_id: this.current_tariff.id,
          promo_code: this.promo_code
        })
        console.log(response_sber.data)
        if (response_sber.data.success){
            //window.open(response_sber.data.url, '_blank').focus()
            window.location.href = response_sber.data.url
        }else{
          this.$q.notify({
          message: response_sber.data.message,
          position: this.$q.screen.lt.sm ? 'bottom' : 'bottom-right',
          color:'negative',
          icon: 'announcement'
        })
        }
       this.is_loading = !this.is_loading
      }
    },
    async promoFormSubmit(){
      this.is_loading = !this.is_loading
      const response = await this.$api.post('/api/user/check_promo',{code:this.promo_code})
      console.log(response.data)
      if (response.data){
        this.active_promo = response.data
        this.$q.notify({
          message: this.$t('promo_found'),
          position: this.$q.screen.lt.sm ? 'bottom' : 'bottom-right',
          color:'positive',
          icon: 'announcement'
        })
      }else {
        this.active_promo = {}
        this.$q.notify({
          message: this.$t('promo_not_found'),
          position: this.$q.screen.lt.sm ? 'bottom' : 'bottom-right',
          color:'negative',
          icon: 'announcement'
        })
      }
      this.is_loading = !this.is_loading
    }
  },
  computed:{
    ...mapGetters('data',['tariffs']),

    total_price(){
      let discount_percent
      let discount_rub
      let discount_usd
      let is_free_lessons
      if (this.active_promo.id){
        discount_percent = this.active_promo.discount_percent
        discount_rub = this.active_promo.discount_money_rub
        discount_usd = this.active_promo.discount_money_usd
        is_free_lessons = this.active_promo.is_free_lessons
      }else {
        return this.$i18n.locale === 'ru' ? this.current_tariff.price_rub  : this.current_tariff.price_rub
      }
      if(is_free_lessons){
        return this.$i18n.locale === 'ru' ? this.current_tariff.price_rub  : this.current_tariff.price_rub
      }
      if(this.$i18n.locale === 'ru'){

          if(discount_percent){
            return parseFloat(this.current_tariff.price_rub - this.current_tariff.price_rub * (discount_percent / 100)).toFixed(0)
          }
          if(discount_rub){
            return this.current_tariff.price_rub - discount_rub
          }

      }else{

         if(discount_percent){
            return parseFloat(this.current_tariff.price_rub - this.current_tariff.price_rub * (discount_percent / 100)).toFixed(0)
          }
          if(discount_usd){
            return this.current_tariff.discount_rub - discount_rub
          }

      }
    }
  }

}
</script>
<style lang="sass" scoped>
.arrow
  transition: all .2s linear
  &.rotate
    transform-origin: 50% 50%
    transform: rotate(-180deg)
    transition: all .2s linear
.faq

  &-item
    padding: 20px 30px 0 30px
    background: #F7F9FF
    border-radius: 15px
    overflow: hidden
    margin-bottom: 15px


    &__top
      position: relative
      display: flex
      align-items: center
      justify-content: space-between
      cursor: pointer
      transition: all .2s linear
      &.can-hover
        &:hover
          transform: scale(1.01)


    &__bottom
      margin-top: 15px
      height: 0
      min-height: 0

      &.active
        height: auto
        min-height: auto

@media (max-width: 768px)
  .faq
    padding: 30px 0
    margin-bottom: 60px
    height: fit-content
    & .container
      padding-bottom: 30px
    &-item
      &__top

        p
          font-size: 13px
          line-height: 18px
          //flex-basis: 100%
        & .with-dot
          padding: 0
          &::before
            content: none

</style>
