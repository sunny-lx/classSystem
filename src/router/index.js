import Vue from "vue";
import VueRouter from "vue-router";
import Home from "views/Home.vue";
import Login from "views/Login.vue";
import Register from "views/Register.vue";
import About from "components/About.vue";

import Xuanxiuke from "components/Xuanxiuke.vue";
import Classintroduction from "components/Classintroduction.vue";

import Teachercha from "components/Teachercha.vue";
import Teacherintrodution from "components/Teacherintrodution.vue";

import Classcha from "components/Classcha.vue";
import Classintroductions from "components/Classintroductions.vue";

import Comment from "components/Comment.vue";
import My from "components/My.vue";

// 个人中心部分的路由
import MyShouye from "components/Mys/MyShouye.vue";
import MyCourse from "components/Mys/MyCourse.vue";
import MyComment from "components/Mys/MyComment.vue";
import MyGuanzhu from "components/Mys/MyGuanzhu.vue";
import MyTiezi from "components/Mys/MyTiezi.vue";
import MyAdvice from "components/Mys/MyAdvice.vue";
import MyAbout from "components/Mys/MyAbout.vue";

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/login",
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/home",
    component: Home,
    children: [
      {
        path: "",
        redirect: "/about",
      },
      {
        path: "/about",
        component: About,
      },
      {
        path: "/xuanxiuke",
        component: Xuanxiuke,
      },
      {
        path: "/classintrodution",
        component: Classintroduction,
      },
      {
        path: "/teachercha",
        component: Teachercha,
      },
      {
        path: "/teacherintrodution",
        component: Teacherintrodution,
      },
      {
        path: "/classcha",
        component: Classcha,
      },
      {
        path: "/classintrodutions",
        component: Classintroductions,
      },
      {
        path: "/comment",
        component: Comment,
      },
      {
        path: "/my",
        component: My,
        children: [
          {
            path: "",
            redirect: "/my/myShouye",
          },
          {
            path: "/my/myShouye",
            component: MyShouye,
          },
          {
            path: "/my/myCourse",
            component: MyCourse,
          },
          {
            path: "/my/myComment",
            component: MyComment,
          },
          {
            path: "/my/myGuanzhu",
            component: MyGuanzhu,
          },
          {
            path: "/my/myTiezi",
            component: MyTiezi,
          },
          {
            path: "/my/myAdvice",
            component: MyAdvice,
          },
          {
            path: "/my/myAbout",
            component: MyAbout,
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
