<template>
  <q-page>
    <section class="offer">
      <div class="container">
        <div class="offer-wrapper">
          <div class="offer-text-block">
            <h1 class="offer-title section-title">{{$t('exam_offer_title')}}</h1>
            <div class="offer-text q-mb-lg">
              <p>{{$t('exam_offer_text1')}}</p>
              <p>{{$t('exam_offer_text2')}}</p>
              <p>{{$t('exam_offer_text3')}}</p>
            </div>

            <q-btn color="primary" :class="[$q.screen.lt.md ? 'full-width' : '']" class="text-manrope border-r-8 q-py-md q-px-xl q-mt-lg" no-caps :label="$t('open_callback_form')"/>
          </div>
          <img class="" src="~assets/exam-offer-img.png" alt="">
        </div>
      </div>
    </section>
    <section class="tabs">
      <div class="container">
        <div class="tabs-top">
          <div @click="tab=1" class="tabs-top-item" :class="{active:tab===1}">
            <p class="no-margin text-weight-bolder text-fs-18 text-primary text-center">{{$t('exam_tab1_name')}}</p>
          </div>
          <div @click="tab=2" class="tabs-top-item" :class="{active:tab===2}">
            <p class="no-margin text-weight-bolder text-fs-18 text-negative text-center">{{$t('exam_tab2_name')}}</p>
          </div>
          <div @click="tab=3" class="tabs-top-item" :class="{active:tab===3}">
            <p class="no-margin text-weight-bolder text-fs-18 text-positive text-center">{{$t('exam_tab3_name')}}</p>
          </div>
        </div>
        <div v-if="tab===1" class="tabs-bottom">
          <div class="tabs-bottom-item">
            <p class="text-fs-24 text-weight-bold q-mb-lg">{{$t('exam_tab1_title')}}</p>
            <div class="q-mb-xl">
              <p class="text-bold with-dot dot-blue">{{$t('exam_tab1_text1')}}</p>
              <p class="text-bold with-dot dot-blue">{{$t('exam_tab1_text2')}}</p>
              <p class="text-bold with-dot dot-blue">{{$t('exam_tab1_text3')}}</p>
            </div>
            <div class="q-mb-xl">
              <p class="text-fs-18 text-weight-bold q-mb-lg">{{$t('exam_tab1_text4')}}</p>
              <p class="text-bold with-dot dot-blue">{{$t('exam_tab1_text5')}}</p>
              <p class="text-bold with-dot dot-blue">{{$t('exam_tab1_text6')}}</p>
              <p class="text-bold with-dot dot-blue">{{$t('exam_tab1_text7')}}</p>
              <p class="text-bold with-dot dot-blue">{{$t('exam_tab1_text8')}}</p>
            </div>
            <div class="q-mb-xl">
              <p class="text-fs-18 text-weight-bold q-mb-lg">{{$t('exam_tab1_text9')}}</p>
              <p class="text-bold with-dot dot-blue">{{$t('exam_tab1_text10')}}</p>
              <p class="text-bold with-dot dot-blue">{{$t('exam_tab1_text11')}}</p>
              <p class="text-bold with-dot dot-blue">{{$t('exam_tab1_text12')}}</p>
            </div>
            <p class="text-fs-18 text-weight-bold q-mb-lg">{{$t('exam_tab1_text13')}}</p>
            <p class="no-margin text-bold">{{$t('exam_tab1_text14')}}</p>
            <div class="text-center q-mt-xl">
              <q-btn color="primary" class="text-manrope border-r-8 q-py-md q-px-xl" no-caps   :label="$t('open_callback_form')"/>
            </div>

          </div>
        </div>
        <div v-if="tab===2" class="tabs-bottom">
          <div class="tabs-bottom-item">
            <p class="text-fs-24 text-weight-bold q-mb-lg">{{$t('exam_tab2_title')}}</p>
            <div class="q-mb-xl">
              <p class="text-bold with-dot dot-red">{{$t('exam_tab2_text1')}}</p>
              <p class="text-bold with-dot dot-red">{{$t('exam_tab2_text2')}}</p>
              <p class="text-bold with-dot dot-red">{{$t('exam_tab2_text3')}}</p>
            </div>
            <div class="q-mb-xl">
              <p class="text-fs-18 text-weight-bold q-mb-lg">{{$t('exam_tab1_text4')}}</p>
              <p class="text-bold with-dot dot-red">{{$t('exam_tab2_text5')}}</p>
              <p class="text-bold with-dot dot-red">{{$t('exam_tab2_text6')}}</p>
              <p class="text-bold with-dot dot-red">{{$t('exam_tab2_text7')}}</p>
              <p class="text-bold with-dot dot-red">{{$t('exam_tab2_text8')}}</p>
            </div>
            <p class="text-fs-18 text-weight-bold q-mb-lg">{{$t('exam_tab2_text9')}}</p>
            <p class="no-margin text-center text-bold">{{$t('exam_tab2_text10')}}</p>
            <div class="text-center q-mt-xl">
              <q-btn color="negative" class="text-manrope border-r-8 q-py-md q-px-xl" no-caps   :label="$t('open_callback_form')"/>
            </div>

          </div>
        </div>
        <div v-if="tab===3" class="tabs-bottom">
          <div class="tabs-bottom-item">
            <p class="text-fs-24 text-weight-bold q-mb-lg">{{$t('exam_tab3_title')}}</p>
            <div class="q-mb-xl">
              <p class="text-bold with-dot dot-green">{{$t('exam_tab3_text1')}}</p>
              <p class="text-bold with-dot dot-green">{{$t('exam_tab3_text2')}}</p>
              <p class="text-bold with-dot dot-green">{{$t('exam_tab3_text3')}}</p>
            </div>
            <div class="q-mb-xl">
              <p class="text-fs-18 text-weight-bold q-mb-lg">{{$t('exam_tab3_text4')}}</p>
              <p class="text-bold with-dot dot-green">{{$t('exam_tab3_text5')}}</p>
              <p class="text-bold with-dot dot-green">{{$t('exam_tab3_text6')}}</p>
            </div>

            <div class="text-center q-mt-xl">
              <q-btn color="positive" class="text-manrope border-r-8 q-py-md q-px-xl" no-caps   :label="$t('open_callback_form')"/>
            </div>

          </div>
        </div>


      </div>
    </section>
    <div class="divider">
      <svg width="100%" height="1" viewBox="0 0 1171 1" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0.0283203" y1="0.5" x2="1170.03" y2="0.5" stroke="#979797" stroke-dasharray="15 15"/>
      </svg>

    </div>
    <section class="social">
      <div class="social-wrapper">
        <p class="social-title">{{$t('exam_social_project_title')}}</p>
        <img src="~assets/logo1.png" alt="">
        <p class="text-center section-title q-mb-lg">{{$t('exam_social_project_subtitle')}}</p>
        <div class="social-wrapper-inner">
          <p class="with-dot dot-blue">{{$t('exam_social_project_text1')}}</p>
          <p class="with-dot dot-blue">{{$t('exam_social_project_text2')}}</p>
          <p class="with-dot dot-blue">{{$t('exam_social_project_text3')}}</p>
        </div>
        <div class="text-center q-mt-xl">
          <q-btn color="primary" class="text-manrope border-r-8 q-py-md q-px-xl" no-caps   :label="$t('open_callback_form')"/>
        </div>
      </div>
    </section>
    <section class="about">
      <div class="container">
        <div class="about-inner">
          <p class="text-fs-18 text-weight-bolder q-mb-lg">{{$t('exam_about_text1')}}</p>
          <p class="text-bold with-dot dot-blue" v-html="$t('exam_about_text2')"></p>
          <p class="text-bold with-dot dot-blue" v-html="$t('exam_about_text3')"></p>
          <p class="text-bold with-dot dot-blue" v-html="$t('exam_about_text4')"></p>
        </div>
        <p class="section-subtitle text-center">{{$t('exam_about_text5')}}</p>

      </div>
    </section>
    <section class="video1">
      <div class="container">
        <p class="section-title text-center">{{$t('exam_video_block1_title')}}</p>
        <div class="q-video text-center">
      <iframe
        class="video1-frame"
        src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0"
        frameborder="0"
        allowfullscreen
      />
    </div>
      </div>
    </section>
    <section class="slider">
      <div class="container">
        <p class="section-title text-center">{{$t('exam_meet_teachers_title')}}</p>
        <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="primary"
      :navigation="$q.screen.gt.sm"
      padding
      infinite
      ref="carousel"
      class="slider-el"
    >
      <q-carousel-slide :name="index" v-for="(item,index) in teachers" :key="item.id">
        <TeacherCard :teacher="item"/>
      </q-carousel-slide>

           <template v-slot:control>
            <q-carousel-control
              position="bottom-right"
              :offset="$q.screen.gt.sm ? [18, 18] : [18,0]"
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
    <section class="video2">
      <div class="container">
        <p class="section-title text-center">{{$t('exam_video_block2_title')}}</p>
        <div class="q-video text-center">
      <iframe
        class="video1-frame"
        src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0"
        frameborder="0"
        allowfullscreen
      />
    </div>
      </div>
    </section>
    <section class="paper container text-center">
      <img class="img" src="~assets/paper.jpg" alt="">
    </section>
  </q-page>
