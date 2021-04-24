<template>
  <div class="xuanxiuke">
    <div id="nav">
      <ul>
        <li
          v-for="(types,index) in rankTypes"
          :key="index"
          @click="toRankTypes(index,types.typeID)"
          :class="activeRankType==index?'active':'no'"
        >{{types.typeName}}</li>
      </ul>
    </div>
    <div class="xuanxiuke_body">
      <ul class="course">
        <li v-for="item in course" :key="item.courseID" class="courseItem">
          <p>{{item.courseName}}</p>
          <p id="agree">{{item.agree}}人推荐</p>
          <p>编号: {{item.courseID}}</p>
          <p>{{item.credit}}学分</p>
          <p>{{item.classHour}}学时</p>
          <p id="schoolName">{{item.schoolName}}</p>
          <div class="watch" @click="toClass(item.courseID)">查看详情</div>
        </li>
      </ul>
    </div>
    <el-button type="success" plain id="anniu2" @click="anniu2" class="el-icon-upload2">回到顶部</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rankTypes: [],
      activeRankType: 0,
      course: [],
      courseID: "",
    };
  },
  created() {
    this.getClass();
  },
  mounted() {
    this.getRankType();
  },
  methods: {
    //获取选修的分类
    getRankType() {
      this.$axios
        .get("/UShuo/SelectRankType")
        .then((res) => {
          console.log(res);
          this.rankTypes = res.data.data.rankTypes;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取默认的课程
    getClass() {
      this.$axios
        .get("/Rank/Elective")
        .then((res) => {
          console.log(res);
          this.course = res.data.data.Elective;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取特定的课程
    toRankTypes(m, n) {
      this.activeRankType = m;
      let params = {
        typeID: n,
      };
      console.log(params);
      this.$axios
        .get("/Rank/Elective", { params })
        .then((res) => {
          console.log(res);
          this.course = res.data.data.Elective;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //查看具体课程的介绍
    toClass(e) {
      if (localStorage.getItem("Authorization")) {
        console.log(localStorage.getItem("Authorization"));
        this.$store.commit("setCourseId", e);
        console.log("cha");
        this.$router.push("/classintrodution");
      } else {
        alert("未登录,为您跳转到登录页面");
        this.$router.push("/login");
      }
    },
    // 回到顶部
    anniu2() {
      var timer = setInterval(() => {
        let top = document.documentElement.scrollTop || document.body.scrollTop;
        document.documentElement.scrollTop -= 50;
        if (top <= 0) {
          clearInterval(timer);
        }
      }, 20);
    },
  },
};
</script>
<style scoped>
/* 右侧导航栏 */
#nav {
  width: 100px;
  position: fixed;
  left: 90%;
  top: 50%;
  border: 1px solid #2ab693;
  background: #ffffffff;
  border-radius: 15px;
}
#nav ul li {
  padding: 15px;
}
#nav ul li:hover {
  cursor: pointer;
}
#nav ul .active {
  color: #2ab693;
}
/* 点击返回顶部 */
#anniu2 {
  position: fixed;
  left: 90%;
  top: 75%;
}
/* 课程部分 */
.course {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.courseItem {
  margin: 30px;
  border: 1px solid rgb(224, 221, 221);
  background: #ffffffff;
  width: 200px;
  height: 250px;
  padding: 25px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}
/* 点击课程效果 */
.courseItem:hover {
  border: 0.5px solid #00c896;
}
/* 课程具体样式 */
/* 课程名称 */
p:first-child {
  color: #2ab693;
  font-size: 21px;
  border: none;
  padding: 0;
  background: none;
  font-weight: 800;
}
/* 推荐 */
#agree {
  font-size: 12px;
  color: rgb(204, 117, 10);
  border: 0.5px solid rgb(204, 117, 10);
  background: none;
}
/*编号、学分、学时、学院 */
p {
  font-size: 12px;
  color: #168166;
  margin-top: 10px;
  padding-left: 5px;
  border-radius: 8px;
  background: #8cc4b6;
  /* display: inline-block; */
}
p:nth-child(2) {
  width: 60px;
}
p:nth-child(3) {
  width: 120px;
}
p:nth-child(4) {
  width: 40px;
}
p:nth-child(5) {
  width: 40px;
}
#schoolName {
  display: block;
}
/* 查看 */
.watch {
  width: 200px;
  height: 150px;
  position: relative;
  top: 20px;
  color: rgb(110, 105, 105);
}
.watch:hover {
  color: #2ab693;
  cursor: pointer;
}
</style>