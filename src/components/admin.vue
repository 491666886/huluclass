<template>
  <div class="index">
    <page-header></page-header>
    <div class="admin">
      <div class="icon">
        <img src="./img/touxiang.png" />
        您好，{{username}}老师
        <p>工号：{{loginId}}</p>
        <div class="collo">
          <el-button class="my" icon="el-icon-star-off">我的收藏</el-button>
        </div>
      </div>
    </div>
    <div class="main">视频列表</div>
    <page-footer></page-footer>
  </div>
</template>
<script>
import axios from "axios";
import pageHeader from "./common/page-header";
import pageFooter from "./common/page-footer";
export default {
  components: {
    pageHeader,
    pageFooter
  },
  data: function() {
    return {
      tableData: [],
      list: [1, 2, 3, 4, 5, 6],
      username: JSON.parse(sessionStorage.getItem("SESSION_USER")).name,
      loginId: JSON.parse(sessionStorage.getItem("SESSION_USER")).loginId
    };
  },

  methods: {
    handleOpen() {
      axios({
        headers: {
          "Content-Type": "application/json"
        },
        method: "post",
        url:
          "https://hulu.ehualu.com:28080/gourdbaby/gourdChildUser/findVideoByChildCard.action?childCard=2"
      }).then(res => {
        if (res.data.status == "error") {
          this.$message({
            type: "error",
            message: res.data.resultMsg
          });
        }
        if (res.status == "200") {
          this.tableData = res.data.t;
        }
      });
    },
    handleClose() {}
  }
};
</script>
<style scoped lang="scss">
@import "src/plugins/px2vw";
.main {
  background-color: #ffffff;
  width: px2vw(980px);
  height: px2vw(850px);
  position: relative;
  left: px2vw(609px);
  top: px2vw(125px);
  margin-bottom: px2vw(90px);
}
.index {
  height: 100vh;
}
.bottom {
  width: px2vw(1920px);
  height: px2vw(166px);
  bottom: 0;
  position: fixed;
}
.my {
  height: px2vw(61px) !important;
  width: px2vw(260px) !important;
  background-image: url(./img/back1.png) !important;
  background-size: 100% 100% !important;
  color: #ffffff;
  text-align: left;
}
.quit {
  height: px2vw(61px) !important;
  width: px2vw(260px) !important;
  background-color: #ffffff;
  color: #209cff;
  text-align: left;
  margin-left: 0 !important;
}
.collo {
  height: px2vw(384px);
  background-color: #ffffff;
}
.admin {
  width: px2vw(260px);
  position: absolute;
  left: px2vw(333px);
  top: px2vw(125px);
  bottom: 0;
  text-align: center;
}
.icon {
  height: px2vw(384px);
  background-image: url(./img/admin.png);
  font-size: px2vw(20px);
  font-weight: 800;
  color: rgba(255, 255, 255, 1);
}
.icon img {
  width: px2vw(108px);
  height: px2vw(108px);
  padding: px2vw(70px) px2vw(70px) px2vw(35px) px2vw(70px);
}
.icon p {
  font-size: px2vw(15px);
}
</style>