</template>

<script>
import TeacherCard from "components/TeacherCard";
import {mapGetters} from "vuex";
export default {
  components:{
    TeacherCard
  },
  data(){
    return{
      slide:0,
      tab:1
    }
  },
  computed:{
    ...mapGetters('data',['teachers'])
  }

}
</script>
<style lang="sass" scoped>
.offer
  position: relative
  background: url(~assets/exam-offer-bg.png) no-repeat center
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

.tabs
  margin-bottom: 135px
  &-top
    display: grid
    grid-template-columns: repeat(3,1fr)
    grid-gap: 7px
    align-items: flex-end
    &-item
      background: #EAF1FF
      border-radius: 8px 8px 0px 0px
      height: 52px
      cursor: pointer
      display: flex
      align-items: center
      justify-content: center
      //transition: all .2s linear
      &.active
        background: #F7F9FF
        height: 72px
  &-bottom
    &-item
      background: #F7F9FF
      border-radius: 0px 0px 15px 15px
      padding: 30px

.divider
  margin-bottom: 135px
.social
  &-wrapper
    max-width: 800px
    margin: 0 auto 135px
    text-align: center
    &-inner
      max-width: 550px
      margin: 0 auto 50px
      text-align: left
  &-title
    color: $negative
    font-weight: 900
    font-size: 24px
    letter-spacing: 0.37rem
    text-transform: uppercase
    margin-bottom: 40px
  img
    margin-bottom: 40px

