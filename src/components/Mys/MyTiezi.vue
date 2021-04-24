<template>
  <div class="myTiezi">
    <div class="title">
      <span id="title-icon"></span>
      <span id="title-text">我的帖子</span>
    </div>
    <div>暂无，待开发中</div>
  </div>
</template>
<script>
export default {};
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
</style>