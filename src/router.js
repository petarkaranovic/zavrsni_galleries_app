import Vue from "vue";
import VueRouter from "vue-router";
import AppLogin from "@/components/auth/AppLogin";
import AppRegister from "@/components/auth/AppRegister";
import HomePage from "@/components/HomePage";
import AuthorsGalleries from "@/components/galleriesViews/AuthorsGalleries";
import SingleGallery from "@/components/galleriesViews/SingleGallery";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: HomePage, name: "home" },
  { path: "/login", name: "login", component: AppLogin, meta: { guest: true } },
  {
    path: "/register",
    name: "register",
    component: AppRegister,
    meta: { guest: true }
  },
  { path: "/my-galleries", name: "my-galleries", meta: { auth: true } },
  { path: "/create", name: "create-gallery", meta: { auth: true } },
  {
    path: "/authors-galleries/:id",
    name: "authors-galleries",
    component: AuthorsGalleries,
    meta: { auth: true }
  },
  { path: "/galleries/:id", name: "single-gallery", component: SingleGallery }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

router.beforeEach((to, from, next) => {
  const isAuth = !!localStorage.getItem("user");

  if (isAuth && to.meta.guest) {
    return next({ name: "home" });
  }
  if (!isAuth && to.meta.auth) {
    return next({ name: "login" });
  }
  return next();
});
export default router;
