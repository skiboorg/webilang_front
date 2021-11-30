<template>
  <div class="page-wrapper">
     <div class="rounded-block lessons-material">
      <q-input :dense="$q.screen.lt.md" outlined bg-color="white" :label="$t('dictionary_search')"/>
    </div>
    <div ref="group-list" class="rounded-block  group-list">
      <div class="gt-sm group-list-header q-mb-md">
        <p class="no-margin text-bold gt-sm">{{$t('teacher_group_name')}}</p>
        <p class="no-margin text-bold gt-sm">{{$t('teacher_group_type')}}</p>
        <p class="no-margin text-bold gt-sm">{{$t('teacher_group_level')}}</p>
      </div>
      <div  class="group-list">
        <q-scroll-area
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          style="max-width: 100%"
          :style="{'height':height - 100 + 'px'}">
          <div class="group-list-row" v-for="group in teacher_groups" :key="group.id">
            <div class="">
             <p class="no-margin text-bold lt-md">{{$t('teacher_group_name')}}</p>
              <p @click="$router.push({name:'teacher-group',params:{id:group.id}})" class="no-margin  link text-weight-bold cursor-pointer">{{group.label}}</p>
            </div>
            <div class="">
               <p class="no-margin text-bold lt-md">{{$t('teacher_group_type')}}</p>
              <p class="no-margin ">{{group.type.name}}</p>
            </div>
            <div class="">
              <p class="no-margin text-bold lt-md">{{$t('teacher_group_level')}}</p>
              <p class="no-margin ">{{group.level.name}}</p>
            </div>

          </div>
        </q-scroll-area>
      </div>
    </div>
  </div>
</template>
<script>


import {mapGetters} from "vuex";

export default {
  async preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {

    return  await store.dispatch('data/getTeacherGroups')

  },
  data() {
    return {
      search:null,

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

    }
  },
  mounted() {
    this.height = this.$refs['group-list'].offsetHeight
  },
  methods: {

  },
   computed:{
    ...mapGetters('data',['teacher_groups'])
   }

}
</script>
<style lang="sass" scoped>
.page-wrapper
  height: calc(100vh - 30px - 30px - 30px - 51px)
  display: grid
  grid-template-columns: 1fr
  grid-gap: 24px

.group-list
  height: calc(100vh - 30px - 30px - 30px - 51px - 200px)
  &-header
    display: grid
    grid-template-columns: repeat(3,1fr)
    padding: 0 30px
  &-row
    display: grid
    grid-template-columns: repeat(3,1fr)
    padding: 15px 30px
    background: #FFFFFF
    margin-bottom: 5px
    &:nth-child(even)
      background: $grey-2
  &-divider
    height: 1px
    background: #CFCFCF
    margin: 15px 0
@media (max-width: 1024px)
  .page-wrapper
    height: unset
  .group-list
    &-row
      grid-template-columns: 1fr
      padding: 30px
      background: #F6F9FF
      border-radius: 20px
      grid-gap: 20px
</style>
