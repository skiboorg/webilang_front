
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name:'front-index', component: () => import('pages/FrontPages/Index.vue') },
      { path: 'kids',name:'front-kids', component: () => import('pages/FrontPages/Kids.vue') },
      { path: 'adult',name:'front-adult', component: () => import('pages/FrontPages/Adult.vue') },
      { path: 'exams',name:'front-exams', component: () => import('pages/FrontPages/Exam.vue') },
      { path: 'tariffs',name:'front-tariff', component: () => import('pages/FrontPages/Tarif.vue') },
      { path: 'education',name:'front-education', component: () => import('pages/FrontPages/EduProcess.vue') },
      { path: 'teachers',name:'front-teachers', component: () => import('pages/FrontPages/Teachers.vue') },
      { path: 'about',name:'front-about', component: () => import('pages/FrontPages/About.vue') },
      { path: 'contacts',name:'front-contacts', component: () => import('pages/FrontPages/Contacts.vue') },
      { path: 'signin',name:'front-signin', component: () => import('pages/Auth/SignIn.vue') },
      { path: 'signup',name:'front-signup', component: () => import('pages/Auth/SignUp.vue') },
    ]
  },
  {
    path: '/student',
    component: () => import('layouts/StudentLayout.vue'),
    children: [
      {path: '', name: 'student-index',meta:{title:'side_bar_menu_home'}, component: () => import('pages/Student/Main.vue')},
      {path: 'chats', name: 'student-chats',meta:{title:'side_bar_menu_chat'}, component: () => import('pages/Student/Chat.vue')},
      {path: 'dictionary', name: 'student-dictionary',meta:{title:'side_bar_menu_dict'}, component: () => import('pages/Student/Dictionary.vue')},
      {path: 'notes', name: 'student-notes',meta:{title:'side_bar_menu_note'}, component: () => import('pages/Student/Note.vue')},
      {path: 'notifications', name: 'student-notifications',meta:{title:'side_bar_menu_notify'}, component: () => import('pages/Student/Notificaton.vue')},
      {path: 'lessons', name: 'student-lessons',meta:{title:'side_bar_menu_lessons'}, component: () => import('pages/Student/Lesson.vue')},
      {path: 'payment', name: 'student-payment',meta:{title:'side_bar_menu_payment'}, component: () => import('pages/Student/Tariff.vue')},
      {path: 'settings', name: 'student-settings',meta:{title:'side_bar_menu_settings'}, component: () => import('pages/Student/Settings.vue')},
    ]
  },
  {
    path: '/teacher',
    component: () => import('layouts/TeacherLayout.vue'),
    children: [
      {path: '', name: 'teacher-groups',meta:{title:'side_bar_menu_groups'}, component: () => import('pages/Teacher/Groups.vue')},
      {path: 'group/:id', name: 'teacher-group',meta:{title:'side_bar_menu_groups'}, component: () => import('pages/Teacher/Group.vue')},
      {path: 'chats', name: 'teacher-chats',meta:{title:'side_bar_menu_chat'}, component: () => import('pages/Teacher/Chats.vue')},
      {path: 'notes', name: 'teacher-notes',meta:{title:'side_bar_menu_note'}, component: () => import('pages/Teacher/Notes.vue')},
      {path: 'notifications', name: 'teacher-notifications',meta:{title:'side_bar_menu_notify'}, component: () => import('pages/Teacher/Notifications.vue')},
      {path: 'lessons', name: 'teacher-lessons',meta:{title:'side_bar_menu_lessons'}, component: () => import('pages/Teacher/Lessons.vue')},
      {path: 'lesson/:id', name: 'teacher-lesson',meta:{title:'side_bar_menu_lesson'}, component: () => import('pages/Teacher/Lesson.vue')},
      {path: 'students', name: 'teacher-students',meta:{title:'side_bar_menu_students'}, component: () => import('pages/Teacher/Students.vue')},
      {path: 'library', name: 'teacher-library',meta:{title:'side_bar_menu_library'}, component: () => import('pages/Teacher/Library.vue')},
      {path: 'settings', name: 'teacher-settings',meta:{title:'side_bar_menu_settings'}, component: () => import('pages/Teacher/Settings.vue')},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
