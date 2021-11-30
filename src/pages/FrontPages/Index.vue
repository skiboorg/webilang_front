<template>
  <q-page>
    <section class="offer">
      <p class="text-primary text-weight-bolder text-uppercase text-center offer-title" >Welcome to WEBILANG</p>
      <h1 class="text-dark text-center offer-subtitle text-weight-bolder text-uppercase" v-html="$t('offer_subtitle')"></h1>
      <div class="text-center q-mb-xl">

        <CallbackModal :label="$t('want_free_lesson')" color="primary"  extra_class="q-py-md q-px-xl"/>

      </div>

      <div class="container">
        <div class="offer-grid">
           <router-link :to="{name:'front-kids'}">
          <div class="offer-grid-item kids text-dark">
              <p class="text-weight-bolder text-fs-18">{{$t('kids_title')}}</p>
            <p>{{$t('kids_text')}}</p>
          </div>
          </router-link>
          <router-link :to="{name:'front-adult'}">
          <div class="offer-grid-item mature text-dark">
            <p class="text-weight-bolder text-fs-18">{{$t('adult_title')}}</p>
            <p>{{$t('adult_text')}}</p>
          </div>
          </router-link>
          <router-link :to="{name:'front-exams'}">
          <div class="offer-grid-item exam text-dark">
            <p class="text-weight-bolder text-fs-18">{{$t('exams_title')}}</p>
            <p>{{$t('exams_text')}}</p>
          </div>
          </router-link>
        </div>
      </div>

    </section>
    <section class="about">
      <div class="container">
        <div class="about-wrapper">
          <h3 class="about-title text-fs-26 text-lh-150 text-center text-weight-bolder" v-html="$t('about_title')"> </h3>
          <div class="about-text">
            <p v-html="$t('about_text')"></p>
          </div>
          <p class="no-margin text-fs-18 text-weight-bolder text-center">{{$t('about_bottom_text')}}</p>
        </div>
      </div>
    </section>
    <section class="how-it-work">
      <div class="container text-center relative-position">
        <p class="section-title text-weight-bolder text-center text-fs-28 text-lh-150" v-html="$t('how_it_works_title')"></p>
        <img src="~assets/how-it-works.jpg" alt="">
        <div class="how-it-work-block b1">
          <p class="no-margin text-lh-150 text-left">{{$t('how_it_works_block1')}}</p>
        </div>
        <div class="how-it-work-block b2">
          <p class="no-margin text-lh-150 text-left">{{$t('how_it_works_block2')}}</p>
        </div>
        <div class="how-it-work-block b3">
          <p class="no-margin text-lh-150 text-left">{{$t('how_it_works_block3')}}</p>
        </div>
      </div>
    </section>
    <section class="feedback">
      <div class="container">
        <p class="section-title text-weight-bolder text-center text-fs-28 text-lh-150" v-html="$t('feedback_title')"></p>

        <q-carousel
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          control-color="primary"
          navigation
          padding
          infinite
          ref="carousel"
          class="feedback-slider"

        >
          <q-carousel-slide :name="index" v-for="(feedback,index) in feedbacks" :key="slide.id">
            <div class="feedback-slider-block">
              <div class="feedback-item   full-height mom">
                <div class="feedback-item-top flex items-center ">
                  <q-avatar  size="72px" class="q-mr-md">
                    <img class="avatar-img" :src="feedback.parent_image" alt="">
                  </q-avatar>
                  <div class="">
                    <p class="text-primary q-mb-sm"> {{$i18n.locale === 'ru' ? feedback.parent : feedback.parent_en}}</p>
                    <p style="opacity: .5" class="no-margin">{{$i18n.locale === 'ru' ? feedback.parent_info : feedback.parent_info_en}}</p>
                  </div>

                </div>
                <div  class="">
                  <p class="no-margin feedback-item-text">{{$i18n.locale === 'ru' ? feedback.parent_text : feedback.parent_text_en}}</p>
                </div>
              </div>
              <div class="feedback-item  full-height son">
                <div class="feedback-item-top flex items-center ">
                  <q-avatar  size="72px" class="q-mr-md">
                     <img class="avatar-img" :src="feedback.kid_image" alt="">
                  </q-avatar>
                  <div class="">
                     <p class="text-primary q-mb-sm"> {{$i18n.locale === 'ru' ? feedback.kid : feedback.kid_en}}</p>
                    <p style="opacity: .5" class="no-margin">{{$i18n.locale === 'ru' ? feedback.kid_info : feedback.kid_info_en}}</p>
                  </div>

                </div>
                <div  class="">

               <p class="no-margin feedback-item-text" >{{$i18n.locale === 'ru' ? feedback.kid_text : feedback.kid_text_en}}</p>
                </div>
              </div>
            </div>
          </q-carousel-slide>
          <template v-slot:control>
            <q-carousel-control
              position="bottom-right"
              :offset="[18, 18]"
              class="q-gutter-xs">
              <q-btn
                dense color="primary" outline  icon="arrow_left"
                @click="$refs.carousel.previous()"
              />
              <q-btn
                dense color="primary" outline icon="arrow_right"
                @click="$refs.carousel.next()"
              />
            </q-carousel-control>
          </template>

        </q-carousel>
      </div>
    </section>
    <section class="callback-form">
      <div class="container">
        <div class="callback-form-wrapper">
          <img class="img" draggable="false" src="~assets/cb-img.png"  alt="">
          <div class="callback-form-inner">
            <p class="section-title text-weight-bolder text-left text-fs-28 text-lh-150" v-html="$t('callback_form_title')"></p>
            <p v-html="$t('callback_form_subtitle')"></p>
            <CallbackForm/>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>
