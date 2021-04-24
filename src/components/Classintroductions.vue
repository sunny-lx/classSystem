<template>
  <div class="classintroductions">
    <el-button type="success" plain id="anniu1" @click="anniu1" v-if="show">返回</el-button>
    <div class="classbody" v-if="show">
      <div class="classYq">
        <ul class="courseItem" v-for="items in course" :key="items.courseID">
          <div id="classname">
            课程名字:{{items.courseName}}
            <div id="favorite1" @click="favorite1">
              <i
                class="el-icon-star-off"
                :class="favorite==true?'favorite2':'no'"
                :favorite="favorite"
              ></i>
            </div>
          </div>
          <div id="classleft">
            <span>课程编号</span>
            <span>学分</span>
            <span>学时</span>
            <span>开课单位</span>
          </div>
          <div id="classright">
            <li>{{items.courseID}}</li>
            <li>{{items.credit}}</li>
            <li>{{items.classHour}}</li>
            <li>{{items.schoolName}}</li>
          </div>
        </ul>
      </div>
      <div class="classJs">
        <div id="classJsText1">课程介绍</div>
        <div id="classJsText2">{{this.courseInfo}}</div>
      </div>
      <div class="dianZan">
        <div id="dianZanText1">给老师打call</div>
        <div id="dianZanText2">
          <ul v-if="show3">
            <li v-for="(item,index) in courseTeachers" :key="index">
              <span>{{item.teacherName}}</span>
              <like :agree.sync="item.agree"></like>
            </li>
          </ul>
          <div v-if="!show3">暂无老师数据</div>
        </div>
      </div>
      <div class="classCredit">
        <div id="classCreditText1">绩点统计</div>
        <div id="classCreditText2">
          <div id="allCredit" v-if="show2"></div>
          <div v-if="!show2">暂无数据</div>
        </div>
      </div>
      <div class="comment">
        <div id="commentText1">全部评论</div>
        <div id="commentText2">
          <ul v-if="show4">
            <li v-for="(item,index) in courseComments" :key="index">
              <div class="com1">
                <div id="touxiang">
                  <el-avatar :src="item.avatarURL"></el-avatar>
                </div>
                <div>
                  <span id="postID">{{item.nickName}}</span>
                  <span id="initTime">{{item.commentTime}}</span>
                </div>
              </div>
              <div class="com2">
                <div id="com2_text">{{item.content}}</div>
              </div>
            </li>
          </ul>
          <div v-if="!show4">暂无评论</div>
        </div>
        <div id="commentText3">
          <span>上过这门课，评论一下吧~</span>
          <el-button
            type="primary"
            round
            icon="el-icon-s-promotion"
            id="combtn"
            @click="combtn"
          >发表评论</el-button>
        </div>
      </div>
    </div>
    <newcomment v-if="adding" class="add" @change="change"></newcomment>
    <el-button
      type="success"
      plain
      id="anniu2"
      @click="anniu2"
      class="el-icon-upload2"
      v-if="show"
    >回到顶部</el-button>
  </div>
</template>
<script>
import * as echarts from "echarts";
import like from "components/like.vue";
import Newcomment from "components/Newcomment.vue";

