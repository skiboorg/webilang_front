<template>
  <q-page class="flex items-center justify-center">

    <div class="sign-form q-py-lg">
      <div class="flex items-center justify-between q-mb-lg">
        <p class="no-margin text-fs-18 text-bold">{{$t('signup_label')}}</p>
        <p class="no-margin text-fs-18">{{$t('or')}} <router-link class="link text-lowercase" :to="{name:'front-signin'}">{{$t('signin_link')}}</router-link></p>
      </div>
      <q-form @submit="formSubmit" class="full-width q-gutter-sd q-mb-lg">
        <q-input
          :dense="!$q.screen.gt.sm"
          filled
          v-model="userData.firstname"
          :label="$t('your_firstname')"
          lazy-rules
          :rules="[val => val !== null && val !== '' || $t('field_is_requred') ]"/>
        <q-input
          :dense="!$q.screen.gt.sm"
          filled
          v-model="userData.lastname"
          :label="$t('your_lastname')"
          lazy-rules
          :rules="[val => val !== null && val !== '' || $t('field_is_requred') ]"/>


        <q-input
          filled
          :dense="!$q.screen.gt.sm"
          v-model="userData.email"
          :label="$t('your_email')"
          lazy-rules
          :rules="[ val => val && val.length > 0 || $t('field_is_requred'),
            val => email_re.test(String(val)) || $t('email_is_bad')]"/>
        <q-input
          :dense="!$q.screen.gt.sm"
          filled
          :type="isPwd ? 'password' : 'text'"
          v-model="userData.password1"
          :label="$t('your_password1')"
          lazy-rules
          :rules="[val => val !== null && val !== '' || $t('field_is_requred') ]">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"/>
          </template>
        </q-input>
        <q-input
          :dense="!$q.screen.gt.sm"
          filled
          :type="isPwd ? 'password' : 'text'"
          v-model="userData.password2"
          :label="$t('your_password2')"
          lazy-rules
          :rules="[val => val !== null && val !== '' || $t('field_is_requred') ,
           val => val===userData.password1 || $t('passwords_not_match') ]">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"/>
          </template>
        </q-input>

        <q-checkbox class="q-mb-md text-caption text-weight-thin" v-model="agree" :label="$t('agree_text')" />

        <q-btn :disable="!agree" :loading="is_loading" :label="$t('signup_label')"  no-caps type="submit"  color="primary" class="full-width  q-py-md text-bold"/>

      </q-form>

      <div class="divider q-mb-lg"><p class="no-margin text-fs-18">{{$t('or')}}</p></div>
      <div class="social-button google">
        <div class="social-button__icon">
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.6698 0.52536C9.41338 0.647848 7.36936 1.31196 5.53587 2.5177C3.78084 3.67369 2.35118 5.25263 1.38084 7.10718C-0.538774 10.7799 -0.452649 15.2545 1.61242 18.8488C3.42678 22.0105 6.5885 24.2287 10.1292 24.8278C10.9215 24.9617 11.3847 25 12.2631 25C12.9789 25 13.2335 24.9866 13.7942 24.9234C16.2172 24.6498 18.2689 23.8019 20.0143 22.355C20.3014 22.1158 21.0268 21.3904 21.2698 21.0957C22.8316 19.2144 23.7062 16.9847 23.9512 14.2555C23.9914 13.7904 23.9971 12.445 23.9607 12.0163C23.9148 11.4957 23.8517 10.9828 23.7923 10.6402C23.777 10.5522 23.7655 10.4775 23.7655 10.4737C23.7655 10.4699 21.1741 10.466 18.0048 10.466H12.244V12.8584V15.2507H15.5741C17.8191 15.2507 18.9043 15.2565 18.9043 15.2699C18.9043 15.3158 18.8182 15.6813 18.7588 15.8823C18.4718 16.8775 17.8555 17.8536 17.088 18.5368C16.1904 19.3368 14.9713 19.89 13.622 20.11C12.7588 20.2498 11.7464 20.2517 10.9847 20.112C8.92917 19.733 7.08228 18.4335 5.97989 16.5904C5.72151 16.1579 5.41338 15.4842 5.31769 15.1397C5.29855 15.0689 5.2507 14.9043 5.21242 14.7722C5.01721 14.1024 4.94257 13.5455 4.94257 12.7531C4.94257 12.1923 4.95596 12.022 5.0306 11.5665C5.24879 10.2191 5.84017 8.95024 6.74352 7.89187C7.9818 6.43732 9.66218 5.54354 11.5263 5.34641C11.8402 5.31388 12.6421 5.30813 12.9349 5.33684C14.4775 5.48995 15.7349 6.04115 16.8909 7.07081L16.9923 7.16268L18.4411 5.7177C19.2373 4.92344 19.9435 4.22297 20.0086 4.16364C20.0737 4.10431 20.1923 3.97608 20.2727 3.88038L20.4182 3.70813L20.355 3.63349C20.3206 3.59139 20.267 3.52632 20.2363 3.48995C20.2057 3.45168 20.1426 3.39809 20.0928 3.37129C20.045 3.34258 19.9148 3.24498 19.8038 3.15502C18.5253 2.10048 16.9674 1.3177 15.3119 0.898565C14.6268 0.726316 14.0871 0.634451 13.3253 0.559809C13.0536 0.534929 11.9378 0.510048 11.6698 0.52536Z" fill="white"/>
          </svg>
        </div>
        <p class="no-margin" v-html="$t('google_reg')"></p>
      </div>
