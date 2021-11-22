<template>
<div class="teacher-card">
          <img :src="teacher.image" alt="">
          <div class="teacher-card-text">
            <p class="teacher-card__name">{{$i18n.locale === 'ru' ? teacher.name : teacher.name_en}}</p>
            <p v-if="teacher.lang" class="teacher-card__lang">{{$i18n.locale === 'ru' ? teacher.lang : teacher.lang_en}}</p>
            <p class="teacher-card__text" v-html="$i18n.locale === 'ru' ? teacher.text : teacher.text_en"></p>
          </div>
        </div>
</template>
<script>
export default ({
  props:['teacher']
})
</script>
<style lang="sass" scoped>
.teacher-card
  display: flex
  align-items: center
  background: #F7F9FF
  border-radius: 20px
  overflow: hidden
  padding-right: 30px
  img
    width: 270px
    height: 325px
    object-fit: cover
    margin-right: 30px
  &__name
    font-size: 28px
    line-height: 36px
    font-weight: 800
    margin-bottom: 10px
  &__lang
    font-size: 16px
    font-style: italic
    font-weight: 700
    margin-bottom: 20px
@media (max-width: 768px)
  .teacher-card
    flex-direction: column
    align-items: self-start
    padding: 0
    img
      width: 100%
      height: auto
      margin-right: 0
    &-text
      padding: 10px
    &__name
      font-size: 16px
      margin-bottom: 0
    &__text
      font-size: 14px
</style>
