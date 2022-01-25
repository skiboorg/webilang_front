<template>
  <q-page>
    <section class="offer">
    <div class="container">
      <div class="offer-wrapper">
        <div class="offer-text-block">
          <h1 class="offer-title section-title">{{$t('kids_offer_title')}}</h1>
          <div class="offer-text q-mb-lg">
            <p>{{$t('kids_offer_text1')}}</p>
            <p>{{$t('kids_offer_text2')}}</p>
            <p>{{$t('kids_offer_text3')}}</p>
          </div>
          <p class="q-mb-lg">{{$t('kids_offer_text4')}}</p>
          <CallbackModal :label="$t('want_free_lesson')" color="primary" :nocaps="true" extra_class="q-py-md q-px-xl"/>
        </div>
        <img class="" src="~assets/kids-offer-img.png" alt="">
      </div>
    </div>
    </section>
    <section class="groups">
      <div class="container">
        <p class="section-title text-center">{{$t('kids_group_title')}}</p>
        <p class="section-subtitle text-center">{{$t('kids_group_subtitle')}}</p>
        <div class="groups-wrapper">
          <div class="groups-item group-1">
            <p class="text-weight-bolder text-fs-18 q-mb-sm">{{$t('kids_group1_title')}}</p>
            <p class="text-grey-6">{{$t('kids_group1_subtitle')}}</p>
            <p class="no-margin text-lh-150">{{$t('kids_group1_text')}}</p>
          </div>
          <div class="groups-item group-2">
            <p class="text-weight-bolder text-fs-18 q-mb-sm">{{$t('kids_group2_title')}}</p>
            <p class="text-grey-6">{{$t('kids_group2_subtitle')}}</p>
            <p class="no-margin text-lh-150">{{$t('kids_group2_text')}}</p>
          </div>
          <div class="groups-item group-3">
            <p class="text-weight-bolder text-fs-18 q-mb-sm">{{$t('kids_group3_title')}}</p>
            <p class="text-grey-6">{{$t('kids_group3_subtitle')}}</p>
            <p class="no-margin text-lh-150">{{$t('kids_group3_text')}}</p>
          </div>
        </div>
        <p class="section-subtitle text-center">{{$t('kids_group_bottom_text')}}</p>
      </div>
    </section>
    <section class="about">
      <div class="container">
        <p class="section-title text-center" v-html="$t('kids_about_title')"></p>
        <div class="about-wrapper">
          <div class="about-item item-1">
            <p class="text-weight-bolder">{{$t('kids_about_title1')}}</p>
            <p class="no-margin">{{$t('kids_about_text1')}}</p>
          </div>
           <div class="about-item item-2">
            <p class="text-weight-bolder">{{$t('kids_about_title2')}}</p>
            <p class="no-margin">{{$t('kids_about_text2')}}</p>
          </div>
           <div class="about-item item-3">
            <p class="text-weight-bolder">{{$t('kids_about_title3')}}</p>
            <p class="no-margin">{{$t('kids_about_text3')}}</p>
          </div>
           <div class="about-item item-4">
            <p class="text-weight-bolder">{{$t('kids_about_title4')}}</p>
            <p class="no-margin">{{$t('kids_about_text4')}}</p>
          </div>
        </div>
        <p class="section-subtitle text-center">{{$t('kids_video_record')}}</p>
        <div class="text-center">

          <CallbackModal :label="$t('want_free_lesson')" color="primary" :nocaps="true" extra_class="q-py-md q-px-xl"/>
        </div>
      </div>
    </section>
    <section class="video">
    <div class="container">
      <div class="video-wrapper">
        <img class="img cursor-pointer" @click="video=true" src="~assets/kids-video.png" alt="">
        <div class="video-text">
          <p class="no-margin">{{$t('kids_video_record')}}</p>
        </div>
      </div>
    </div>
    </section>
  </q-page>
  <q-dialog
      v-model="video"
    >
      <q-card style="width: 700px; max-width: 100vw;">
       <q-video
      :ratio="16/9"
      src="https://www.youtube.com/embed/DdWbPbANCoA?rel=0"
    />
      </q-card>
    </q-dialog>
</template>

<script>



import CallbackModal from "components/CallbackModal";

