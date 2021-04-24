<template>
  <div class="register">
    <div class="header">
      <img id="logo" src="~assets/logo.png" />
      <span id="title">重庆邮电大学选课系统</span>
    </div>
    <div class="main">
      <div class="register_body">
        <img src="~assets/login/logo1.png" id="logo1" />
        <div id="body1">
          <div>请输入用户名:</div>
          <input type="text" v-model="registerForm.username" />
        </div>
        <div id="body2">
          <div>请输入密码:</div>
          <input type="password" v-model="registerForm.psw1" />
        </div>
        <div id="body3">
          <div>请确认密码:</div>
          <input type="password" v-model="registerForm.psw2" />
        </div>
        <div id="body4">
          <button id="btnregister" @click="register">
            <i class="iconfont icon-zhuce"></i>注册
          </button>
          <div @click="toLogin" id="toLogin">已有账号，去登录</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      registerForm: {
        username: "",
        // password: "",
        psw1: "",
        psw2: "",
      },
      userToken: "",
    };
  },
  methods: {
    //注册
    register() {
      if (this.registerForm.username == "") return alert("请完善信息！");
      if (
        this.registerForm.psw1 != this.registerForm.psw2 ||
        this.registerForm.psw2 == "" ||
        this.registerForm.psw1 == ""
      ) {
        return alert("请确保密码不为空且两次密码输入一致！");
      }

      let params = {
        username: this.registerForm.username,
        password: this.registerForm.psw2,
        confirmPassword: this.registerForm.psw2,
      };
      this.$axios
        .post("/User/register", params)
        .then((res) => {
          alert(
            "注册成功,即将返回登陆页面登录!" +
              "请记住你的帐号：" +
              res.data.data.openid
          );
          this.$router.replace("/Login").catch(() => {});
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toLogin() {
      this.$router.replace("/login");
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
/* 注册页面 */
.main {
  width: 750px;
  height: 500px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background-color: #fff;
  margin: auto;
  margin-top: 50px;
}
.register_body {
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
.register_body input {
  display: inline-block;
  width: 300px;
  margin: auto;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  outline: none;
  border: 1px solid #888;
  margin-top: 15px;
}
#body1,
#body2,
#body3,
#body4 {
  margin: auto;
}
#btnregister {
  width: 200px;
  margin: auto;
  margin-top: 20px;
  height: 40px;
  border: none;
  background: rgb(6, 138, 94);
  outline: none;
  font-size: 15px;
  color: #ffff;
}
.iconfont {
  font-size: 18px;
}
#toLogin {
  width: 120px;
  margin: auto;
  margin-top: 15px;
  font-size: 15px;
}
#toLogin:hover {
  color: rgb(6, 138, 94);
}
</style>