export default {
  data() {
    return {
      course: [],
      favorite: "",
      courseInfo: "",
      courseTeachers: [],
      courseComments: [],
      courseGpa: [],
      show3: true,
      show2: true,
      show4: true,
      datas: [],
      //发表评论
      adding: false,
      show: true,
    };
  },
  components: {
    like,
    Newcomment,
  },
  created() {
    this.getClassInfo();
  },
  mounted() {
    this.drawCharts();
  },
  methods: {
    anniu1() {
      this.$router.push("/classcha");
    },
    anniu2() {
      var timer = setInterval(() => {
        let top = document.documentElement.scrollTop || document.body.scrollTop;
        document.documentElement.scrollTop -= 50;
        if (top <= 0) {
          clearInterval(timer);
        }
      }, 20);
    },
    //收藏课程
    favorite1() {
      this.favorite = !this.favorite;
      console.log(this.favorite);
      let courseID = localStorage.getItem("courseID");
      let params = {
        courseID: courseID,
      };
      console.log(courseID);
      this.$axios
        .put("/Course/UserFavoriteCourse", params)
        .then((res) => {
          console.log(res);
          this.favorite = res.data.data.favorite;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取课程介绍页面所有信息
    getClassInfo() {
      let params = {
        courseID: localStorage.getItem("courseID"),
      };
      this.$axios
        .get("/Course/Info", { params })
        .then((res) => {
          console.log(res);
          this.course = res.data.data.courseInfoWithoutToken;
          this.courseInfo = res.data.data.courseInfo;
          this.courseTeachers = res.data.data.courseTeachers;
          this.favorite = res.data.data.favorite;
          this.courseGpa = res.data.data.courseGpa;
          this.courseComments = res.data.data.courseComments;
          this.deal();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //处理数据，若全为0，则返回暂无数据
    deal() {
      for (let i = 0; i < this.courseGpa.length; i++) {
        if (this.courseGpa[i].value == 0) {
          this.$delete(this.courseGpa, i);
        } else {
          this.datas.push(this.courseGpa[i]);
        }
      }
      console.log(this.datas.length == 0);
      if (this.datas.length == 0) {
        this.show2 = false;
      }
      if (this.courseTeachers.length == 0) {
        this.show3 = false;
      }
      if (this.courseComments.length == 0) {
        this.show4 = false;
      }
    },
    //绘制绩点的饼状图
    drawCharts() {
      var chartDom = document.getElementById("allCredit");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c}人 ({d}%)",
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            roseType: "angle",
            data: this.datas,
            label: {
              formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}人  {per|{d}%}  ",
              backgroundColor: "#F6F8FC",
              borderColor: "#8C8D8E",
              borderWidth: 1,
              borderRadius: 4,

              rich: {
                a: {
                  color: "#6E7079",
                  lineHeight: 22,
                  align: "center",
                },
                hr: {
                  borderColor: "#8C8D8E",
                  width: "100%",
                  borderWidth: 1,
                  height: 0,
                },
                b: {
                  color: "#4C5058",
                  fontSize: 14,
                  fontWeight: "bold",
                  lineHeight: 33,
                },
                per: {
                  color: "#fff",
                  backgroundColor: "#4C5058",
                  padding: [3, 4],
                  borderRadius: 4,
                },
              },
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
    //发表评论
    combtn() {
      this.adding = true;
      this.show = false;
    },
    //子传父，组件跳转，新增评论
    change(data) {
      this.adding = data;
      this.show = true;
      console.log("111");
    },
  },
};
</script>
<style scoped>
.clickLike {
  padding: 10px 0;
  position: relative;
}
.addOne {
  position: absolute;
  font-size: 18px;
  font-weight: bold;
  color: #f1050a;
}

/* 返回按钮 */
#anniu1 {
  position: relative;
  left: -430px;
  top: 20px;
}
/* 回到顶部按钮 */
#anniu2 {
  position: fixed;
  top: 600px;
  left: 90%;
}
.classbody {
  width: 885.6px;
  margin: auto;
}
.classYq,
.classJs,
.dianZan,
.classCredit,
.comment {
  background: #ffffffff;
  margin-top: 30px;
  border-radius: 15px;
}
#classname,
#classJsText1,
#dianZanText1,
#classCreditText1,
#commentText1 {
  font-size: 21px;
  color: #2ab693;
  border-bottom: 2px solid #217a64;
  margin-left: 15px;
  padding-top: 15px;
}
#classJsText2,
#dianZanText2,
#classCreditText2,
#commentText2 {
  margin-top: 15px;
  padding-bottom: 15px;
  margin-left: 15px;
}
/* 课程第一部分介绍————课程基础介绍 */
.courseItem {
  height: 203.2px;
}
/* 收藏课程样式 */
#favorite1 {
  float: right;
  margin-right: 15px;
}
.el-icon-star-off {
  color: rgb(104, 101, 101);
}
.favorite2 {
  color: #217a64;
}
#classleft {
  float: left;
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  color: rgb(160, 160, 161);
}
#classleft span {
  margin-top: 15px;
}
#classright {
  float: left;
  margin-left: 20px;
  color: rgb(83, 85, 87);
}
#classright li {
  margin-top: 15px;
  /* width: 100px; */
  height: 20.8px;
}
#classleft:after {
  content: "";
  display: block;
  clear: both;
}
/* 课程第二部分介绍————课程详情 */
#classJsText2 {
  width: 700px;
  margin: auto;
  color: rgb(83, 85, 87);
  margin-top: 15px;
}
/* 课程第三部分介绍————课程老师及点赞 */
#dianZanText2 ul {
  margin-top: 15px;
  width: 400px;
  margin: auto;
}
#dianZanText2 ul li span {
  color: rgb(133, 130, 130);
  font-size: 20px;
  font-weight: bold;
}
/* 课程第四部分介绍————绩点统计 */
#classCreditText2 {
  margin-bottom: 15px;
}
#allCredit {
  width: 600px;
  height: 400px;
  margin: auto;
}
/* 课程第五部分介绍————评论区*/
#commentText2 {
  margin-bottom: 20px;
}
#commentText2 ul li {
  border: 1px solid rgb(156, 156, 141);
  width: 800px;
  margin: auto;
  padding: 15px;
  border-radius: 4px;
}
/* 贴子的板块1 */
.com1 {
  display: flex;
}
/* 头像 */
#touxiang {
  display: inline-block;
  margin-right: 15px;
}
#touxiang .el-avatar {
  width: 60px;
  height: 60px;
}
/* 昵称、时间 */
.com1 div {
  display: flex;
  flex-direction: column;
}
#postID {
  margin-top: 5px;
}
#initTime {
  margin-top: 15px;
  font-size: 13px;
  color: rgb(168, 165, 165);
}
/* 贴子的板块2 */
.com2 {
  margin-top: 5px;
}
/* #com2_title {
  font-weight: bold;
  color: rgba(17, 148, 35, 0.918);
  font-size: 18px;
} */
#com2_text {
  color: rgb(107, 103, 103);
}
/* 贴子的板块3 */
#commentText3 {
  width: 800px;
  margin: auto;
  padding-bottom: 15px;
}
#commentText3 span,
#commentText3 el-button {
  height: 31px;
  line-height: 31px;
}
#commentText3 span {
  border: none;
  border: 1px solid rgb(51, 153, 59);
  display: inline-block;
  width: 450px;
  border-radius: 4px;
  font-size: 15px;
}
#commentText3 >>> .el-button {
  width: 150px !important;
  background: rgb(58, 179, 21);
  border: none;
  margin-left: 10px;
}
</style>