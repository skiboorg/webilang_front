<template>
  <div class="lessons-wrapper">
    <div ref="lessons-list" class="rounded-block  lessons-list">
      <div class="lessons-list-header q-mb-md">
        <p class="no-margin text-bold ">{{$t('your_firstname')}}</p>
        <p class="no-margin text-bold">{{$t('contacts_email')}}</p>
        <p class="no-margin text-bold">{{$t('lessons_group')}}</p>
        <p class="no-margin text-bold">{{$t('your_phone')}}</p>

      </div>


      <div  class="lessons-list">
        <pre>

        </pre>

        <q-scroll-area
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          style="max-width: 100%"
          :style="{'height':height - 100 + 'px'}">
          <div class="lessons-list-row"  v-for="user in users" :key="user.id">

              <p class="no-margin ">{{user.firstname}} {{user.lastname}}</p>
            <p class="no-margin  ellipsis lesson-theme">{{user.email}}</p>
             <div class="groups-list">

               <p class="no-margin link text-weight-bold cursor-pointer"
                  @click="$router.push({name:'teacher-group',params:{id:groups.find(x=>x.id===group).id}})" v-for="group in user.groups" :key="group">
                 {{groups.find(x=>x.id===group).label}} <span class="text-grey-6 text-caption">({{groups.find(x=>x.id===group).type.name}})</span>
               </p>

             </div>
             <p class="no-margin ">{{user.phone}} </p>




          </div>

        </q-scroll-area>

      </div>
    </div>

  </div>


</template>

<script>


import {mapGetters} from "vuex";

export default {
  // preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
  //
  //
  //   return store.dispatch('data/updateUserGroups')
  //
  // },
  data() {
    return {
      selectedLesson:0,
      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#09B5EC',
        width: '3px',
        opacity: 0.75
      },
      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#09B5EC',
        width: '6px',
        opacity: 0.2
      },
      height:0,
      groups:[],
      users:[]

    }
  },
  async mounted() {
    this.height = this.$refs['lessons-list'].offsetHeight
    const resp = await this.$api.get('/api/group/teacher_users')
    this.groups = resp.data

    for(let group of this.groups){

      for(let user of group.users){
        if(this.users.findIndex(x=>x.id===user.id)===-1){
          this.users.push(user)
          this.users.find(x=>x.id===user.id).groups=[]
          this.users.find(x=>x.id===user.id).groups.push(group.id)
        }else{
          !this.users.find(x=>x.id===user.id).groups.includes(group.id) ? this.users.find(x=>x.id===user.id).groups.push(group.id) : null
        }
      }
    }
  },
  methods: {


  },
  computed: {
    ...mapGetters('data', ['current_group','student_upcoming_lessons','student_over_lessons']),


  }

}
</script>
<style lang="sass" scoped>
.groups-list
  display: grid
  grid-template-columns: 1fr
  grid-gap: 5px
.lessons-wrapper
  height: calc(100vh - 30px - 30px - 30px - 51px)
  display: grid
  grid-template-columns: 1fr
  grid-gap: 24px
.lesson-theme
  max-width: 80%
.lessons-list
  //height: calc(100vh - 30px - 30px - 30px - 51px - 200px)
  &-header
    display: grid
    grid-template-columns: repeat(4,1fr)
    padding: 0 30px
  &-row
    display: grid
    grid-template-columns: repeat(4,1fr)
    padding: 15px 30px
    background: #FFFFFF
    margin-bottom: 5px
    &:nth-child(even)
      background: $grey-2
  &-divider
    height: 1px
    background: #CFCFCF
    margin: 15px 0
.lessons-material
  height: 190px
</style>
