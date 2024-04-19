import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AuthenticationView from "@/views/AuthenticationView.vue";
import LoginForm from "@/components/forms/LoginForm.vue";
import SignUpForm from "@/components/forms/SignUpForm.vue";
import CompleteAccountForm from "@/components/forms/CompleteAccountForm.vue";
import BudgetPageView from "@/views/BudgetPageView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },

    {
      path: "/budgetpage",
      name: "budgetpage",
      component: BudgetPageView,
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
  ],
});

export default router;
