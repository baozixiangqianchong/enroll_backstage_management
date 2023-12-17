import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

import Home from '@/views/Home/index.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/recruit',
      name: 'recruit',
      component: Home,
      redirect: "/recruit/home",
      children: [
        {
          path: "home",
          name: "home",
          component: () => import("../views/Home/components/HomeView.vue")
        },
        {
          path: "record",
          name: "record",
          component: () => import("../views/Home/components/arrangeRecord.vue")
        }, {
          path: 'crew',
          name: "crew",
          component: () => import("@/views/Home/components/CrewData.vue")
        },
        {
          path: 'word',
          name: "word",
          component: () => import("../views/Home/components/RichTextBox.vue")
        },
        {
          path: 'outbox',
          name: "outbox",
          component: () => import("../views/Home/components/outBox.vue")
        },
        {
          path: 'drafts',
          name: "drafts",
          component: () => import("../views/Home/components/Drafts.vue")
        }, {
          path: 'timeplan',
          name: "timeplan",
          component: () => import("../views/Home/components/TimePlan.vue")
        },
        {
          path: 'crewplan',
          name: "crewplan",
          component: () => import("../views/Home/components/CrewPlan.vue")
        },
        {
          path: 'interview',
          name: "interview",
          component: () => import("../views/Home/components/Interview.vue")
        }
      ]
    },
    {
      path: '/',
      name: 'login',
      component: () => import("@/views/Login/index.vue")
    }
  ]
})

export default router