export default {
  components:{
    CallbackModal
  },
  data(){
    return{
      video:false
    }
  }
}
</script>
<style lang="sass" scoped>
.offer
  position: relative
  background: url(~assets/kids-offer-bg.png) no-repeat center
  height: 1190px
  background-size: cover
  padding-top: 405px
  margin-top: -430px
  margin-bottom: 130px
  z-index: 1
  img
    position: relative
    top: -105px
  &::before
    position: absolute
    content: url(~assets/kids-offer-d1.png)
    top: 380px
    left: 0
    z-index: -1

  &::after
    position: absolute
    content: url(~assets/kids-offer-d2.png)
    top: 370px
    right: 0
    z-index: -1

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
    &::before
      left: -40px
      top: -100px
    &::after
      top: -125px
      right: -30px
      transform: scale(0.7)

.groups
  position: relative
  z-index: 1
  &::after
    position: absolute
    content: url(~assets/test.svg)
    //zoom: 2
    right: 0
    top: -160px
    z-index: -1
  &-wrapper
    display: grid
    grid-template-columns: repeat(3,1fr)
    grid-gap: 30px
    margin-bottom: 50px
  &-item
    position: relative
    background: #F7F9FF
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.05)
    border-radius: 15px
    padding: 30px
    min-height: 475px
    overflow: hidden
    z-index: 1
    &.group-1
      &::after
        position: absolute
        content: url(~assets/kids-group-1.png)

        right: 0
        bottom: -6px
        z-index: -1
    &.group-2
      &::after
        position: absolute
        content: url(~assets/kids-group-2.png)

        right: 0
        bottom: -6px
        z-index: -1
    &.group-3
      &::after
        position: absolute
        content: url(~assets/kids-group-3.png)

        right: 0
        bottom: -6px
        z-index: -1

@media (max-width: 768px)
  .groups
    margin-bottom: 60px

    &-wrapper
      grid-template-columns: 1fr
      grid-gap: 15px
    &::after
      content: none
.about
  position: relative
  background: url(~assets/kids-about-bg.jpg) no-repeat center
  height: 790px
  background-size: cover
  padding: 75px 0 55px 0
  margin-bottom: 60px
  &::before
    position: absolute
    content: url(~assets/kids-about-d.svg)
    left: 0
    top: -80px
  & .section-subtitle
    margin-bottom: 20px
  & .section-title
    margin-bottom: 50px
  &-wrapper
    display: grid
    grid-template-columns: 1fr 1fr
    grid-gap: 30px
    margin-bottom: 40px
  &-item
    position: relative
    background: #F7F9FF
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.05)
    border-radius: 15px
    padding: 30px 60px 30px 30px
    overflow: hidden
    &::after
      position: absolute
      font-size: 140px
      font-weight: 900
      right: 0
      bottom: -20px
      line-height: 100%
    &.item-1
      &::after
        content: '1'
        color: #FFEFCC
    &.item-2
      &::after
        content: '2'
        color: #CEF0FB
        right: -15px
    &.item-3
      &::after
        content: '3'
        color: #D3FFD3
        right: -15px
    &.item-4
      &::after
        content: '4'
        color: #FFE0E0
        right: -10px

@media (max-width: 768px)
  .about
    padding: 30px 0
    height: fit-content
    & .container
      padding-bottom: 30px
    &::before
      zoom: 0.5
      top: -270px
    &-wrapper
      grid-template-columns: 1fr
      grid-gap: 15px
.video
  position: relative
  margin-bottom: 75px
  &::before
    position: absolute
    content: url(~assets/kids-video-d.svg)
    left: 0
    top: -100px
  &-wrapper
    position: relative
    max-width: 560px
    margin: 0 auto
  &-text
    position: absolute
    background: #FFFFFF
    box-shadow: 4px 4px 25px rgba(0, 0, 0, 0.08)
    border-radius: 10px

    padding: 20px 70px 20px 20px
    max-width: 300px
    bottom: 25px
    left: -175px
    &::after
      position: absolute
      content: url(~assets/kids-video-d.png)

      right: 0
      bottom: -6px
    &::before
      position: absolute
      content: url(~assets/kids-arrow1.svg)
      top: -90px
      left: 35%
@media (max-width: 768px)
  .video
    margin-bottom: 60px
    &::before
      zoom: 0.3
      top: -500px
    &-text
      position: relative
      bottom: 0
      left: unset
      max-width: 100%
      &::before
        position: absolute
        content: url(~assets/kids-arrow2.svg)
        top: -130px
        left: 20px
    img
      margin-bottom: 40px

</style>
