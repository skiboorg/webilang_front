<template>
  <div  class="rounded-block page-wrapper">
    <div class="add-note q-mb-lg">
      <div class="">
        <p class="text-weight-bold">{{$t('notes_add')}}</p>
        <q-editor  v-model="editor" min-height="5rem" />
      </div>
      <div class="">
        <q-btn icon="add"
               unelevated
               class="text-weight-bold border-r-8 text-caption q-py-sm"
               color="positive"
               no-caps
               @click="itemAction(false,'add')"
               :label="$t('notes_add_btn')"/>
      </div>



    </div>
    <div ref="notes" class="notes">
      <q-scroll-area
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        style="max-width: 100%"
        :style="{'height':height + 'px'}">
        <div class="notes-list" >
          <div class="note-wrapper" v-for="(item,index) in notes" :key="item.id">
            <div class="note" >
              <div class="flex justify-end q-mb-sm"><p class="no-margin text-caption">{{new Date(item.created_at).toLocaleDateString()}}</p></div>
              <div class="note-text" v-html="item.text">
              </div>
              <div class="flex justify-end">
                <q-btn dense icon="edit" @click="editableItem=index,updated_text=notes[index].text" flat round/>
                <q-btn dense  icon="delete" @click="itemAction(item.id,'delete')" flat round/>
              </div>
            </div>

            <div v-if="editableItem===index" class="note-edit q-mt-sm">
               <q-editor class="q-mb-sm" v-model="updated_text" min-height="5rem" />
              <div class="flex justify-end">
                <q-btn
                  unelevated
                  class="text-weight-bold border-r-8 text-caption q-py-sm"
                  color="positive"
                  no-caps
                  @click="itemAction(item.id,'update')"
                  :label="$t('save_btn')"/>
              </div>
            </div>
          </div>



        </div>
      </q-scroll-area>
    </div>

  </div>

</template>

<script>


export default {
  data() {
    return {
      editor:'',
      updated_text:'',
      editableItem:null,
      notes:[],
      isLoading:false,
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
  async mounted() {
    this.height = this.$refs['notes'].offsetHeight
    await this.getItems()
  },
  methods: {
  async getItems(){
      const resp = await this.$api.get('/api/user/note?type=all')
      this.notes = resp.data
      this.isLoading = false
      this.editor = ''

    },
    async itemAction(id,action){
      this.isLoading = true
      await this.$api.post('/api/user/note',{
        action,
        id,
        text:this.editor,
        updated_text:this.updated_text,
      })
      this.editableItem = null
      await this.getItems()
    },



  }

}
</script>
<style lang="sass" scoped>
.page-wrapper
  height: calc(100vh - 30px - 30px - 30px - 51px)
.add-note
  display: grid
  grid-template-columns: 6fr 1fr
  align-items: flex-end
  grid-gap: 15px
.notes
  height: calc(100vh - 375px)
  overflow: hidden
  &-list
    display: grid
    grid-template-columns: 1fr
    grid-gap: 10px
.note
  background: #FFF5E0
  padding: 10px
  &-text
    p
      margin: 0
  &-edit
    background: #FFF5E0
    padding: 10px
@media (max-width: 768px)
  .add-note
    grid-template-columns: 1fr
</style>
