import Vue from "vue";
import VueRouter from "vue-router";
import Form from "../components/Form.vue";
import Terms from "../components/Terms.vue";
import Privacy from "../components/Privacy.vue";
import About from "../components/About.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/Terms",
    name: "Terms",
    component: Terms
  },
  {
    path: "/Privacy",
    name: "Privacy",
    component: Privacy
  },
  {
    path: "/About",
    name: "About",
    component: About
  },
  {
    path: "/",
    name: "Form",
    component: Form
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
