import { createRouter, createWebHistory } from 'vue-router'
// import routes from '@/router/routes.js';

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
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('@/views/RegistrationView.vue')
    },
    {
      path: '/multi_step-form',
      name: 'multi_step-form',
      component: () => import('@/views/MultiStepForm.vue')
    },
    {
      path: '/fill_profile',
      name: 'fill_profile',
      component: () => import('@/views/FillProfile.vue')
    },
    {
      path: '/lk/nko_info',
      name: 'nko_info',
      component: () => import('@/views/NkoInfo.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router
