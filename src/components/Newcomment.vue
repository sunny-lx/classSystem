<template>
  <div class="newcomment">
    <div class="comment_body">
      <div id="title">发表评论</div>
      <el-input
        class="body2"
        type="textarea"
        placeholder="请输入内容"
        v-model="textarea"
        :autosize="{minRows:5}"
      ></el-input>
      <div class="body5">
        <el-form>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即发表</el-button>
            <el-button @click="cancel" id="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      textarea: "", //贴子的内容
    };
  },
  props: {
    id: "",
  },
  methods: {
    cancel() {
      let is = false;
      this.$emit("change", is);
      alert("发表评论失败");
    },
    onSubmit() {
      console.log("啊啊啊");
      let params = {
        content: this.textarea,
        courseID: localStorage.getItem("courseID"),
      };
      this.$axios
        .post("/Course/comment", params)
        .then((res) => {
          console.log(res);
          let is = false;
          this.$emit("change", is);
          alert("发表成功");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.comment_body {
  width: 800.6px;
  margin: 20px auto 100px;
  padding: 20px;
  border: 1px solid #e1e2e5;
  box-shadow: 0 2px 4px rgb(0 0 0 / 14%);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
}
#title {
  width: 450px;
  margin: auto;
  font-size: 20px;
  color: #17943cf6;
}

.body2 {
  width: 450px;
  margin: auto;
  border: none;
  margin-top: 15px;
}
.body2 >>> .el-textarea__inner {
  font-size: 16px !important;
}
.body2 >>> .el-textarea__inner:focus {
  border: 1px solid #00c896 !important;
}

.body5 {
  width: 450px;
  margin: auto;
  margin-top: 15px;
}
#cancel {
  margin-left: 100px;
}
</style>