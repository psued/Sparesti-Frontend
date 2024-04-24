import { createRouter, createWebHistory } from "vue-router";
import AuthenticationView from "@/views/AuthenticationView.vue";
import LoginForm from "@/components/forms/LoginForm.vue";
import SignUpForm from "@/components/forms/SignUpForm.vue";
import CompleteAccountForm from "@/components/forms/CompleteAccountForm.vue";
import LoadingView from "@/views/LoadingView.vue";
import BudgetPageView from "@/views/BudgetPageView.vue";
import BudgetDetails from "@/views/BudgetDetails.vue";
import ProfileView from '@/views/ProfileView.vue'
import SettingsView from '@/views/SettingsView.vue'
import BadgesView from "@/views/BadgesView.vue";
import FrontPageView from "@/views/FrontPageView.vue";
import QuestionnaireView from "@/views/QuestionnaireView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "frontpage",
      component: FrontPageView,
    },
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
      path: "/setup",
      name: "setup",
      component: QuestionnaireView,
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
    path: '/badges',
    name: 'badges',
    component: BadgesView
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
