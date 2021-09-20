import { boot } from 'quasar/wrappers'
import {Cookies} from 'quasar'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'

export default boot(({ app,ssrContext }) => {
  let i18n
  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies
  const lang = cookies.get('lang')

  if (lang){
    console.log('lang set',lang)
    i18n = createI18n({
      locale: lang,
      messages
    })
  }else {
    cookies.set('lang','ru')
    i18n = createI18n({
      locale: 'ru',
      messages
    })
  }

  app.use(i18n)

})

//export { i18n }
