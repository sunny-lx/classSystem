<template>
  <div class="my">
    <div class="my_body">
      <div id="my_left">
        <ul>
          <span id="my_header">个人中心</span>
          <li
            v-for="(item,index) in num"
            :key="index"
            @click="toLink(index)"
            :class="activenum==index? 'active':'no'"
          >{{item.name}}</li>
        </ul>
      </div>
      <div id="my_right">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      num: [
        {
          name: "我的信息",
          link: "/my/myShouye",
        },
        {
          name: "我的课程",
          link: "/my/myCourse",
        },
        {
          name: "我的评论",
          link: "/my/myComment",
        },
        {
          name: "我的关注",
          link: "/my/myGuanzhu",
        },
        {
          name: "我的贴子",
          link: "/my/myTiezi",
        },
        {
          name: "意见反馈",
          link: "/my/myAdvice",
        },
        {
          name: "关于",
          link: "/my/myAbout",
        },
      ],
      activenum: 0,
    };
  },
  // 导航守卫
  // 使用 router.beforeEach 注册一个组件守卫，判断用户是否登陆
  beforeRouteEnter: (to, from, next) => {
    if (localStorage.getItem("Authorization")) {
      console.log(localStorage.getItem("Authorization"));
      if (to.path === "/login") {
        next("/home");
      } else {
        next();
      }
    } else {
      if (to.path === "/login") {
        next();
      } else {
        alert("未登录，无法查看个人中心，为您跳转到登录页面");
        next("/login");
      }
    }
  },
  methods: {
    toLink(e) {
      this.$router.push(this.num[e].link);
      this.activenum = e;
    },
  },
};
</script>
<style scoped>
.my_body {
  width: 918.6px;
  margin: 20px auto 100px;
  background: #ffffffff;
  border: 1px solid #e1e2e5;
  box-shadow: 0 2px 4px rgb(0 0 0 / 14%);
  border-radius: 4px;
  overflow: hidden;
}
/* 左边 */
#my_left {
  /* width: 150px; */
  background: #ffffffff;
  float: left;
  border-right: 0.1px solid #e1e2e5;
}
#my_left:after {
  content: "";
  display: block;
  clear: both;
}
#my_left ul span {
  border-bottom: 1px solid #e1e2e5;
}
#my_left ul li {
  font-size: 14px;
  height: 48px;
  line-height: 48px;
  padding-left: 10px;
}
#my_left ul li:hover {
  /* 鼠标手指 */
  cursor: pointer;
}
.no:hover {
  background: #e1e4ea;
}
#my_header {
  display: block;
  width: 150px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 16px;
  color: #99a2aa;
  /* 鼠标默认箭头 */
  cursor: default;
  border-bottom: 1px solid #e1e2e5;
}
.active {
  background-color: #00c896;
  color: #ffffffff;
}
/* 右边 */
#my_right {
  margin-left: 150px;
  border-left: 0.1px solid #e1e2e5;
}
</style>

