<template>
  <div class="myShouye">
    <div class="title">
      <span id="title-icon"></span>
      <span id="title-text">我的信息</span>
    </div>
    <div class="main">
      <div class="adatar">
        <img :src="adatar?adatar:baseUrl" alt />
      </div>
      <div class="xinxi">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="昵称">
            <el-input v-model="form.nickName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" id="btn">保存</el-button>
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
      adatar: "",
      baseUrl: "",
      form: {
        nickName: "",
      },
    };
  },
  mounted() {
    this.baseUrl = this.$store.state.user.avatarURL;
    this.form.nickName = this.$store.state.user.nickName;
    console.log(this.$store.state.user);
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>
<style scoped>
.title {
  height: 50px;
  padding-left: 30px;
  border-bottom: 1px solid #ddd;
}
#title-icon {
  float: left;
  width: 4px;
  height: 16px;
  margin-top: 18px;
  background-color: #00c896;
  border-radius: 4px;
}
#title-text {
  float: left;
  margin: 15px 0 0 5px;
  color: #00c896;
  font-size: 16px;
  cursor: default;
}
#title-icon:after {
  content: "";
  display: block;
  clear: both;
}
#title-icon:after {
  content: "";
  display: block;
  clear: both;
}
.adatar img {
  width: 180px;
  margin: 20px;
  border-radius: 50%;
  border: 1px solid rgb(161, 157, 157);
}
#btn >>> .el-button--primary {
  background: #00c896 !important;
}
</style>