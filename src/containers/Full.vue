<template>
  <div class="app">
    <AppHeader/>
    <div class="app-body">
      <Sidebar :navItems="nav"/>
      <main class="main">
        <breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <AppAside/>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
import nav from '../_nav'
import { Header as AppHeader, Sidebar, Aside as AppAside, Footer as AppFooter, Breadcrumb } from '../components/'

export default {
  name: 'full',
  components: {
    AppHeader,
    Sidebar,
    AppAside,
    AppFooter,
    Breadcrumb
  },
  data () {
    return {
      nav: nav.items
    }
  },
  mounted: function () {
    var that = this
    if (this.$route.query.index === 0) {
      that.nav.items = [
        {
          name: 'Dashboard',
          url: '/dashboard',
          icon: 'icon-speedometer',
          badge: {
            variant: 'primary',
            text: 'NEW'
          }
        }
      ]
      that.nav.push(
        {
          title: true,
          name: '后台系统',
          wrapper: {
            element: 'span',
            attributes: {}
          },
          class: ''
        },
        {
          name: '病例管理',
          url: '/casesManagement',
          icon: 'icon-calculator'
        },
        {
          name: '病种管理',
          url: '/diseaseManagement',
          icon: 'icon-calculator'
        },
        {
          name: '试题管理',
          url: '/quizManagement',
          icon: 'icon-calculator'
        },
        {
          name: '用户管理',
          url: '/userManagement',
          icon: 'icon-calculator'
        },
        {
          name: '系统功能管理',
          url: '/system',
          icon: 'icon-star',
          children: [
            {
              name: '科室管理',
              url: '/system/department',
              icon: 'icon-star'
            },
            {
              name: '疫苗管理',
              url: '/system/vaccine',
              icon: 'icon-star'
            },
            {
              name: '药品管理',
              url: '/system/medicine',
              icon: 'icon-star'
            }
          ]
        }
      )
    }
    if (this.$route.query.index > 0) {
      that.nav.items = [
        {
          name: 'Dashboard',
          url: '/dashboard',
          icon: 'icon-speedometer',
          badge: {
            variant: 'primary',
            text: 'NEW'
          }
        }
      ]
      that.nav.push(
        {
          title: true,
          name: '前台系统',
          wrapper: {
            element: 'span',
            attributes: {}
          },
          class: ''
        },
        {
          name: '职能学习',
          url: '/study',
          icon: 'icon-puzzle',
          children: [
            {
              name: '角色扮演',
              url: '/study/cosplay',
              icon: 'icon-puzzle'
            },
            {
              name: '病例学习',
              url: '/study/cases',
              icon: 'icon-puzzle'
            }
          ]
        },
        {
          name: '3D导览',
          url: '/threeD',
          icon: 'icon-calculator',
          badge: {
            variant: 'danger',
            text: 'NEW'
          }
        },
        {
          name: '考试',
          url: '/quiz',
          icon: 'icon-calculator'
        },
        {
          divider: true
        }
      )
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched
    }
  }
  // ,
  // methods: {
  //   clean(nav) {
  //   }
  // }
}
</script>
