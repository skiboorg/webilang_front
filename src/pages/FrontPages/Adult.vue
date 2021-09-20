<template>
  <q-page>
    <section class="offer">
      <div class="container">
        <div class="offer-wrapper">
          <div class="offer-text-block">
            <h1 class="offer-title section-title">{{$t('adult_offer_title')}}</h1>
            <div class="offer-text q-mb-lg">
              <p>{{$t('adult_offer_text1')}}</p>
              <p>{{$t('adult_offer_text2')}}</p>
              <p>{{$t('adult_offer_text3')}}</p>
            </div>
            <p class="q-mb-lg">{{$t('adult_offer_text4')}}</p>
            <p class="q-mb-lg text-weight-bold">{{$t('adult_offer_text5')}}</p>
            <CallbackModal :label="$t('want_free_lesson')" color="primary" :nocaps="true" extra_class="q-py-md q-px-xl"/>
          </div>
          <img class="" src="~assets/adult-offer-img.png" alt="">
        </div>
      </div>
    </section>
    <section class="about">
      <div class="container">
        <p class="section-title text-center" v-html="$t('adult_about_title')"></p>
        <div class="about-wrapper">
          <div class="about-item">
            <div class="text-center q-mb-md">
              <img class="" src="~assets/adult-about-img-1.png" alt="">
            </div>

            <p class="about-title">{{$t('adult_about_block1_title')}}</p>
            <div class="about-text">
              <p>{{$t('adult_about_block1_text1')}}</p>
              <p>{{$t('adult_about_block1_text2')}}</p>
              <p>{{$t('adult_about_block1_text3')}}</p>
            </div>
          </div>
          <div class="about-item">
            <div class="text-center q-mb-md">
              <img class="" src="~assets/adult-about-img-2.png" alt="">
            </div>

            <p class="about-title">{{$t('adult_about_block2_title')}}</p>
            <div class="about-text">
              <p>{{$t('adult_about_block2_text1')}}</p>
              <p>{{$t('adult_about_block2_text2')}}</p>
              <p>{{$t('adult_about_block2_text3')}}</p>
            </div>
          </div>
          <div class="about-item">
            <div class="text-center q-mb-md">
              <img class="" src="~assets/adult-about-img-3.png" alt="">
            </div>

            <p class="about-title">{{$t('adult_about_block3_title')}}</p>
            <div class="about-text">
              <p>{{$t('adult_about_block3_text1')}}</p>
              <p>{{$t('adult_about_block3_text2')}}</p>

            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="faq">
      <div class="container">
        <div @click="cur_faq=1" class="faq-item">
          <div  class="faq-item__top">
            <p>{{$t('adult_faq1_question')}}</p>
            <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.914 0.999141L11.0273 8.11247L18.1407 0.999141C18.8557 0.284141 20.0107 0.284141 20.7257 0.999141C21.4407 1.71414 21.4407 2.86914 20.7257 3.58414L12.3107 11.9991C11.5957 12.7141 10.4407 12.7141 9.72566 11.9991L1.31066 3.58414C0.595664 2.86914 0.595664 1.71414 1.31066 0.999141C2.02566 0.302474 3.199 0.284141 3.914 0.999141V0.999141Z" fill="#545454"/>
            </svg>
          </div>
          <div  class="faq-item__bottom " :class="{active:cur_faq===1}">
            <p v-html="$t('adult_faq1_aswer')"></p>
          </div>
        </div>
        <div @click="cur_faq=2" class="faq-item">
          <div class="faq-item__top">
            <p>{{$t('adult_faq2_question')}}</p>
            <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.914 0.999141L11.0273 8.11247L18.1407 0.999141C18.8557 0.284141 20.0107 0.284141 20.7257 0.999141C21.4407 1.71414 21.4407 2.86914 20.7257 3.58414L12.3107 11.9991C11.5957 12.7141 10.4407 12.7141 9.72566 11.9991L1.31066 3.58414C0.595664 2.86914 0.595664 1.71414 1.31066 0.999141C2.02566 0.302474 3.199 0.284141 3.914 0.999141V0.999141Z" fill="#545454"/>
            </svg>
          </div>
         <div  class="faq-item__bottom " :class="{active:cur_faq===2}">
            <p v-html="$t('adult_faq2_aswer')"></p>
          </div>
        </div>
        <div @click="cur_faq=3" class="faq-item">
          <div class="faq-item__top">
            <p>{{$t('adult_faq3_question')}}</p>
            <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.914 0.999141L11.0273 8.11247L18.1407 0.999141C18.8557 0.284141 20.0107 0.284141 20.7257 0.999141C21.4407 1.71414 21.4407 2.86914 20.7257 3.58414L12.3107 11.9991C11.5957 12.7141 10.4407 12.7141 9.72566 11.9991L1.31066 3.58414C0.595664 2.86914 0.595664 1.71414 1.31066 0.999141C2.02566 0.302474 3.199 0.284141 3.914 0.999141V0.999141Z" fill="#545454"/>
            </svg>
          </div>
          <div  class="faq-item__bottom " :class="{active:cur_faq===3}">
             <p v-html="$t('adult_faq3_aswer')"></p>
          </div>
        </div>
        <div class="text-center q-mt-xl">
          <CallbackModal :label="$t('want_free_lesson')" color="primary" :nocaps="true" extra_class="q-py-md q-px-xl"/>
        </div>

      </div>
    </section>
    <section class="mission">
      <div class="container">
        <p class="section-title text-center">{{$t('adult_mission_title')}}</p>
        <div class="mission-wrapper">
          <div class="mission-item blue">
            <p class="text-center text-fs-20 text-weight-bold q-mb-lg">{{$t('adult_mission_block1_title')}}</p>
            <p class="q-mb-lg">{{$t('adult_mission_block1_subtitle')}}</p>
            <p class="text-fs-18 text-weight-bold q-mb-md">{{$t('adult_mission_block1_subsubtitle')}}</p>
            <p class="with-dot dot-blue">{{$t('adult_mission_block1_text1')}}</p>
            <p class="with-dot dot-blue">{{$t('adult_mission_block2_text1')}}</p>
            <p class="with-dot dot-blue">{{$t('adult_mission_block3_text1')}}</p>
          </div>
          <div class="mission-item red">
            <p class="text-center text-fs-20 text-weight-bold q-mb-lg">{{$t('adult_mission_block2_title')}}</p>
            <p class="q-mb-lg">{{$t('adult_mission_block2_subtitle')}}</p>
            <p class="text-fs-18 text-weight-bold q-mb-md">{{$t('adult_mission_block2_subsubtitle')}}</p>
            <p class="with-dot dot-red">{{$t('adult_mission_block2_text1')}}</p>
            <p class="with-dot dot-red">{{$t('adult_mission_block2_text2')}}</p>
            <p class="with-dot dot-red">{{$t('adult_mission_block2_text3')}}</p>
          </div>
          <div class="mission-item green">
            <p class="text-center text-fs-20 text-weight-bold q-mb-lg">{{$t('adult_mission_block3_title')}}</p>
            <p class="q-mb-lg">{{$t('adult_mission_block3_subtitle')}}</p>
            <p class="text-fs-18 text-weight-bold q-mb-md">{{$t('adult_mission_block3_subsubtitle')}}</p>
            <p class="with-dot dot-green">{{$t('adult_mission_block3_text1')}}</p>
            <p class="with-dot dot-green">{{$t('adult_mission_block3_text2')}}</p>
            <p class="with-dot dot-green">{{$t('adult_mission_block3_text3')}}</p>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script>


