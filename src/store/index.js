import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 存储token
    Authorization: localStorage.getItem("Authorization")
      ? localStorage.getItem("Authorization")
      : "",
    user: [],
    courseID: "",
    teacherID: "",
    call: "",
  },
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin(state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem("Authorization", user.Authorization);
    },
    //储存用户信息
    setUser(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    //存储课程ID
    setCourseId(state, courseID) {
      state.courseId = courseID;
      localStorage.courseID = courseID;
      console.log(courseID);
    },
    //存储教师ID
    setTeacherId(state, teacherID) {
      state.teacherID = teacherID;
      localStorage.teacherID = teacherID;
      console.log(teacherID);
    },
    //存储点赞标志
    setCall(state, call) {
      state.call = call;
      localStorage.setItem("call", call);
      console.log(call);
    },
  },
  actions: {},
  modules: {},
});
