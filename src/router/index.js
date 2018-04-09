import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import Dashboard from '@/views/Dashboard'
import ThreeD from '@/views/ThreeD'
import Quiz from '@/views/Quiz'
// Views - Components
import Cosplay from '@/views/components/Cosplay'
import Cases from '@/views/components/Cases'

// Views - Pages
import Department from '@/views/pages/Department'
import Vaccine from '@/views/pages/Vaccine'
import Medicine from '@/views/pages/Medicine'

import CasesManagement from '@/views/CasesManagement'
import DiseaseManagement from '@/views/DiseaseManagement'
import QuizManagement from '@/views/QuizManagement'
import UserManagement from '@/views/UserManagement'
// Views - UI Kits
Vue.use(Router)

export default new Router({
  mode: 'hash', // Demo is living in GitHub.io, so required!
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: Full,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'threeD',
          name: '3D导览',
          component: ThreeD
        },
        {
          path: 'quiz',
          name: '考试',
          component: Quiz
        },
        {
          path: 'casesManagement',
          name: '病例管理',
          component: CasesManagement
        },
        {
          path: 'diseaseManagement',
          name: '病种管理',
          component: DiseaseManagement
        },
        {
          path: 'quizManagement',
          name: '试题管理',
          component: QuizManagement
        },
        {
          path: 'userManagement',
          name: '用户管理',
          component: UserManagement
        },
        {
          path: 'study',
          redirect: '/study/cosplay',
          name: '职能学习',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'cosplay',
              name: '角色扮演',
              component: Cosplay
            },
            {
              path: 'cases',
              name: '病例学习',
              component: Cases
            }]
        },
        {
          path: '/system',
          redirect: '/system/department',
          name: '系统功能管理',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'department',
              name: '科室管理',
              component: Department
            },
            {
              path: 'vaccine',
              name: '疫苗管理',
              component: Vaccine
            },
            {
              path: 'medicine',
              name: '药品管理',
              component: Medicine
            }]
        }
      ]
    }
  ]
})