<!--      <div class="social-button apple">-->
<!--        <div class="social-button__icon">-->
<!--          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--            <g clip-path="url(#clip0)">-->
<!--              <path d="M16.4989 0C15.2194 0.0884995 13.7239 0.907495 12.8525 1.97399C12.0575 2.94148 11.4035 4.37847 11.6585 5.77497C13.0564 5.81847 14.5009 4.97997 15.3379 3.89548C16.1209 2.88598 16.7134 1.45799 16.4989 0Z" fill="white"/>-->
<!--              <path d="M21.5555 8.05167C20.327 6.51118 18.6005 5.61719 16.97 5.61719C14.8175 5.61719 13.907 6.64768 12.4116 6.64768C10.8696 6.64768 9.69807 5.62019 7.83658 5.62019C6.0081 5.62019 4.06111 6.73768 2.82661 8.64867C1.09112 11.3397 1.38812 16.3991 4.20061 20.7086C5.2071 22.2506 6.55109 23.9846 8.30908 23.9996C9.87357 24.0146 10.3146 22.9961 12.4341 22.9856C14.5535 22.9736 14.9555 24.0131 16.517 23.9966C18.2765 23.9831 19.694 22.0616 20.7005 20.5196C21.422 19.4141 21.6905 18.8576 22.25 17.6096C18.1805 16.0601 17.528 10.2732 21.5555 8.05167Z" fill="white"/>-->
<!--            </g>-->
<!--            <defs>-->
<!--              <clipPath id="clip0">-->
<!--                <rect width="24" height="24" fill="white"/>-->
<!--              </clipPath>-->
<!--            </defs>-->
<!--          </svg>-->

