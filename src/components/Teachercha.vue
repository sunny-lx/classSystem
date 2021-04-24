<template>
  <div class="teacher">
    <div class="teacher_nav">
      <div id="kuang">
        <input type="text" v-model="input" class="search1" placeholder="输入教师姓名" />
        <i class="el-icon-circle-close" @click="del"></i>
        <input type="button" value="搜索" @click="search" class="search2" />
      </div>
    </div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <div class="teacher_left">
          <ul>
            <li
              v-for="(item,index) in teachers"
              :key="index"
              :class="activeShortName==index?'active':'no'"
              @click="getTeacher(item.schoolID,index)"
            >{{item.shortName}}</li>
          </ul>
        </div>
      </el-aside>

      <el-container>
        <el-main>
          <div class="teacher_right">
            <ul class="teacher_yq">
              <li v-for="(item,index) in SpecificTeacherInfo" :key="index" class="teacherItem">
                <p>{{item.teacherName}}</p>
                <p>{{item.departmentName}}</p>
                <div class="watch" @click="toTeacher(item.teacherID)">查看详情</div>
              </li>
            </ul>
            <!-- <el-button type="success" icon="el-icon-top" circle id="toTop" @click="toTop"></el-button> -->
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: "",
      teachers: [],
      activeShortName: 0,
      SpecificTeacherInfo: [],
    };
  },
  created() {
    this.getShortName();
  },
  methods: {
    //搜索
    search() {
      console.log(this.input);
      let params = {
        teacherName: this.input,
      };
      this.$axios
        .get("/Ushuo/TeacherInquiry", { params })
        .then((res) => {
          console.log(res);
          this.SpecificTeacherInfo = res.data.data.SpecificTeacherInfo;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //删除搜索文字
    del() {
      this.input = "";
      this.getShortName();
    },
    //回到顶部
    // toTop() {
    //   var timer = setInterval(() => {
    //     let top = document.documentElement.scrollTop || document.body.scrollTop;
    //     document.documentElement.scrollTop -= 50;
    //     if (top <= 0) {
    //       clearInterval(timer);
    //     }
    //   }, 20);
    // },
    //获取左边导航栏的学院,默认学院的老师
    getShortName() {
      this.$axios
        .get("/Ushuo/Teachersquery")
        .then((res) => {
          console.log(res);
          this.teachers = res.data.data.ShortName;
          this.SpecificTeacherInfo = res.data.data.JiYuanInfo;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取特定学院的老师
    getTeacher(m, n) {
      this.activeShortName = n;
      let params = {
        schoolID: m,
      };
      console.log(params);
      this.$axios
        .get("/Ushuo/TeachersqueryBySchoolID", { params })
        .then((res) => {
          console.log(res);
          this.SpecificTeacherInfo = res.data.data.SpecificSchool;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //查看老师详情
    toTeacher(m) {
      if (localStorage.getItem("Authorization")) {
        console.log(localStorage.getItem("Authorization"));
        console.log(m);
        this.$store.commit("setTeacherId", m);
        console.log("cha");
        this.$router.push("/teacherintrodution");
      } else {
        alert("未登录,为您跳转到登录页面");
        this.$router.push("/login");
      }
    },
  },
};
</script>
<style scoped>
.teacher_nav {
  background: #ffffff;
  width: 100%;
}
#kuang {
  width: 540px;
  margin: auto;
  padding-top: 30px;
  padding-bottom: 10px;
}
#kuang i {
  position: relative;
  left: -30px;
  top: 2px;
}
/* 输入框样式 */
.search1 {
  width: 400px;
  height: 40px;
  background: #f3f0f0;
  border-style: none;
  font-size: 15px;
  border-radius: 20px;
  text-indent: 20px;
  border: 1px solid #e6e2e2;
}
.search1:hover {
  border: 1px solid #00c896;
}
.search1:focus {
  outline: none;
  border: 1px solid #00c896;
}
.search1:focus::-webkit-input-placeholder {
  color: #dfdbdb;
}
.search1:hover::-webkit-input-placeholder {
  color: #dfdbdb;
}
/* 按钮样式 */
.search2 {
  margin-left: 5px;
  border-style: none;
  width: 100px;
  color: #ffffff;
  background: #00c896;
  border-radius: 20px;
  height: 40px;
}
.search2:focus {
  outline: none;
  background: #68e29f;
}
/* 回到顶部 */
#toTop {
  position: fixed;
  right: 10px;
  top: 90%;
}
/* 中间内容区域 */
/* 页面左边导航*/
.teacher_left {
  background: #ffffff;
}
.teacher_left ul li {
  height: 41px;
  line-height: 41px;
  padding-left: 30px;
}
.teacher_left ul li:hover {
  cursor: pointer;
  background: #eceaea;
  color: #00c896;
}
.active {
  color: #00c896;
  background: #eceaea;
}
/* 页面右边 */
/* 老师部分 */
.teacher_yq {
  display: flex;
  flex-wrap: wrap;
}
.teacherItem {
  margin: 30px;
  border: 1px solid rgb(224, 221, 221);
  background: #ffffffff;
  width: 200px;
  height: 150px;
  padding: 25px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}
.teacherItem p {
  margin: 10px 0 auto;
}
/* 点击老师效果 */
.teacherItem:hover {
  border: 0.5px solid #00c896;
}
/* 老师具体样式 */
/* 老师名称 */
.teacherItem p:first-child {
  color: #2ab693;
  font-size: 21px;
  border: none;
  padding: 0;
  background: none;
  font-weight: 800;
}
.watch {
  color: rgb(110, 105, 105);
}
.watch:hover {
  color: #00c896;
  cursor: pointer;
}

p {
  font-size: 18px;
  color: #168166;
  margin-top: 10px;
  padding-left: 15px;
  border-radius: 8px;
  background: #8cc4b6;
}
</style>