<template>
  <div class="teacherintrodution">
    <el-button type="success" plain id="anniu1" @click="anniu1">返回</el-button>
    <div class="main">
      <div id="title">教师介绍</div>
      <div id="content">
        <ul>
          <li>教师姓名：</li>
          <li>邮箱：</li>
          <li>所属学院：</li>
          <li>所属部门：</li>
          <li>教师详情：</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.getTeacherInfo();
  },
  methods: {
    anniu1() {
      this.$router.push("/teachercha");
    },
    getTeacherInfo() {
      let params = {
        teacherID: localStorage.getItem("teacherID  "),
      };
      this.$axios
        .get("/Ushuo/TeacherInfo", { params })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
/* 返回按钮 */
#anniu1 {
  position: relative;
  left: -430px;
  top: 20px;
}
.main {
  width: 800px;
  margin: auto;
  margin-top: 100px;
  margin-bottom: 100px;
  background: #ffffffff;
  border: 1px solid #e1e2e5;
  box-shadow: 0 2px 4px rgb(0 0 0 / 14%);
  border-radius: 4px;
  padding-left: 20px;
}
#title {
  margin-top: 20px;
  font-size: 21px;
  color: #2ab693;
  border-bottom: 2px solid #217a64;
  /* margin-left: 15px; */
  padding-top: 15px;
}
</style>