import {Cookies} from 'quasar'
import api from 'axios'



export default async ({ app, router, Vue, store, ssrContext }) => {
  console.info('boot: init entered')

  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies

  let token = cookies.get('auth_token')
  app.config.globalProperties.$cookies = cookies

  if (token) {
   await store.dispatch('auth/getUser')
  }
  await store.dispatch('data/getCommonData')
  app.config.globalProperties.$auth = store.state.auth

  app.config.globalProperties.$filters = {
  normalizeTime(date,time,offset) {
    // return `${value.split(':')[0]}:${value.split(':')[1]}`
    console.log(`${date}T${time}${offset}`)
  return new Date(`${date}T${time}${offset}`).toLocaleTimeString()
  }

}

  console.info('boot: init exited')
}


