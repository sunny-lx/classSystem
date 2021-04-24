<template>
  <div class="about_body">
    <div class="body1">
      <el-carousel
        :interval="4000"
        type="card"
        trigger="click"
        @click.native="linkTo"
        ref="carousel"
        id="banner"
      >
        <el-carousel-item v-for="item in imagebox" :key="item.bannerURL">
          <img :src="item.bannerURL" class="image" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="body2">
      <input type="text" v-model="input" class="search1" placeholder="发帖之前，或许可以搜索相关问题呢！" />
      <i class="el-icon-circle-close" @click="del"></i>
      <input type="button" value="搜索" @click="search" class="search2" />
    </div>
    <div class="body3">
      <span>邮说</span>
      <ul class="ul1">
        <li @click="toAll" :class="show==true?'all':'no'">全部</li>
        <li
          v-for="(item,index) in youshuo1"
          :key="item.postTypeID"
          @click="toXueYuan(index)"
          :class="activeli==index?'active':'no'"
        >{{item.typeName}}</li>
        <li>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              更多
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(list,index) in youshuo2"
                :key="list.postTypeID"
                @click.native="toXueYuan2(index)"
              >{{list.typeName}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
      <ul class="ul2">
        <li v-for="(item,index) in posts" :key="index">
          <div class="com1">
            <div id="touxiang">
              <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </div>
            <div>
              <span id="postID">{{item.nickName}}</span>
              <span id="initTime">{{item.initTime}}</span>
            </div>
          </div>
          <div class="com2">
            <div id="com2_title">{{item.title}}</div>
            <div id="com2_text">{{item.content}}</div>
          </div>
          <div class="com3">
            <ul class="ul2_1">
              <li v-for="(img,index2) in item.imgs" :key="index2">
                <img :src="img" id="comimg" />
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //轮播图
      imagebox: [],
      // 搜索框数据
      input: "",
      // 邮说导航栏的学院分类
      youshuo: [],
      // 显示的学院
      youshuo1: [],
      //隐藏的学院
      youshuo2: [],
      show: false,
      // 邮说的贴子
      posts: [],
      //邮说学院的ID
      postTypeID: "",
      activeli: -1,
      show: true,
    };
  },
  created() {
    this.getBanner();
    this.getCollege();
    this.getAllPost();
  },
  mounted() {
    this.getCollege();
    this.getAllPost();
  },
  methods: {
    // 请求轮播图图片
    getBanner() {
      this.$axios
        .get("/UShuo/SelectBannerForUshuo")
        .then((res) => {
          this.imagebox = res.data.data.bannerForUShuo;
          console.log("轮播图");
          console.log(this.imagebox);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //轮播图点击跳转
    linkTo() {
      let activeIndex = this.$refs.carousel.activeIndex;
      this.$router.push(this.imagebox[activeIndex].link);
    },
    //搜索
    search() {
      console.log(this.input);
      let params = {
        keyword: this.input,
      };
      this.$axios
        .get("/UShuo/SelectBySearch", { params })
        .then((res) => {
          console.log(res);
          this.posts = res.data.data.posts;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //删除搜索文字
    del() {
      this.input = "";
      this.getAllPost();
    },
    //请求邮说的导航栏的学院分类
    getCollege() {
      this.$axios
        .get("/UShuo/SelectForUShuoTypes")
        .then((res) => {
          console.log(res);
          this.youshuo = res.data.data.uShuoTypes;
          this.fenge();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //邮说的导航栏切割
    fenge() {
      console.log(this.youshuo.length);
      if (this.youshuo.length <= 7) {
        this.youshuo1 = this.youshuo;
        this.show = false;
      } else {
        let index;
        for (index = 0; index < 7; index++) {
          this.youshuo1[index] = this.youshuo[index];
        }
        for (index = 7; index < this.youshuo.length; index++) {
          this.youshuo2[index - 7] = this.youshuo[index];
        }
        console.log(this.youshuo1);
        console.log(this.youshuo2);
        this.show = true;
      }
    },
    //请求邮说的全部贴子
    getAllPost() {
      this.$axios
        .get("/UShuo/SelectAllPosts")
        .then((res) => {
          console.log(res);
          this.posts = res.data.data.posts;
          console.log("----------------------");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //邮说的导航栏跳转全部
    toAll() {
      this.getAllPost();
      this.show = true;
      this.activeli = -1;
    },
    //邮说的导航栏特定跳转
    toXueYuan(e) {
      let params = {
        postTypeID: this.youshuo1[e].postTypeID,
      };
      this.activeli = e;
      this.show = false;
      //请求特定贴子
      this.$axios
        .get("/UShuo/SelectTypePosts", { params })
        .then((res) => {
          console.log(res);
          this.posts = res.data.data.posts;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toXueYuan2(e) {
      this.show = false;
      let params = {
        postTypeID: this.youshuo2[e].postTypeID,
      };
      //请求特定贴子
      this.$axios
        .get("/UShuo/SelectTypePosts", { params })
        .then((res) => {
          console.log(res);
          this.posts = res.data.data.posts;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.about_body {
  width: 885.6px;
  margin: auto;
}
#banner {
  width: 100%;
  height: 100%;
}
.image {
  height: 300px;
  width: 100%;
}
.body2 {
  width: 600px;
  margin: auto;

  margin-top: 10px;
  height: 35px;
  display: flex;
}
.body2 i {
  position: relative;
  left: -30px;
  top: 10px;
}
/* 输入框样式 */
.search1 {
  width: 100%;
  background: #ffffff;
  border-style: none;
  font-size: 15px;
  border-radius: 20px;
  text-indent: 20px;
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
}
.search2:focus {
  outline: none;
  background: #68e29f;
}
/* 邮说部分 */
.body3 {
  background: #ffffff;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
}
/* 邮说导航栏 */
.body3 .ul1 {
  display: flex;
  flex-direction: row;
  width: 850.6px;
  border-top: 3px solid #00c896;
  margin-top: 10px;
}
.body3 .ul1 li {
  margin-top: 10px;
  margin-right: 20px;
  width: 80px;
  height: 20px;
  margin-bottom: 5px;
  border-bottom: 1px solid #ffffff;
  cursor: pointer;
}
.body3 .ul1 li:hover {
  color: #00c896;
  border-bottom: 1px solid #00c896;
}
.body3 .ul1 .all {
  color: #00c896;
  border-bottom: 1px solid #00c896;
}
.body3 .ul1 .active {
  color: #00c896;
  border-bottom: 1px solid #00c896;
}
/* 更多 */
.el-dropdown-link {
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown-menu__item:hover {
  background-color: #00c896 !important;
  color: #333333 !important;
}
/* 邮说贴子部分 */
.ul2 {
  margin-top: 15px;
  padding: 10px;
}
.ul2 li {
  border-bottom: 1px solid #dfdbdb;
  padding-bottom: 15px;
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
#com2_title {
  font-weight: bold;
  color: rgba(17, 148, 35, 0.918);
  font-size: 18px;
}
#com2_text {
  color: rgb(107, 103, 103);
}
/* 贴子的板块3 */
.ul2_1 {
  margin-top: 15px;
  margin-bottom: 5px;
}

.ul2_1 li {
  border-bottom: none;
  width: 200px;
  padding-bottom: 0;
}
#comimg {
  width: 200px;
}
</style>