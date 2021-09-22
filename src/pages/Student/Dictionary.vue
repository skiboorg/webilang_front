<template>
  <div class="rounded-block dictionary-wrapper">
    <div class="add-word q-mb-lg">
      <div class="">
        <p class="q-mb-sm text-weight-bold">{{$t('dictionary_word')}}</p>
        <q-input dense bg-color="white" clearable filled v-model="new_word"  />
      </div>
      <div class="">
        <p class="q-mb-sm text-weight-bold">{{$t('dictionary_translate')}}</p>
        <q-input dense bg-color="white" clearable filled v-model="new_word_translate"  />
      </div>
      <q-btn icon="add"
             unelevated
             class="text-weight-bold border-r-8 text-caption q-py-sm"
             color="positive"
             :loading="isLoading"
             :disable="!new_word || !new_word_translate"
             no-caps
             @click="itemAction(false,'add')"
             :label="$t('dictionary_add')"/>
    </div>
    <div class="q-mb-lg">
      <p class="q-mb-sm text-weight-bold">{{$t('dictionary_search')}}</p>
        <q-input dense bg-color="white" clearable filled v-model="search_word"  />
    </div>
    <div ref="words-list" class="words-list">
      <div class="words-list-top">
        <p class="no-margin text-white text-weight-bold">{{$t('dictionary_word')}}</p>
        <p class="no-margin text-white text-weight-bold">{{$t('dictionary_translate')}}</p>
      </div>
      <q-scroll-area
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          style="max-width: 100%"
          :style="{'height':height -51  + 'px'}">
        <div class="words-list-row" v-for="item in filter_dictionary.length>0 ? filter_dictionary : dictionary" :key="item.id">
          <div class="words-list-row__left">
           <div style="max-width: 80%">
             <p class="no-margin text-weight-bold ellipsis"> {{item.word}}</p>
           </div>
          </div>

          <div class="words-list-row__right flex items-center justify-between">


            <div style="max-width: 80%">
             <p class="no-margin text-weight-bold ellipsis"> {{item.translate}}</p>
           </div>

            <div class="words-list-row__buttons ">
              <q-btn icon="edit"
                     @click="editItem.id=item.id, editItem.word=item.word, editItem.translate=item.translate"
                     :loading="isLoading" flat round>
                <q-popup-edit v-model="editItem" ref="updateModal">
                  <div class="q-mb-md">
                    <q-input v-model="editItem.word" dense :hint="$t('dictionary_word')" autofocus />
                  <q-input v-model="editItem.translate" dense :hint="$t('dictionary_translate')" />
                  </div>

                  <q-btn color="positive" class="full-width" @click="itemAction(editItem.id,'update')" dense :label="$t('save_btn')"/>
                </q-popup-edit>
              </q-btn>
              <q-btn  icon="delete" :loading="isLoading" @click="itemAction(item.id,'delete')" flat round/>
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
      search_word:'',
      new_word:'',
      new_word_translate:'',
      editItem:{
        id:'',
        word:'',
        translate:''
      },
      isLoading:false,
      dictionary:[],
      filter_dictionary:[],
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
    this.height = this.$refs['words-list'].offsetHeight
    await this.getItems()
  },
  watch:{
    search_word(val){
      if (val){
        this.filter_dictionary=this.dictionary.filter(x=>x.word.includes(this.search_word) || x.translate.includes(this.search_word))
      }else {
        this.filter_dictionary=[]
      }

    }
  },
  methods: {
    async getItems(){
      const resp = await this.$api.get('/api/user/dictionary?type=all')
      this.dictionary = resp.data
      this.filter_dictionary = []
      this.isLoading = false
      this.new_word = ''
      this.search_word = ''
      this.new_word_translate = ''
    },
    async itemAction(id,action){
      this.isLoading = true
      await this.$api.post('/api/user/dictionary',{
        action,
        id,
        word:this.new_word,
        update_word:this.editItem.word,
        translate:this.new_word_translate,
        update_translate:this.editItem.translate,
      })
      action === 'update' ? this.$refs.updateModal.hide() : null
      await this.getItems()
    },

  }

}
</script>
<style lang="sass" scoped>
.dictionary-wrapper
  height: calc(100vh - 30px - 30px - 30px - 51px)
.add-word
  display: grid
  grid-template-columns: 2fr 2fr 1fr
  grid-gap: 15px
  align-items: flex-end
.words-list
  height: calc(100vh - 370px)
  &-top
    background: $primary
    border-radius: 10px 10px 0 0
    padding: 15px
    display: grid
    grid-template-columns: 1fr 1fr
  &-row
    display: grid
    grid-template-columns: 1fr 1fr
    padding: 10px 15px
    align-items: center
    &:nth-child(even)
      background: $grey-2
    &__right
      &:hover > div
        opacity: 1
    &__buttons
      transition: all .2s linear
      opacity: 0
@media (max-width: 768px)
  .add-word
    grid-template-columns: 1fr
  .words-list-row
    align-items: flex-start
</style>
