import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AuthenticationView from "@/views/AuthenticationView.vue";
import LoginForm from "@/components/forms/LoginForm.vue";
import SignUpForm from "@/components/forms/SignUpForm.vue";
import CompleteAccountForm from "@/components/forms/CompleteAccountForm.vue";
import LoadingView from "@/views/LoadingView.vue";
import BudgetPageView from "@/views/BudgetPageView.vue";
import BudgetDetails from "@/views/BudgetDetails.vue";
import ProfileView from '@/views/ProfileView.vue'
import SettingsView from '@/views/SettingsView.vue'
import QuestionnaireView from "@/views/QuestionnaireView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    },
    {
      path: "/questionnaire",
      name: "questionnaire",
      component: QuestionnaireView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/budgetpage",
      name: "budget",
      component: BudgetPageView,
    },
    {
      path: "/details",
      name: "budget-details",
      component: BudgetDetails,
    },
    {
      path: "/authentication",
      name: "authentication",
      component: AuthenticationView,
      children: [
        {
          path: "",
          name: "login",
          component: LoginForm,
        },
        {
          path: "signup",
          name: "signup",
          component: SignUpForm,
        },
        {
          path: "complete-account",
          name: "complete-account",
          component: CompleteAccountForm,
        },
      ],
    },
    {
      path: "/token",
      name: "token",
      component: LoadingView,
    },
  ],
});

export default router;
