<template>

  <q-avatar @click="modalActive=!modalActive" :size="size ? size : '40px'" class="cursor-pointer" >
    <img class="avatar-img" :src="user.user_avatar" alt="">
  </q-avatar>
  <q-dialog  v-model="modalActive">
    <q-card class="infoModal">
      <q-card-section class="row items-start q-pa-lg">

        <q-avatar @click="modalActive=!modalActive" size="150px" class="cursor-pointer" >
          <img class="avatar-img" :src="user.user_avatar" alt="">
        </q-avatar>
        <q-space />
        <q-btn size="lg" icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="q-pa-lg">
        <p v-if="$i18n.locale === 'ru'" class="text-fs-18 text-bold q-mb-none">{{user.firstname}} {{user.lastname}}</p>
        <p v-else class="text-fs-18 text-bold q-mb-none">{{user.firstname_slug}} {{user.lastname_slug}}</p>
        <p v-if="user.city" class="text-weight-light q-mb-lg">{{user.city}}</p>
        <p class="text-bold q-mb-sm">{{$t('user_description')}}</p>
        <p class="q-mb-lg">{{user.about}}</p>
        <q-btn v-if="$auth.user.id!==user.id && !$auth.user.is_teacher" :to="{name:'student-chats',query: { o_id: user.id+947623 }}" rounded no-caps class="text-weight-bold full-width q-py-sm" color="primary" :label="$t('teacher_lesson_student_message')"/>
        <q-btn v-if="$auth.user.is_teacher" :to="{name:'teacher-chats',query: { o_id: user.id+947623 }}" rounded no-caps class="text-weight-bold full-width q-py-sm" color="primary" :label="$t('teacher_lesson_student_message')"/>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>


export default {
  props:['user','size'],
  data() {
    return {
      modalActive:false,
    }
  },
  methods: {

  }

}
</script>
<style lang="sass" scoped>
.infoModal
  width: 400px
  max-width: 90vw
  background: #F7F9FF
  border-radius: 20px !important

</style>
