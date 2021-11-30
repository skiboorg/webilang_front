<template>
  <div  class="settings-wrapper">
    <div class="settings-user rounded-block q-mb-lg">
      <q-avatar size="150px">
        <img class="avatar-img" :src="$auth.user.user_avatar" alt="">
      </q-avatar>
      <div class="">
        <p class="text-weight-bold text-body1 q-mb-none">{{$auth.user.firstname}} {{$auth.user.lastname}}</p>
        <p class="text-grey-6 text-weight-light flex items-center q-mb-md">
          <svg class="q-mr-sm" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.8333 0.833984H4.16667C3.062 0.835308 2.00296 1.27472 1.22185 2.05583C0.440735 2.83695 0.00132321 3.89599 0 5.00065L0 15.0006C0.00132321 16.1053 0.440735 17.1644 1.22185 17.9455C2.00296 18.7266 3.062 19.166 4.16667 19.1673H15.8333C16.938 19.166 17.997 18.7266 18.7782 17.9455C19.5593 17.1644 19.9987 16.1053 20 15.0006V5.00065C19.9987 3.89599 19.5593 2.83695 18.7782 2.05583C17.997 1.27472 16.938 0.835308 15.8333 0.833984ZM4.16667 2.50065H15.8333C16.3323 2.50163 16.8196 2.65191 17.2325 2.93215C17.6453 3.21239 17.9649 3.60977 18.15 4.07315L11.7683 10.4556C11.2987 10.9234 10.6628 11.186 10 11.186C9.33715 11.186 8.70131 10.9234 8.23167 10.4556L1.85 4.07315C2.03512 3.60977 2.35468 3.21239 2.76754 2.93215C3.1804 2.65191 3.66768 2.50163 4.16667 2.50065ZM15.8333 17.5006H4.16667C3.50363 17.5006 2.86774 17.2373 2.3989 16.7684C1.93006 16.2996 1.66667 15.6637 1.66667 15.0006V6.25065L7.05333 11.634C7.83552 12.4142 8.89521 12.8523 10 12.8523C11.1048 12.8523 12.1645 12.4142 12.9467 11.634L18.3333 6.25065V15.0006C18.3333 15.6637 18.0699 16.2996 17.6011 16.7684C17.1323 17.2373 16.4964 17.5006 15.8333 17.5006Z" fill="#A7AAB4"/>
          </svg>
          {{$auth.user.email}}
        </p>
        <div class="q-gutter-md">
          <q-btn no-caps @click="avatarModal=true" unelevated :label="$t('select_avatar')" color="primary" class="border-r-8 q-py-sm text-weight-bold"/>

            <q-btn no-caps unelevated :label="$t('upload_avatar')" color="warning" class="border-r-8 q-py-sm text-weight-bold">
           <q-input type="file" @change="updateUser" style="position: absolute; width: 100%; opacity: 0;" v-model="avatar" />
          </q-btn>
        </div>
      </div>
    </div>
    <div class="rounded-block settings-form-wrapper">
      <div class="settings-form x2">
        <div class="settings-form__item">
          <p class="q-mb-sm text-weight-bold">{{$t('your_firstname')}}</p>
          <q-input dense outlined bg-color="white" v-model="userData.firstname"/>
        </div>
        <div class="settings-form__item">
          <p class="q-mb-sm text-weight-bold">{{$t('your_lastname')}}</p>
          <q-input dense outlined bg-color="white" v-model="userData.lastname"/>
        </div>
      </div>
      <div class="settings-form x3">
        <div class="settings-form__item">
         <p class="q-mb-sm text-weight-bold">{{$t('your_bithtday')}}</p>
          <q-input dense outlined bg-color="white" v-model="userData.birthday"/>
        </div>
        <div class="settings-form__item">
          <p class="q-mb-sm text-weight-bold">{{$t('your_phone')}}</p>
          <q-input dense outlined bg-color="white" v-model="userData.phone"/>
        </div>
         <div class="settings-form__item">
          <p class="q-mb-sm text-weight-bold">{{$t('your_email')}}</p>
          <q-input disable dense outlined bg-color="white" v-model="userData.email"/>
        </div>
      </div>
      <div class="settings-form x2">
        <div class="settings-form__item">
          <p class="q-mb-sm text-weight-bold">{{$t('your_country')}}</p>
          <q-input dense outlined bg-color="white" v-model="userData.country"/>
        </div>
        <div class="settings-form__item">
          <p class="q-mb-sm text-weight-bold">{{$t('your_city')}}</p>
          <q-input dense outlined bg-color="white" v-model="userData.city"/>
        </div>
      </div>
    <div class="settings-form x1 q-mb-lg">
        <div class="settings-form__item">
         <p class="q-mb-sm text-weight-bold">{{$t('your_info')}}</p>
          <q-input dense type="textarea" outlined bg-color="white" v-model="userData.about"/>
        </div>

      </div>
      <div class="text-right">

        <q-btn @click="updateUser" :loading="is_loading" no-caps :label="$t('save_changes')" color="primary" class="border-r-8 q-py-sm text-weight-bold"/>
      </div>

    </div>

  </div>
 <q-dialog
      v-model="avatarModal"
      full-height
      @before-hide="updateUser"
    >
      <q-card class="column rounded-block full-height" style="width: 850px;max-width: 90vw">
      <q-card-section class="row items-center no-padding q-mb-lg">
          <div class="text-h6 text-weight-bolder">{{$t('choose_avatar')}}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="no-padding" ref="avatars">
          <div class="avatars-wrapper">
            <q-avatar class="cursor-pointer avatar" @click="selected_avatar=item.id" v-close-popup :size="$q.screen.lt.md ? '80px' : '100px'" v-for="(item,index) in avatars" :key="index">
              <img class="avatar-img" :src="item.image" alt="">
            </q-avatar>
          </div>


        </q-card-section>


      </q-card>
    </q-dialog>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      avatars:[],
      avatar:null,
      is_loading:false,
      avatarModal:false,
      selected_avatar:null,
      userData:{
        firstname:this.$auth.user.firstname,
        lastname:this.$auth.user.lastname,
        birthday:this.$auth.user.birthday,
        phone:this.$auth.user.phone,
        email:this.$auth.user.email,
        country:this.$auth.user.country,
        city:this.$auth.user.city,
        about:this.$auth.user.about,
      }
    }
  },
  async mounted() {
    const resp = await this.$api.get('/api/user/avatars')
    this.avatars = resp.data
  },
  methods: {
    ...mapActions('auth',['getUser']),
    async updateUser(){
      this.is_loading = !this.is_loading
      let formData = new FormData()
      formData.set('userData', JSON.stringify(this.userData))
      if (this.avatar){
        formData.set('avatar',this.avatar[0])
      }
      if (this.selected_avatar){
        formData.set('selected_avatar',this.selected_avatar)
      }
      const response = await this.$api({
        method: 'post',
        headers:{
          'content-type': 'multipart/form-data'
        },
        url: '/api/user/update',
        data: formData
      })
       this.$q.notify({
          message: this.$t('data_saved'),
          position: this.$q.screen.lt.sm ? 'bottom' : 'bottom-right',
          color:'positive',
          icon: 'announcement'
        })
      this.is_loading = !this.is_loading
      await this.getUser(false)
    },
  }

}
</script>
<style lang="sass" scoped>
.settings
  &-wrapper
    height: calc(100vh - 30px - 30px - 30px - 51px)
  &-user
    display: grid
    grid-template-columns: 1fr 8fr
  &-form
    display: grid
    grid-gap: 15px
    &-wrapper
      display: grid
      grid-template-columns: 1fr
      grid-gap: 30px
    &.x1
      grid-template-columns: 1fr
    &.x2
      grid-template-columns: 1fr 1fr
    &.x3
      grid-template-columns: 1fr 1fr 1fr
.avatars-wrapper
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(100px,1fr))
  grid-gap: 15px
.avatar
  &:hover
    box-shadow: 0 0 10px 1px $grey-6
@media (max-width: 768px)
  .avatars-wrapper
    grid-template-columns: repeat(auto-fill, minmax(70px,1fr))

</style>
