<template>
  <div class="library-wrapper">
    <q-inner-loading style="z-index: 1000" :showing="is_loading">
      <q-spinner-box size="50px" color="primary" />
    </q-inner-loading>
    <q-no-ssr>
      <div class="flex items-center justify-end q-mb-lg">
        <p v-if="!selectedFolder" @click="items.unshift({files:[],name:'dsf',is_new:true})" class="q-mb-none text-bold q-mr-lg cursor-pointer text-grey-9">
          {{$t('teacher_add_folder')}}
          <q-icon size="16px" name="folder_open"/>
        </p>
<!--        <p v-if="selectedFolder" @click="items.unshift({files:[],name:'dsf',is_new:true})" class="q-mb-none text-bold q-mr-lg cursor-pointer text-negative">-->
        <p v-if="selectedFolder" @click="deleteFolder" class="q-mb-none text-bold q-mr-lg cursor-pointer text-negative">
          {{$t('teacher_del_folder')}}
          <q-icon size="16px" name="delete_forever"/>
        </p>

        <p class="q-mb-none text-bold cursor-pointer">
          <q-chip text-color="grey-9" color="white" class="relative-position">
            {{$t('teacher_add_file')}}
            <q-icon size="16px" name="upload_file"/>
            <q-file
              v-model="files"
              label="Pick files"
              filled
              multiple
              class="absolute"
              @update:model-value="filesUpdated"
              style="right: 0;left: 0;opacity: 0"
            />
          </q-chip>
        </p>
      </div>
    </q-no-ssr>

    <div class="rounded-block">
       <div v-if="selectedFolder" class="flex items-center q-mb-lg">
        <p class="q-mb-none cursor-pointer text-underline" @click="closeFolder">{{$t('side_bar_menu_library')}}</p>
        <svg class="q-mx-sm" width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="4" cy="4.5" r="4" fill="#FFB61C"/>
        </svg>
        <p class="q-mb-none text-weight-bold ">{{$auth.user.folders.find(x=>x.id===selectedFolder).name}}</p>

      </div>
      <div class="files-grid">
        <div :class="[
          !item.files?
           !item.is_single && !selectedFolder ?
            'dn'
                :
                  ''
                    :
                      ''
           ]" v-for="(item,index) in items" :key="index">
          <div v-if="item.files">
             <div class="file-item cursor-pointer" @click="openFolder(item.id)">
            <q-icon class="q-mr-md cursor-pointer" size="60px" name="folder" color="warning"/>
            <p v-if="!item.is_new" class="no-margin text-weight-regular ">{{item.name}}</p>
            <q-input v-else autofocus @keydown="keyDown" @blur="folderAction" dense borderless bg-color="blue-1" label-color="white" v-model="folderName"/>
          </div>
          </div>
          <div v-else >
             <div

                @click="selectedFile=item.id"
                :class="[selectedFile===item.id ? 'selected' : '']"
               class="file-item cursor-pointer relative-position">

            <q-badge v-if="selectedFile===item.id" @click="deleteFile(item.id)" rounded floating color="negative" class="q-pa-xs">
              <q-icon size="15px" name="close" color="white"/>
            </q-badge>
            <q-icon class="q-mr-md" size="40px" name="description" color="grey-7"/>
            <p class="no-margin text-weight-regular ellipsis">{{item.filename}} </p>
          </div>
          </div>



        </div>
      </div>



    </div>

  </div>


</template>

<script>


import {mapActions} from "vuex";

export default {
  // preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
  //
  //
  //   return store.dispatch('data/updateUserGroups')
  //
  // },
  data() {
    return {
      folderName:'',
      files:null,
      selectedFolder:null,
      selectedFile:0,
      is_loading:false,
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
      items:[],


    }
  },
  async mounted() {
    //this.height = this.$refs['lessons-list'].offsetHeight
    this.updateFiles()

  },
  watch:{

  },
  methods: {
    ...mapActions('auth',['getUser']),
    async closeFolder(){
      this.selectedFolder = null
      await this.updateFiles()
    },
    async deleteFolder(){
      this.is_loading = true
      await  this.$api.post('/api/lesson/delete_folder',{id:this.selectedFolder})
      this.selectedFolder = null
      await this.getUser(false)
      await this.updateFiles()
      this.is_loading = false
    },
    openFolder(id){
      this.selectedFolder = id

      console.log(this.$auth.user.folders.find(x=>x.id===id).files)
      this.items=this.$auth.user.folders.find(x=>x.id===id).files
    },
    async deleteFile(id){
      this.is_loading = true
      await  this.$api.post('/api/lesson/delete_file',{id})
      await this.getUser(false)
      await this.updateFiles()
      this.is_loading = false

    },

    async filesUpdated(val){
      this.is_loading = true
      console.log(val)
      console.log(this.files)
      let formData = new FormData()
      formData.set('folder',this.selectedFolder)
      for (let file of this.files){
        formData.append("files", file)
      }
      const response = await this.$api({
        method: 'post',
        headers:{
          'content-type': 'multipart/form-data'
        },
        url: '/api/lesson/upload_files',
        data: formData
      })
      this.files=null
      await this.getUser(false)
      await this.updateFiles()
      if (this.selectedFolder){
        this.openFolder(this.selectedFolder)
      }
      this.is_loading = false

    },
    updateFiles(){
      this.items=[]
      for(let x of this.$auth.user.folders){
        this.items.push(x)
      }
      for(let x of this.$auth.user.files){
        this.items.push(x)
      }
    },
    keyDown(e){
      if (e.keyCode===13) {
        console.log('13')
        this.folderAction()
      }
    },
    async folderAction(){
      if (this.folderName !== '') {
        this.is_loading = true
        await this.$api.post('/api/lesson/new_folder',{name:this.folderName})

        await this.getUser(false)
        await this.updateFiles()
        this.is_loading = false
      }else {
        this.items.splice(0,1)
        console.log('nnsave')

      }
    }

  },
  computed: {



  }

}
</script>
<style lang="sass" scoped>
.library-wrapper
  height: calc(100vh - 30px - 30px - 30px - 51px)
</style>
