import { boot } from 'quasar/wrappers'

import hello from 'hellojs'

export default boot(({ app }) => {
  hello.init({
    vk: process.env.VK_ID,
    facebook: process.env.FB_ID,
    google : process.env.GOOGLE_CLIENT_ID
  })
  app.config.globalProperties.$hello = hello

})







