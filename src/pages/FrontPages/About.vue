<template>
  <q-page>
    <section class="about">
      <div class="container">
        <div class="about-row">
          <img class="img" src="~assets/about1.png" alt="">
          <div class="">
            <h1 class="about-title">{{$t('page_about_title1')}}</h1>
            <p class="about-text" v-html="$t('page_about_text1')"></p>
            <p class="about-text" v-html="$t('page_about_text2')"></p>
            <p class="about-text" v-html="$t('page_about_text3')"></p>
            <p class="about-text" v-html="$t('page_about_text4')"></p>
          </div>
        </div>
        <div class="about-row items-center">
          <div class="about-o2">
            <p class="about-title ">{{$t('page_about_title2')}}</p>
            <p class="text-weight-bold text-lh-150" v-html="$t('page_about_text5')"></p>
          </div>
           <img class="img about-o1" src="~assets/about2.png" alt="">
        </div>
         <div class="about-row items-center">
            <img class="img" src="~assets/about3.png" alt="">
          <div class="">
            <p class="text-weight-bold text-lh-150" v-html="$t('page_about_text6')"></p>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>


<style lang="sass" scoped>
.about
  margin-top: 65px
  margin-bottom: 100px
  &-row
    display: grid
    grid-template-columns: 1fr 1fr
    grid-gap: 30px
    margin-bottom: 30px
  &-title
    font-weight: 700
    font-size: 24px
    line-height: 34px
    margin-top: 0
    margin-bottom: 35px
  &-text
    font-weight: 500
    font-size: 18px
    line-height: 22px

@media (max-width: 768px)
  .about
    margin-top: 10px
    margin-bottom: 60px
    &-row
      display: grid
      grid-template-columns: 1fr
      grid-gap: 30px
      margin-bottom: 30px
    &-title
      font-weight: 700
      font-size: 20px
      line-height: 28px
      margin-top: 0
      margin-bottom: 20px
    &-o1
      order: 1
    &-o2
      order: 2



</style>
