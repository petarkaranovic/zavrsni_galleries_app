import Vue from "vue";
import VueRouter from "vue-router";
import AppLogin from "@/components/auth/AppLogin";
import AppRegister from "@/components/auth/AppRegister";
import HomePage from "@/components/HomePage";
import AuthorsGalleries from "@/components/galleriesViews/AuthorsGalleries";
import SingleGallery from "@/components/galleriesViews/SingleGallery";
import MyGalleries from "@/components/galleriesViews/MyGalleries";
import EditGallery from "@/components/galleriesViews/EditGallery";
import CreateGallery from '@/components/galleriesViews/CreateGallery';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: HomePage,
    name: "home"
  },
  {
    path: "/login",
    name: "login",
    component: AppLogin,
    meta: {
      guest: true
    }
  },
  {
    path: "/register",
    name: "register",
    component: AppRegister,
    meta: {
      guest: true
    }
  },
  {
    path: "/my-galleries",
    name: "my-galleries",
    component: MyGalleries,
    meta: {
      auth: true
    }
  },
  {
    path: "/create",
    name: "create-gallery",
    component: CreateGallery,
    meta: {
      auth: true
    }
  },
  {
    path: "/authors-galleries/:id/",
    name: "authors-galleries",
    component: AuthorsGalleries,
    meta: {
      auth: true
    }
  },
  { path: "/galleries/:id", name: "single-gallery", component: SingleGallery },
  {
    path: "/edit/:id",
    component: EditGallery,
    name: "edit-gallery"
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

router.beforeEach((to, from, next) => {
  const isAuth = !!localStorage.getItem("token");

  if (isAuth && to.meta.guest) {
    return next({ name: "home" });
  }
  if (!isAuth && to.meta.auth) {
    return next({ name: "login" });
  }
  return next();
});
export default router;
