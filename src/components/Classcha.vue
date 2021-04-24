<template>
  <div class="classcha" ref="pronbit">
    <div class="classcha_nav">
      <div id="kuang">
        <input
          type="text"
          v-model="input"
          class="search1"
          placeholder="输入课程名称"
          @focus="focus"
          @blur="blur"
        />
        <i class="el-icon-circle-close" @click="del"></i>
        <input type="button" value="搜索" @click="search" class="search2" />
        <div id="tuijian" v-if="show">
          <div id="recommend">
            <p id="recommend_title">搜索历史</p>
            <ul v-for="(list1,index1) in  histroy" :key="index1">
              <li id="tuijianItem1">{{list1.courseName}}</li>
            </ul>
          </div>
          <div id="histroy">
            <p id="histroy_title">推荐课程</p>
            <ul v-for="(list2,index2) in recommend" :key="index2">
              <li id="tuijianItem2">{{list2.courseName}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <div class="classcha_left">
          <ul>
            <li
              v-for="(item,index) in teachers"
              :key="index"
              :class="activeShortName==index?'active':'no'"
              @click="getClassType(item.schoolID,index)"
            >{{item.shortName}}</li>
          </ul>
        </div>
      </el-aside>
      <el-container>
        <el-main>
          <div class="classcha_right">
            <ul class="classcha_yq">
              <li v-for="(item,index) in SpecificClass" :key="index" class="classItem">
                <p>{{item.courseName}}</p>
                <p>编号: {{item.courseID}}</p>
                <p>{{item.credit}}学分</p>
                <p>{{item.classHour}}学时</p>
                <div class="watch" @click="toClass(item.courseID)">查看详情</div>
              </li>
            </ul>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <!-- <el-button type="success" icon="el-icon-top" circle id="toTop" @click="toTop"></el-button> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: "",
      histroy: [],
      recommend: [],
      teachers: [],
      activeShortName: 0,
      SpecificClass: [],
      show: false,
    };
  },
  created() {
    this.getClass();
    this.getTuijian();
  },
  mounted() {
    window.addEventListener("scroll", this.showbtn, true);
  },
  methods: {
    //搜索
    search() {
      console.log(this.input);
      let params = {
        courseName: this.input,
      };
      this.$axios
        .get("/SelectCourse/CourseInquiry", { params })
        .then((res) => {
          console.log(res);
          this.SpecificClass = res.data.data.SpecificTeacherInfo;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //删除搜索文字
    del() {
      this.input = "";
      this.getClass();
    },
    //推荐算法展示区
    focus() {
      this.show = true;
    },
    blur() {
      this.show = false;
    },
    //获取推荐及历史课程
    getTuijian() {
      this.$axios
        .get("/Course/Recommend")
        .then((res) => {
          console.log(res);
          this.recommend = res.data.data.recommond;
          this.histroy = res.data.data.history;
          console.log(this.recommend);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //回到顶部
    // toTop() {
    //   // var timer = setInterval(() => {
    //   //   let top = document.documentElement.scrollTop || document.body.scrollTop;
    //   //   document.documentElement.scrollTop -= 50;
    //   //   if (top <= 0) {
    //   //     clearInterval(timer);
    //   //   }
    //   // }, 20);
    // },
    //获取右边导航栏的学院，默认的课程
    getClass() {
      this.$axios
        .get("/SelectCourse")
        .then((res) => {
          console.log(res);
          this.teachers = res.data.data.ShortName;
          this.SpecificClass = res.data.data.JiYuanInfo;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取特定学院的课程
    getClassType(m, n) {
      this.activeShortName = n;
      let params = {
        schoolID: m,
      };
      this.$axios
        .get("/SelectCourse/CourseBySchoolID", { params })
        .then((res) => {
          console.log(res);
          // this.SpecificTeacherInfo = res.data.data.SpecificSchool;
          this.SpecificClass = res.data.data.SpecificSchool;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //查看课程详情
    toClass(m) {
      if (localStorage.getItem("Authorization")) {
        console.log(localStorage.getItem("Authorization"));
        this.$store.commit("setCourseId", m);
        console.log("cha");
        this.$router.push("/classintrodutions");
      } else {
        alert("未登录,为您跳转到登录页面");
        this.$router.push("/login");
      }
    },
  },
};
</script>
<style scoped>
.classcha_nav {
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
/* 推荐区 */
#tuijian {
  width: 360px;
  margin-left: 20px;
  border: 1px solid #e6e2e2;
  box-shadow: 0 0 10px 2px rgb(0 0 0 / 6%);
  border-radius: 0 0 4px 4px;
  padding: 8px 0 12px;
  font-size: 14px;
  font-weight: 400;
  position: absolute;
  background: #fff;
  color: #555666;
}
#recommend {
  width: 50%;
  float: left;
}
#histroy {
  width: 50%;
  float: left;
}
#tuijian:after {
  content: "";
  display: block;
  clear: both;
}
#recommend_title,
#histroy_title {
  padding-left: 16px;
  height: 32px;
  font-size: 12px;
  color: #00c896;
  line-height: 32px;
  position: relative;
}
#tuijianItem1,
#tuijianItem2 {
  white-space: nowrap;
  text-overflow: ellipsis;
  position: relative;
  display: block;
  width: 100%;
  padding: 0 48px 0 16px;
  box-sizing: border-box;
  height: 32px;
  line-height: 32px;
  cursor: pointer;
}
/* 回到顶部 */
#toTop {
  position: fixed;
  right: 10px;
  top: 90%;
}
/* 中间内容区域 */
/* 页面左边导航*/
.classcha_left {
  background: #ffffff;
}
.classcha_left ul li {
  height: 41px;
  line-height: 41px;
  padding-left: 30px;
}
.classcha_left ul li:hover {
  cursor: pointer;
  background: #eceaea;
  color: #00c896;
}
.active {
  color: #00c896;
  background: #eceaea;
}
/* 页面右边 */
/* 课程部分 */
.classcha_yq {
  display: flex;
  flex-wrap: wrap;
}
.classItem {
  margin: 30px;
  border: 1px solid rgb(224, 221, 221);
  background: #ffffffff;
  width: 200px;
  height: 180px;
  padding: 25px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}
.classItem p {
  margin: 10px 0 auto;
  font-size: 12px;
  color: #168166;
  padding-left: 15px;
  border-radius: 8px;
  background: #8cc4b6;
}
/* 点击课程效果 */
.classItem:hover {
  border: 0.5px solid #00c896;
}
/* 课程具体样式 */
/* 课程名称 */
.classItem p:first-child {
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
</style>