<script>
import CallbackForm from "components/CallbackForm";
import CallbackModal from "components/CallbackModal";
import {mapGetters} from "vuex";
export default {
  components:{
    CallbackForm,
    CallbackModal
  },
  data(){
    return{
      slide:0,
      is_loading:false,
      cbData:{
        name:null,
        phone:null
      }
    }
  },
  computed:{
    ...mapGetters('data',['feedbacks'])
  },
  methods:{
    callbackSubmit(){
      console.log('cb sbmit')
    }
  }

}
</script>
<style lang="sass" scoped>
.offer
  background: url(~assets/offer_bg_1.png) no-repeat center
  height: 1190px
  background-size: cover
  padding-top: 464px
  margin-top: -430px
  margin-bottom: 130px
  &-title
    font-size: 74px
    line-height: 90px
    max-width: 700px
    margin: 0 auto 35px
  &-subtitle
    font-size: 24px
    line-height: 35px
    max-width: 700px
    margin: 0 auto 40px
  &-grid
    display: grid
    grid-template-columns: repeat(3,1fr)
    grid-gap: 30px
    &-item
      position: relative
      background: #F7F9FF
      transition: all .4s linear
      border-radius: 15px
      min-height: 250px
      padding: 120px 30px 30px 30px
      z-index: 1
      &:hover
        box-shadow: 4px 4px 25px rgba(0, 0, 0, 0.1)
      &.kids
        &::after
          right: 0
          top: 0
          position: absolute
          content: url(~assets/offer-grid-i-1.svg)
          z-index: -1
      &.mature
        &::after
          right: 0
          top: 0
          position: absolute
          content: url(~assets/offer-grid-i-2.svg)
          z-index: -1
      &.exam
        &::after
          right: 0
          top: 0
          position: absolute
          content: url(~assets/offer-grid-i-3.svg)
          z-index: -1


@media (max-width: 768px)
  .offer
    padding-top: 10px
    margin-top: 0
    height: unset
    margin-bottom: 40px
    &-grid
      grid-template-columns: 1fr
    &-title
      font-size: 44px
      line-height: 53px
      margin: 0 auto 35px
      max-width: 340px
    &-subtitle
      font-size: 18px
      line-height: 29px
      margin: 0 auto 40px
