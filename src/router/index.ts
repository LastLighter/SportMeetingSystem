import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: '/userLogin',
      children: [
        {
          path: '/sports',
          name: 'sports',
          meta: {
            menuId: 'sports',
            title: '项目管理',
          },
          component: () => import('../views/menuPage/Project.vue')
        }, {
          path: '/referees',
          name: 'referees',
          meta: {
            menuId: 'referees',
            title: '裁判管理',
          },
          component: () => import('../views/menuPage/Referee.vue')
        }, {
          path: '/users',
          name: 'users',
          meta: {
            menuId: 'users',
            title: '用户管理',
          },
          component: () => import('../views/menuPage/User.vue')
        }, {
          path: '/history',
          name: 'history',
          meta: {
            menuId: 'history',
            title: '项目管理',
          },
          component: () => import('../views/menuPage/History.vue')
        }, {
          path: '/manage',
          name: 'manage',
          meta: {
            menuId: 'manage',
            title: '管理员信息',
          },
          component: () => import('../views/menuPage/Manage.vue')
        }, {
          path: '/register',
          name: 'register',
          meta: {
            menuId: 'register',
            title: '注册管理',
          },
          component: () => import('../views/menuPage/Register.vue')
        }, {
          path: '/score',
          name: 'score',
          meta: {
            menuId: 'score',
            title: '成绩管理',
          },
          component: () => import('../views/menuPage/Score.vue')
        }, {
          path: '/college',
          name: 'college',
          meta: {
            menuId: 'college',
            title: '学院管理',
          },
          component: () => import('../views/menuPage/College.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue'),
      meta: {
        title: '管理员登录'
      }
    }, {
      path: '/userLogin',
      name: 'userLogin',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/UserLoginView.vue'),
      meta: {
        title: '用户登录'
      }
    }, {
      path: '/user',
      component: () => import('../views/UserHomeView.vue'),
      redirect:'/user/pushs',
      children: [{
        path: 'sport',
        name: 'sport',
        component: () => import('../views/userMenuPage/Sports.vue'),
        meta: {
          title: '项目报名',
          menuId: 'sport',
        }
      }, {
        path: 'historys',
        name: 'historys',
        component: () => import('../views/userMenuPage/History.vue'),
        meta: {
          title: '历史记录',
          menuId: 'historys',
        }
      }, {
        path: 'pushs',
        name: 'pushs',
        component: () => import('../views/userMenuPage/Push.vue'),
        meta: {
          title: '项目推送',
          menuId: 'pushs',
        }
      }, {
        path: 'waittings',
        name: 'waittings',
        component: () => import('../views/userMenuPage/Waitting.vue'),
        meta: {
          title: '未通过项目',
          menuId: 'waittings',
        }
      }, {
        path: 'scores',
        name: 'scores',
        component: () => import('../views/userMenuPage/Score.vue'),
        meta: {
          title: '项目成绩',
          menuId: 'scores',
        }
      }]
    },
  ]
})

router.beforeEach((to, from) => {
  document.title = to.meta.title as string || 'LightCloud'
})

export default router

//定义meta元信息的类型
declare module 'vue-router' {
  interface RouteMeta {
    // 是可选的
    menuId?: string
    title: string
  }
}

