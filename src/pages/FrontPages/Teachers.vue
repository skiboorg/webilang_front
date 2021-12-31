<template>
  <q-page>
    <section class="teachers">
      <div class="container">
        <h1 class="teachers-title" v-html="$t('teachers_title')"></h1>
        <TeacherCard class="q-mb-lg" :teacher="item" v-for="item in teachers" :key="item.id" />


      </div>
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
      slide:1
    }
  },
  computed:{
    ...mapGetters('data',['teachers'])
  }

}
</script>

<style lang="sass" scoped>
.teachers
  margin-bottom: 50px
  &-title
    text-align: center
    margin-top: 57px
    margin-bottom: 80px
    font-weight: 700
    font-size: 34px
    line-height: 41px
    span
      color: $primary
      display: block
      font-size: 44px
      line-height: 53px



</style>
