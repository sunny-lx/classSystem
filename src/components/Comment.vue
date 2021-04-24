<template>
  <div class="comment">
    <div class="comment_body">
      <div id="title">发帖子</div>
      <el-input class="body1" placeholder="请输入贴子标题。" v-model="input" clearable></el-input>
      <el-input
        class="body2"
        type="textarea"
        placeholder="请输入内容"
        v-model="textarea"
        :autosize="{minRows:5}"
      ></el-input>
      <div class="body3">
        <span>图片上传</span>
        <div class="upload">
          <el-upload
            action="123"
            list-type="picture-card"
            :http-request="upload"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            multiple
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </div>
        <el-button type="success" round @click="imgUp" id="imgUp">上传</el-button>
      </div>
      <div class="body4">
        <div class="body4_top">
          <span>选择主题</span>
          <span>选择合适的主题，可以让更多的同学看到哦</span>
        </div>
        <div class="body4_bottom">
          <ul>
            <li
              v-for="(listType,indexType) in postTypes"
              :key="indexType"
              @click="getPostID(listType.postTypeID)"
            >{{listType.typeName}}</li>
          </ul>
        </div>
      </div>
      <div class="body5">
        <button id="submit" @click="submit">
          <i class="el-icon-chat-round"></i>发送
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      input: "", //帖子的标题
      textarea: "", //贴子的内容
      files: [],
      imgURL: [],
      postTypes: [],
      postTypeID: "",
    };
  },
  // 导航守卫
  // 注册一个组件守卫，判断用户是否登陆
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
        alert("未登录，无法发表贴子，为您跳转到登录页面");
        next("/login");
      }
    }
  },
  created() {
    this.getPostTypes();
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    upload(file) {
      console.log(file);
      this.files = file.file;
    },
    //上传图片
    imgUp() {
      let params = new FormData();
      params.append("files", this.files);
      this.$axios
        .post("/upload", params)
        .then((res) => {
          console.log(res);
          this.imgURL = res.data.data.pictures;
          console.log(this.imgURL);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获得全部主题分类
    getPostTypes() {
      this.$axios
        .get("/Post/selectPostType")
        .then((res) => {
          console.log(res);
          this.postTypes = res.data.data.postTypes;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //选择贴子主题
    getPostID(e) {
      this.postTypeID = e;
      console.log(this.postTypeID);
    },
    //发表贴子
    submit() {
      let params;
      if (this.postTypeID == "") {
        params = {
          title: this.input,
          content: this.textarea,
          imgURL: this.imgURL,
        };
      } else if (this.imgURL.length == 0) {
        params = {
          title: this.input,
          content: this.textarea,
          postTypeID: this.postTypeID,
        };
      } else if (this.imgURL.length == 0 && this.postTypeID == "") {
        params = {
          title: this.input,
          content: this.textarea,
        };
      } else {
        params = {
          title: this.input,
          content: this.textarea,
          postTypeID: this.postTypeID,
          imgURL: this.imgURL,
        };
      }
      this.$axios
        .post("/User/Uploadpost", params)
        .then((res) => {
          console.log(res);
          alert("发表成功");
          this.$router.replace("/home");
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
.body1 {
  width: 450px;
  margin: auto;
  margin-top: 15px;
}
.body1 >>> .el-input__inner:focus {
  border: 1px solid #00c896 !important;
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
.body3 {
  width: 450px;
  margin: auto;
  background: #ffffff;
  margin-top: 15px;
  border-radius: 4px;
}
.body3 span {
  display: inline-block;
  margin-top: 15px;
  margin-left: 15px;
  font-size: 20px;
  color: rgb(153, 147, 147);
}
.upload {
  margin-top: 15px;
  margin-left: 15px;
  margin-bottom: 15px;
}
#imgUp {
  margin-bottom: 15px;
  margin-left: 15px;
}
.body4 {
  width: 450px;
  margin: auto;
  margin-top: 15px;
  background: #ffffff;
  border-radius: 4px;
}
.body4_top {
  margin-top: 15px;
}
.body4_top span:nth-child(1) {
  float: left;
  font-size: 20px;
  color: rgb(153, 147, 147);
  margin-left: 15px;
  margin-bottom: 5px;
}
.body4_top span:nth-child(2) {
  float: right;
  font-size: 13px;
  color: rgb(170, 168, 168);
  margin-right: 15px;
}
.body4_top:after {
  content: "";
  display: block;
  clear: both;
}
.body4_bottom ul {
  width: 400px;
  margin: auto;
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.body4_bottom ul li {
  margin-right: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 14px;
  border: 1px solid #0c7c08;
  color: #0c7c08;
  padding-left: 8px;
  padding-right: 8px;
}
.body4_bottom ul li:hover {
  cursor: pointer;
}
.body5 {
  width: 450px;
  margin: auto;
}
#submit {
  border: none;
  outline: none;
  width: 450px;
  margin: auto;
  margin-top: 15px;
  background: #00c896;
  border-radius: 4px;
  height: 41px;
  line-height: 41px;
  font-size: 18px;
  color: #0c7c08;
}
#submit:hover {
  color: #fff;
}
</style>
