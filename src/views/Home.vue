<template>
  <div class="home">
    <div class="home_header">
      <div class="shang"></div>
      <div class="zhong">
        <img class="logo1" src="~assets/home/logo1.png" />
        <img class="logo2" src="~assets/home/logo2.png" />
      </div>
    </div>
    <div class="nav">
      <div class="nav_text">
        <div class="text1">
          <span @click="toAbout">
            <i class="iconfont icon-zhuye"></i>主页
          </span>
          <span @click="toXuanke">
            <i class="iconfont icon-qizi"></i>选修课排行
          </span>
          <span @click="toTeachercha">
            <i class="iconfont icon-jiaoshi_banji"></i>教师查询
          </span>
          <span @click="toClasscha">
            <i class="iconfont icon-kecheng-"></i>课程查询
          </span>
          <span @click="toComment">
            <i class="iconfont icon-iconfontpinglun"></i>邮说
          </span>
        </div>
        <div class="text2">
          <span>
            <el-avatar :src="touUrl"></el-avatar>
          </span>
          <span>{{nickName}}</span>
          <span @click="toMy">
            <i class="iconfont icon-gerenzhongxin"></i>个人中心
          </span>
          <span class="actions" @click="toLogin" v-if="show">退出登录</span>
          <span v-if="!show" @click="toL">请先登录</span>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "",
      touUrl: "",
      nickName: "",
      show: "",
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    toLogin() {
      localStorage.removeItem("Authorization");
      localStorage.removeItem("user");
      let token = localStorage.getItem("Authorization");
      console.log(token);
      alert("已注销，前往登录页面");
      this.$router.replace("/login");
    },
    toL() {
      this.$router.push("/login");
    },
    //用户信息
    getUser() {
      if (localStorage.getItem("user")) {
        this.user = JSON.parse(localStorage.getItem("user"));
        console.log(this.user);
        this.touUrl = this.user.avatarURL;
        this.nickName = this.user.nickName;
        this.show = true;
      } else {
        this.show = false;
      }
    },
    //跳转
    toAbout() {
      this.$router.push("/about");
    },
    toXuanke() {
      this.$router.push("/xuanxiuke");
    },
    toTeachercha() {
      this.$router.push("/teachercha");
    },
    toClasscha() {
      this.$router.push("/classcha");
    },
    toComment() {
      this.$router.push("/comment");
    },
    toMy() {
      this.$router.push("/my");
    },
  },
};
</script>
<style scoped>
/* 头部 */
.home_header {
  z-index: 0;
  background: url("../assets/home/bg.png") repeat-x;
  background: #eceaea;
}
.shang {
  margin: 0 150px auto;
  height: 5px;
  background: #00c896;
}
.zhong {
  height: 112px;
  background-color: #eceaea;
}
.logo1 {
  float: left;
  margin-top: 20px;
  margin-bottom: 20px;
}
.logo2 {
  float: right;
  margin-top: 42px;
  margin-bottom: 42px;
}
.zhong:after {
  content: "";
  display: block;
  clear: both;
}
/* 主页导航栏 */
.nav {
  height: 41px;
  background: #00c896;
  border-bottom: 1px solid #ffffff;
}
.nav_text {
  width: 90%;
  margin: 0 auto;
  line-height: 41px;
  color: #ffffff;
}
.text1 {
  float: left;
}
.text2 {
  float: right;
  height: 41px;
  display: flex;
  align-items: center;
}
.nav:after {
  content: "";
  display: block;
  clear: both;
}
.nav_text span {
  display: inline-block;
  height: 41px;
  padding-right: 20px;
  /* 鼠标手指 */
  cursor: pointer;
}
.text2 span {
  padding-right: 10px;
}
/* 图标 */
.iconfont {
  font-size: 20px;
  margin-right: 4px;
}
</style>