import CallbackModal from "components/CallbackModal";

export default {
   components:{
    CallbackModal
  },
  data(){
    return{
      cur_faq:1
    }
  }
}
</script>
<style lang="sass" scoped>
.offer
  position: relative
  background: url(~assets/adult-offer-bg.png) no-repeat center
  height: 1190px
  background-size: cover
  padding-top: 405px
  margin-top: -430px
  margin-bottom: 20px
  z-index: 1
  img
    position: relative
    top: -40px
  &-wrapper
    display: grid
    grid-template-columns: 1fr 1fr
    margin-top: 130px
    & .section-title
      margin-bottom: 25px
  &-text
    p
      position: relative
      font-weight: 700
      line-height: 22px
      padding-left: 32px
      &:before
        position: absolute
        content: ''
        width: 12px
        height: 12px
        background: $primary
        border-radius: 100%
        left: 0
        top: 50%
        transform: translateY(-50%)

@media (max-width: 768px)
  .offer
    height: unset
    padding-top: 1px
    margin-top: 0
    margin-bottom: 60px
    &-wrapper
      grid-template-columns: 1fr
    &-text-block
      order: 2
      margin-top: -145px
    img
      order: 1
      width: 100%
      height: auto
      top: -130px

.about
  margin-bottom: 30px
  & .section-title
    margin-bottom: 50px
  &-wrapper
    display: grid
    grid-template-columns: repeat(3, 1fr)
    grid-gap: 30px
  &-item

  &-title
    font-weight: bold
    font-size: 20px
    line-height: 24px
  &-text
    p
      position: relative
      line-height: 22px
      padding-left: 32px
      &:before
        position: absolute
        content: ''
        width: 12px
        height: 12px
        background: $primary
        border-radius: 100%
        left: 0
        top: 50%
        transform: translateY(-50%)

@media (max-width: 768px)
  .about
    margin-bottom: 60px
    &-wrapper
      grid-template-columns: 1fr
      grid-gap: 15px
    &-title
      text-align: center
    &-text
      max-width: 400px
      margin: 0 auto
.faq
  background: url(~assets/how-it-work_bg.jpg) no-repeat center
  height: fit-content
  background-size: cover
  padding: 85px 0
  margin-bottom: 100px
  &-item
    padding: 34px 30px 0 30px
    background: #ffffff
    border-radius: 15px
    overflow: hidden
    margin-bottom: 15px
    &:last-child
      margin-bottom: 0px
    &__top
      display: flex
      align-items: center
      justify-content: space-between
      cursor: pointer
      p
        font-size: 28px
        font-weight: 800
        line-height: 36px
        margin-bottom: 0
    &__bottom
      margin-top: 30px
      height: 0
      min-height: 0
      p
        color: #606060
        line-height: 22px
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
          font-size: 20px
          line-height: 28px
          flex-basis: 80%

.mission
  margin-bottom: 70px
  & .section-title
    margin-bottom: 50px
  &-wrapper
    display: grid
    grid-template-columns: repeat(3,1fr)
    grid-gap: 30px
  &-item
    position: relative
    background: #F9F9F9
    border-bottom-left-radius: 15px
    border-bottom-right-radius: 15px
    padding: 30px
    &::before
      position: absolute
      content: ''
      left: 0
      height: 21px
      width: 100%
      border-top-left-radius: 15px
      border-top-right-radius: 15px
      top: -21px
    &.blue
      &::before
        background: $primary
    &.red
      &::before
        background: $negative
    &.green
      &::before
        background: $positive

@media (max-width: 768px)
  .mission
    &-wrapper
      grid-template-columns: 1fr
      grid-gap: 40px

</style>
