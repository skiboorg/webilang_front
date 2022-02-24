import { api } from 'boot/axios'


const state = () => ({
  feedbacks:[],
  tariffs:[],
  teachers:[],
  rewards:[],
  user_groups:[],
  teacher_groups:[],
  notifications:[],
  current_group:{is_empty:true},
  teacher_current_group:{},
  lesson:{},
  chats:[],
  messages:[],
  current_chat:0,
  current_group_index:0,

})

const mutations = {
 updateCommonData(state,data){
    state.feedbacks = data.feedbacks
    state.tariffs = data.tariffs
    state.teachers = data.teachers
  },
  updateUserGroups(state,data){
    state.user_groups = data
  },
  updateCurrentGroupIndex(state,data){
    state.current_group_index = data
  },
  updateTeacherGroups(state,data){
    state.teacher_groups = data
  },
  updateCurrentGroup(state,data){
    state.current_group = data
  },
  updateNotifications(state,data){
    state.notifications = data
  },
  updateTeacherCurrentGroup(state,data){
    state.teacher_current_group = data
  },
  updateLesson(state,data){
    state.lesson = data
  },
  updateRewards(state,data){
    state.rewards = data
  },
  updateChats(state,data){
    state.chats = data
  },
  updateMessages(state,data){
    state.messages = data
  },
  updateCurrentChat(state,data){
    state.current_chat = data
  },

}

const actions = {

  async getCommonData ({commit}){
    const feedback = await api.get( '/api/data/fb')
    const tariff = await api.get( '/api/data/tariff')
    const teachers = await api.get( '/api/data/teachers')
    commit('updateCommonData', {feedbacks:feedback.data, tariffs:tariff.data, teachers:teachers.data})
  },
  async getNotifications ({commit}){
    const response = await api.get( '/api/user/notification')
    commit('updateNotifications', response.data)
  },
  async getUserChats ({commit}){
    const response = await api.get( '/api/chat/all')
    commit('updateChats', response.data)
  },
  async getMessages ({commit,dispatch},data){
    if (data.o_id){
      const response_get_chat_id = await api.get( `/api/chat/get_specific_chat?o_id=${data.o_id}`)
      let chat_id = response_get_chat_id.data.id
      const response_get_messages = await api.get( `/api/chat/get_chat_messages?chat_id=${chat_id}`)
      commit('updateMessages', response_get_messages.data)
      dispatch('setCurrentChat', chat_id)
    }
  },
  setCurrentChat({commit},data) {
    commit('updateCurrentChat',data)
  },
  setCurrentGroupIndex({commit},data) {
    commit('updateCurrentGroupIndex',data)
  },
  async getRewards ({commit}){
    const response = await api.get( '/api/user/rewards')
    commit('updateRewards', response.data)
  },
  async getLesson ({commit},data){
    const response = await api(`/api/lesson/get/${data}`)
    commit('updateLesson', response.data)
  },
  async getUserGroups ({commit,dispatch}){
   const response = await api.get( '/api/group/student')
    commit('updateUserGroups', response.data)
    dispatch('setUserCurrentGroup', 0)
    dispatch('setCurrentGroupIndex', 0)
   // dispatch('updateCurrentGroupIndex', 0)

  },
  async updateUserGroups ({commit,dispatch,getters}){
   const response = await api.get( '/api/group/student')
    console.log(response.data)
    commit('updateUserGroups', response.data)
    dispatch('setUserCurrentGroup', getters.current_group_index)

  },
  setUserCurrentGroup({commit,getters,dispatch},data){
    console.log('set',data)
    if (!getters.user_groups.is_empty){
     commit('updateCurrentGroup', getters.user_groups[data])
      dispatch('setCurrentGroupIndex', data)
    }

  },
  async getTeacherGroups ({commit},data){
   const response = await api.get( '/api/group/teacher')
    if (data){
      console.log('data.filter',data.filter)
      console.log(response.data.filter(x=>x.label.includes(data.filter)))
      commit('updateTeacherGroups', response.data.filter(x=>x.label.includes(data.filter)))
    }else {
      commit('updateTeacherGroups', response.data)
    }

  },
  setTeacherCurrentGroup({commit,getters},data){

    let group = getters.teacher_groups.filter(x=>x.id=== parseInt(data))

    if(group.length>0){
      commit('updateTeacherCurrentGroup', group[0])
    }

  }


}

export const getters = {
  feedbacks: (state) => state.feedbacks,
  tariffs: (state) => state.tariffs,
  teachers: (state) => state.teachers,
  user_groups: (state) => state.user_groups,
  current_group: (state) => state.current_group,
  notifications: (state) => state.notifications,
  new_notifications: (state) => state.notifications.filter(x=>x.is_new && !x.is_chat).length,
  chat_notifications: (state) => state.notifications.filter(x=>x.is_new && x.is_chat).length,
  teacher_groups: (state) => state.teacher_groups,
  teacher_current_group: (state) => state.teacher_current_group,
  lesson: (state) => state.lesson,
  rewards: (state) => state.rewards,
  chats: (state) => state.chats,
  messages: (state) => state.messages,
  current_chat: (state) => state.current_chat,
  current_group_index: (state) => state.current_group_index,
  current_group_lesson_dates:(state) =>{
    //if (!state.current_group.is_empty){
      //console.log(state.current_group)
      try{
        return  state.current_group.lessons.map(x=>x.date.replaceAll('-','/'))
      }catch (e) {
        console.log(e)
      }

    //}
  },
  student_upcoming_lessons: (state) => {
    // if (!state.current_group.is_empty){
    //   //console.log(state.current_group)
    //   return  state.current_group.lessons.filter(x=>!x.is_over)
    //}
    //console.log('state.current_group',state.current_group)
    try{
      return  state.current_group.lessons.filter(x=>!x.is_over)
    }catch (e) {
     console.log(e)
      return []
    }

  },
  student_over_lessons: (state) =>{
    try{
      return state.current_group.lessons.filter(x=>x.is_over)
    }catch (e) {
     console.log(e)
    }
    // if (!state.current_group.is_empty){
    //  return state.current_group.lessons.filter(x=>x.is_over)
    // }
  }


}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
