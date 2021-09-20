<template>
  <q-page>
    <section class="education">
      <div class="container">
        <div class="education-wrapper">
          <img class="img" src="~assets/education-img.png" alt="">
          <div class="">
            <p class="section-title q-mb-lg">{{$t('education_progress_title1')}}</p>
            <p class="with-dot dot-blue">{{$t('education_progress_text1')}}</p>
            <p class="with-dot dot-blue">{{$t('education_progress_text2')}}</p>
            <p class="with-dot dot-blue">{{$t('education_progress_text3')}}</p>
            <p class="with-dot dot-blue">{{$t('education_progress_text4')}}</p>

            <p>{{$t('education_progress_text5')}}</p>
          </div>
        </div>
        <p class="section-title q-mb-lg">{{$t('education_progress_title2')}}</p>
            <p class="with-dot dot-blue">{{$t('education_progress_text6')}}</p>
            <p class="with-dot dot-blue">{{$t('education_progress_text7')}}</p>
            <p class="with-dot dot-blue">{{$t('education_progress_text8')}}</p>
            <p class="with-dot dot-blue">{{$t('education_progress_text9')}}</p>
      </div>
    </section>
  </q-page>
</template>


<style lang="sass" scoped>
.education
  padding: 50px 0 85px 0
  &-wrapper
    display: grid
    grid-template-columns: 1fr 1fr
    grid-gap: 30px
    align-items: center
    margin-bottom: 40px
@media (max-width: 768px)
  .education
    padding: 10px 0 60px 0
    &-wrapper
      grid-template-columns: 1fr
</style>
