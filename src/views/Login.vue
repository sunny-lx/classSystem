<template>
  <div class="login">
    <div class="header">
      <img id="logo" src="~assets/logo.png" />
      <span id="title">重庆邮电大学选课系统</span>
    </div>
    <div class="main">
      <div class="login_body">
        <img src="~assets/login/logo1.png" id="logo1" />
        <input type="text" v-model="loginForm.userid" placeholder="请输入帐号" />
        <input type="password" v-model="loginForm.password" placeholder="请输入密码" />
        <button @click="tologin" id="btnlogin">
          <i class="iconfont icon-denglu"></i>登录
        </button>
        <div @click="toRegister" id="toRegister">没有账号，去注册</div>
        <div @click="toHome" id="toHome">游客模式</div>
      </div>
    </div>
  </div>
</template>
 
<script>
import { mapMutations } from "vuex";
// import { login } from "@/api/index.js";
export default {
  data() {
    return {
      loginForm: {
        userid: "",
        password: "",
      },
      userToken: "",
      user: "",
    };
  },
  methods: {
    ...mapMutations(["changeLogin"]),
    tologin() {
      if (this.loginForm.userid == "" && this.loginForm.password == "") {
        return alert("请输入用户名和密码！");
      } else if (this.loginForm.password == "") {
        return alert("请输入密码！");
      } else if (this.loginForm.userid == "") {
        return alert("请输入用户名！");
      }
      let params = {
        openid: this.loginForm.userid,
        password: this.loginForm.password,
      };
      console.log(params);
      if (this.loginForm.userid === "" || this.loginForm.password === "") {
        alert("账号或密码不能为空");
      } else {
        this.$axios
          .post("/user/login", params)
          .then((res) => {
            console.log(res);
            this.userToken = res.data.data.token;
            this.user = res.data.data.user;
            console.log(this.user);
            // 将用户token保存到vuex中
            this.changeLogin({ Authorization: this.userToken });
            console.log(localStorage.getItem("Authorization"));
            //将user的信息保存到vuex中
            this.$store.commit("setUser", this.user);

            this.$router.push("/home");
            alert(
              "登陆成功"
            );
          })
          .catch((error) => {
            // alert("账号或密码错误");
            console.log(error);
          });
      }
    },
    toRegister() {
      this.$router.replace("/register");
    },
    //游客模式
    toHome() {
      this.$router.push("/home");
    },
  },
};
</script>
 
<style scoped>
/* 头部 */
.header {
  height: 100px;
  line-height: 100px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
#logo {
  width: 100px;
  height: 100px;
}
#title {
  font-weight: bolder;
  font-size: 40px;
  color: rgb(8, 128, 88);
  margin-left: 30px;
}
/* 主要中间部分 */
/* 登录页面 */
.main {
  width: 750px;
  height: 400px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background-color: #fff;
  margin: auto;
  margin-top: 50px;
}
.login_body {
  width: 600px;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
}
#logo1 {
  width: 80px;
  height: 80px;
  margin: auto;
  margin-top: 15px;
  margin-bottom: 20px;
}
.login_body input {
  display: inline-block;
  width: 300px;
  margin: auto;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  outline: none;
  border: 1px solid #888;
  margin-top: 20px;
}
#btnlogin {
  width: 200px;
  margin: auto;
  margin-top: 30px;
  height: 40px;
  border: none;
  background: rgb(6, 138, 94);
  outline: none;
  font-size: 15px;
  color: #ffff;
}
#btnlogin:hover {
  cursor: pointer;
}
.iconfont {
  font-size: 18px;
}
#toRegister,
#toHome {
  display: inline-block;
  margin: auto;
  margin-top: 10px;
  font-size: 15px;
}
#toRegister:hover,
#toHome:hover {
  color: rgb(6, 138, 94);
  cursor: pointer;
}
</style>