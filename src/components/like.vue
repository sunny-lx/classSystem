 <!-- like组件 -->
<template id="like-component-tpl">
  <i class="el-icon-apple" :class="liked==true?'liked':'no'" @click="toggle_like()" id="likebtn">
    <span>点赞</span>
    {{zan}}
  </i>
</template>
<script>
export default {
  data() {
    return {
      liked: "",
      zan: this.agree,
    };
  },
  props: {
    agree: Number,
    teacherID: String,
  },
  mounted() {},
  methods: {
    toggle_like() {
      this.$store.commit("setTeacherId", this.teacherID);
      console.log(this.teacherID);
      let params = {
        courseID: localStorage.getItem("courseID"),
        teacherID: this.teacherID,
      };
      this.$axios
        .put("/Course/UserFavoriteTeacher", params)
        .then((res) => {
          console.log(res);
          this.zan = res.data.data.newcourseTeacherStatement.agree;
          if (res.data.data.favorite == 1) {
            alert("点赞成功");
            this.liked = true;
          } else {
            alert("取消点赞");
            this.liked = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style>
.liked {
  color: rgb(224, 108, 108);
}
#likebtn {
  float: right;
  right: 15px;
  /* color: rgb(88, 85, 85); */
}
#likebtn span {
  font-size: 13px;
}
#likebtn:after {
  content: "";
  display: block;
  clear: both;
}
#likebtn:hover {
  cursor: pointer;
}
</style>
