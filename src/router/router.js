import { createRouter, createWebHistory } from 'vue-router'
// import routes from '@/router/routes.js';
import { useAuthStore } from "@/stores/modules/auth/auth";
import { useProfileStore } from '@/stores/modules/profile/profile'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // routes,
  routes: [
    // {
    //   path: '/activate/*',
    //   component: () => import('@/views/Email/ActivationSpace.vue'),
    // },
    // {
    //   path: '/reset_password/*',
    //   component: () => import('@/views/Email/ResetPasswordSpacer.vue'),
    // },
    // {
    //   path: '/confirmation_enable_2fa/*',
    //   component: () => import('@/views/Email/2FaEnableActivationSpacer.vue'),
    // },
    {
      path: '/confirmation_delete_2fa/*',
      name: 'test',
      component: () => import('@/views/Email/2FaDisableActivationSpacer.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ViewAbout.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/ViewLogin.vue')
    },
    // {
    //   path: '/password',
    //   name: "password",
    //   component: () => import('@/views/PasswordView.vue'),
    // },
    {
      path: '/password', //возможны два случая -> восстановление и создание нового пароля create restore
      name: "password",
      component: () => import('@/views/ViewPassword.vue'),

    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('@/views/ViewRegistration.vue')
    },
    {
      path: '/multi_step-form',
      name: 'multi_step-form',
      component: () => import('@/views/MultiStepForm.vue')
    },
    {
      path: '/fill_profile',
      name: 'fill_profile',
      component: () => import('@/views/ViewFillProfile.vue')
    },
    {
      path: '/lk/nko_info',
      name: 'nko_info',
      component: () => import('@/views/ViewNkoInfo.vue')
    },
    {
      path: '/lk/requisites',
      name: 'requisites',
      component: () => import('@/views/ViewRequisites.vue')
    },
    {
      path: '/lk/security',
      name: 'security',
      component: () => import('@/views/ViewSecurity.vue')
    },
    {
      path: '/lk/settings',
      name: 'settings',
      component: () => import('@/views/ViewSettings.vue')
    },
    {
      path: '/lk/terminals',
      name: 'terminals',
      component: () => import('@/views/ViewTerminals.vue')
    },
    {
      path: '/lk/analytics',
      name: 'analytics',
      component: () => import('@/views/ViewAnalytics.vue')
    },
    {
      path: '/lk/generate_qr',
      name: 'generate_qr',
      component: () => import('@/views/ViewQrGenerate.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/ViewNotFound.vue'),
    },
    {
      path: '/test',
      component: () => import('@/views/Test.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router
router.beforeResolve(async (to, from, next) => {
  const authStore = useAuthStore();
  const profileStore = useProfileStore();
  if (!profileStore.profile?.loading) {
    await authStore.setToken()
    try {
      await profileStore.initDataFromLocalStorage()
    } catch (e) {
      console.error(e, 'router e');
    }
  }
  next()
})