.about
  &-wrapper
    position: relative
    background: #F7F9FF
    border-radius: 30px
    padding: 30px
    overflow: hidden
    z-index: 1
    margin-bottom: 50px
    &::before
      position: absolute
      content: url(~assets/about-top.png)
      top: 0
      left: 0
      z-index: -1
    &::after
      position: absolute
      content: url(~assets/about-bottom.png)
      bottom: -6px
      right: 0
      z-index: -1
  &-title
    margin-top: 0
    margin-bottom: 30px
    span
      display: block
  &-text
    margin-bottom: 30px
    line-height: 22px

@media (max-width: 768px)

  .about
    &-title
      font-size: 19px
      line-height: 28px
.how-it-work
  background: url(~assets/how-it-work_bg.jpg) no-repeat center
  height: 730px
  background-size: cover
  padding: 85px 0
  margin-bottom: 50px
  img
    border-radius: 20px
  &-block
    position: absolute
    background: #F7F9FF
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.08)
    border-radius: 10px
    padding: 15px 40px 15px 20px
    max-width: 390px
    z-index: 1


    overflow: hidden
    &::after
      position: absolute
      z-index: -1
    &.b1
      top: 140px
      left: 0
      &::after
        content: url(~assets/how-it-work-decor1.png)
        top: 0
        right: 0
    &.b2
      left: 0
      bottom: -50px
      &::after
        content: url(~assets/how-it-work-decor2.png)
        bottom: -6px
        right: 0

    &.b3
      right: 0
      bottom: 0px
      &::after
        content: url(~assets/how-it-work-decor3.png)
        top: 0
        right: 0


@media (max-width: 768px)
  .how-it-work
    background: unset
    padding: 0
    margin-bottom: 60px
    & .section-title
      margin-bottom: 40px
    img
      width: 100%
      height: auto
      margin-bottom: 40px
    &-block
      position: relative
      max-width: 100%
      &.b1
        top: unset
        left: unset
        margin-bottom: 15px
      &.b2
        left: unset
        bottom: unset
        margin-bottom: 15px
      &.b3
        right: unset
        bottom: unset


.feedback
  margin-bottom: 135px
  &-slider
    height: fit-content
    &-block
      display: grid
      grid-template-columns: 1fr 1fr
      grid-gap: 30px
  & .q-carousel__navigation-icon--inactive
    font-size: 8px !important
    transition: all .2s linear
    color: #09B5EC !important
  & .q-carousel__navigation .q-btn
    margin: 0
    padding: 0
  &-item
    position: relative
    background: #F7F9FF
    border-radius: 20px
    padding: 30px 70px 30px 30px
    overflow: hidden
    z-index: 1
    height: auto
    &-top
      margin-bottom: 20px
    &-text
      line-height: 22px
    &.mom
      &::before
        position: absolute
        content: url(~assets/fb-mom.png)
        top: 0
        right: 0
        z-index: -1
    &.son
      &::before
        position: absolute
        content: url(~assets/fb-son.png)
        bottom: -6px
        right: 0
        z-index: -1
@media (max-width: 768px)
  .feedback
    margin-bottom: 60px
    &-slider-block
      grid-template-columns: 1fr
      grid-gap: 15px
.callback-form
  margin-bottom: 90px
  & .section-title
    margin-bottom: 30px
  &-wrapper
    background: #F7F9FF
    border-radius: 35px
    display: grid
    grid-template-columns: 1fr 1fr
    grid-gap: 60px
    padding: 30px
    align-items: center
@media (max-width: 768px)
  .callback-form
    margin-bottom: 60px
    & .container
      padding: 0
    & .section-title
      text-align: center
    & .q-form
      max-width: 100%
    &-wrapper
      border-radius: 0
      grid-template-columns: 1fr
      grid-gap: 40px
      text-align: center
</style>