.about
  margin-bottom: 95px
  &-inner
    margin-bottom: 135px
  & .section-subtitle
    max-width: 730px
    margin: 0 auto
.video1
  background: url(~assets/exam-bg.png) no-repeat center
  height: 670px
  background-size: cover
  padding: 50px 0
  margin-bottom: 70px
  & .section-title
    margin-bottom: 70px
  &-frame
    max-width: 770px
    height: 460px
    border: 15px solid #606060
    box-shadow: 10px 10px 35px rgba(0, 0, 0, 0.15)
    border-radius: 30px

.slider
  margin-bottom: 100px
  & .section-title
    margin-bottom: 80px
  &-el
    height: fit-content
  & .q-carousel__navigation-icon--inactive
    font-size: 8px !important
    transition: all .2s linear
    color: #09B5EC !important
  & .q-carousel__navigation .q-btn
    margin: 0
    padding: 0




.video2
  background: url(~assets/exam-bg1.png) no-repeat center
  height: 670px
  background-size: cover
  padding: 50px 0
  margin-bottom: 70px
  & .section-title
    margin-bottom: 70px
  &-frame
    max-width: 770px
    height: 460px
    border: 15px solid #606060
    box-shadow: 10px 10px 35px rgba(0, 0, 0, 0.15)
    border-radius: 30px

.paper
  margin-bottom: 80px
@media (max-width: 768px)
  .tabs
    margin-bottom: 70px
  .divider
    margin-bottom: 70px
  .social-wrapper
    margin-bottom: 70px
    padding: 0 10px
  .about
    margin-bottom: 70px
    &-inner
      margin-bottom: 70px
  .video
    margin-bottom: 70px
  .section-title
    margin-bottom: 70px
</style>