<!--        </div>-->
<!--        <p class="no-margin" v-html="$t('apple_reg')"></p>-->
<!--      </div>-->
      <div class="social-button facebook">
        <div class="social-button__icon">
          <svg width="24" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.99707 3.985H12.1881V0.169C11.8101 0.117 10.5101 0 8.99607 0C5.83707 0 3.67307 1.987 3.67307 5.639V9H0.187073V13.266H3.67307V24H7.94707V13.267H11.2921L11.8231 9.001H7.94607V6.062C7.94707 4.829 8.27907 3.985 9.99707 3.985Z" fill="white"/>
          </svg>

        </div>
        <p class="no-margin" v-html="$t('facebook_reg')"></p>
      </div>
      <div class="social-button vk" @click="vkRegister">
        <div class="social-button__icon">
          <svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.915 8.028C19.527 7.538 19.638 7.32 19.915 6.882C19.92 6.877 23.123 2.451 23.453 0.95L23.455 0.949C23.619 0.402 23.455 0 22.662 0H20.038C19.37 0 19.062 0.345 18.897 0.731C18.897 0.731 17.561 3.929 15.671 6.002C15.061 6.601 14.779 6.793 14.446 6.793C14.282 6.793 14.027 6.601 14.027 6.054V0.949C14.027 0.293 13.84 0 13.287 0H9.161C8.742 0 8.493 0.306 8.493 0.591C8.493 1.213 9.438 1.356 9.536 3.106V6.903C9.536 7.735 9.385 7.888 9.05 7.888C8.158 7.888 5.993 4.677 4.71 1.002C4.451 0.289 4.198 0.000999928 3.525 0.000999928H0.9C0.151 0.000999928 0 0.346 0 0.732C0 1.414 0.892 4.805 4.148 9.285C6.318 12.343 9.374 14 12.154 14C13.825 14 14.029 13.632 14.029 12.999C14.029 10.077 13.878 9.801 14.715 9.801C15.103 9.801 15.771 9.993 17.331 11.468C19.114 13.217 19.407 14 20.405 14H23.029C23.777 14 24.156 13.632 23.938 12.906C23.439 11.379 20.067 8.238 19.915 8.028Z" fill="white"/>
          </svg>

        </div>
        <p class="no-margin" v-html="$t('vk_reg')"></p>
      </div>
    </div>
  </q-page>
</template>
<script>


export default {

  data () {
    return {
      is_loading:false,
      isPwd:true,
      agree:false,

      userData:{
        firstname:null,
        lastname:null,
        email:null,
        password1:null,
        password2:null,
      },
      userRegData:{
        firstname:null,
        lastname:null,
        email:null,
        password2:null,
        avatar:null,
        is_social_register:false,

      },
      email_re:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

    }
  },
  methods:{
    async vkRegister(){
      //hello.all.js добавить p.query.v = '5.131';
      try{
        const resp = await this.$hello('vk').login({ scope: 'email' })
        this.userRegData.email = resp.authResponse.email
        this.userRegData.password = btoa(resp.authResponse.client_id+resp.authResponse.user_id)
        const resp1 = await this.$hello('vk').api('me')
        this.userRegData.firstname = resp1.first_name
        this.userRegData.lastname = resp1.last_name
        this.userRegData.avatar = resp1.picture
        this.userRegData.is_social_register = true
        await this.completeRegistration()
      }catch (e) {
        console.log(e)
      }

    },
    async formSubmit(){
      this.userRegData.firstname = this.userData.firstname
      this.userRegData.lastname = this.userData.lastname
      this.userRegData.email = this.userData.email
      this.userRegData.password = this.userData.password2
      await this.completeRegistration()
    },
    async completeRegistration(){
      this.is_loading = true

      try{
        await this.$api.post('/auth/users/', {
          firstname:this.userRegData.firstname,
          lastname:this.userRegData.lastname,
          email:this.userRegData.email,
          password:this.userRegData.password,
          social_avatar:this.userRegData.avatar,
          is_social_register:this.userRegData.is_social_register,
        })
        this.$q.notify({
          message: this.$t('account_created'),
          position: this.$q.screen.lt.sm ? 'bottom' : 'bottom-right',
          color:'positive',
          icon: 'announcement'
        })
        this.is_loading=false
        await this.$router.push({name:'front-signin'})
      }catch (e) {
        this.$q.notify({
          message: this.$t('reg_error'),
          position: this.$q.screen.lt.sm ? 'bottom' : 'bottom-right',
          color:'red',
          icon: 'announcement'
        })
      }
      this.is_loading = false
    },
  }

}
</script>

<style lang="sass" scoped>
.q-checkbox
  align-items: flex-start !important
  line-height: 14px
</style>
