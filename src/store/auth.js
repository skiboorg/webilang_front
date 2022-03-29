import { api } from 'boot/axios'
import { Cookies } from 'quasar'
import { Notify } from 'quasar'



const state = () => ({
  user:{},
  notifications_count:[],
  loggedIn:false,
  socket:null

})

const mutations = {
  updateUser(state,data){
    state.user = data
  },
  updateUserStatus(state,data){
    state.loggedIn = data
  },
  updateSocket(state,data){
    state.socket = data
  },

}

const actions = {
  connectWS({commit,dispatch,rootState},id) {
    console.log('connecting WS',id)
    let audio = new Audio('notify.mp3');
    const socket = new WebSocket(process.env.WS+'/ws/user/online/')

    commit('updateSocket',socket)
    socket.onopen = () => {
      console.log('ws connected')
      socket.send(JSON.stringify({'user_id':id,'message':'user online'}))
      socket.onmessage = async (res) =>{
        //dispatch('fetchUserNotifications',id)
        console.log('message',JSON.parse(res.data))
        let data = JSON.parse(res.data)
        console.log('cur path',rootState.data.current_chat)

//
        if (data.event==='new_chat_mgs' && rootState.data.current_chat !== data.chat_id){
          await this.dispatch('data/getNotifications')
         const cookies = process.env.SERVER
            ? Cookies.parseSSR(ssrContext)
            : Cookies
          const lang = cookies.get('lang')
          await audio.play()
          Notify.create({
            message: lang === 'ru' ? 'Новое сообщение в чате':'A new message in the chat',
            color: 'primary',
            icon: 'chat',
            progress: true,
            position:'top-right',
            classes: 'glossy'
          })
        }
        if(data.event==='order'){
          Notify.create({
            message: data.message,
            color: 'primary',
            icon: 'chat',
            progress: true,
            position:'top-right',
            classes: 'glossy',
            actions: [
              { label: 'Открыть', color: 'white', handler: () => { this.$router.push('/profile/notifications') } }
            ]
          })
        }
      }
    }
  },

  loginUser({dispatch},data){
    api.post('/auth/token/login/',data)
      .then(response=>{
        Cookies.set('auth_token',response.data.auth_token)
        api.defaults.headers.common['Authorization'] = 'Token ' + response.data.auth_token
        dispatch('getUser',true)
      })
      .catch(function (error) {
        Notify.create(
          {
            message: Cookies.get('lang') === 'ru' ? 'Пользователь не найден':'User not found',
            position:'top-right',
            color: 'red'
          }
        )
      })

  },
  async getUser ({commit,dispatch},redirect) {
    console.log('getting user')
    try {
       const response = await api.get('/api/user/me/')
    //console.log('getUser', response.data)
    commit('updateUser', response.data)
    commit('updateUserStatus', true)
     if (!process.env.SERVER) {
          dispatch('connectWS', response.data.id)
        }
    if (redirect){
      if (response.data.is_teacher) {
        await this.$router.push({name:'teacher-groups'})
      } else {
        await this.$router.push({name:'student-index'})
      }
    }
    }catch (e) {

      console.log(e)
      api.defaults.headers.common['Authorization'] = null
      if (!process.env.SERVER) {
           Cookies.remove('auth_token')
        }

       this.$router.push('/')
    }

  },

  logoutUser({commit}){
   commit('updateUser', {})
    commit('updateUserStatus', false)
  }
}

export const getters = {
  isLoggedIn: (state) => state.loggedIn,
  user: (state) => state.user,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
