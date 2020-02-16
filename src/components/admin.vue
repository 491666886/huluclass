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
    <div class="main">
      <div
        class="videolist"
        v-for="video in videolist"
        :key="video.cId"
        @click="getDescribe(video.vId)"
      >
        <img :src="'http://'+video.vSite" />
      
         <p>{{video.vName}}</p>
          <a>{{video.teacher}}</a>
          <b>{{video.cTime.split(" ")[0]}}</b>
          <br />
          <c>磁平台</c>
          <d>光平台</d>
      </div>
    </div>
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
      videolist: [],
      tableData: [],

      username: JSON.parse(sessionStorage.getItem("SESSION_USER")).name,
      loginId: JSON.parse(sessionStorage.getItem("SESSION_USER")).loginId
    };
  },

  methods: {
    getDescribe(id) {
     
      this.$router.push({
        path: `/describe/${id}`
      });
    },
    getvideolist() {
      axios({
        headers: {
          "User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .loginId,
          Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .sessionId
        },
        method: "post",
        url: "/hlkt/user/selectCollect.action",
        data: {
          pageSize: 12,
          pageNum: 1,
          uId: JSON.parse(sessionStorage.getItem("SESSION_USER")).userId
        }
      }).then(res => {
        if (res.data.resultCode == "200") {
          this.count = res.data.resultLineNum;
          this.videolist = res.data.resultData;
          console.log(this.videolist);
        } else {
          this.$message({
            type: "error",
            message: res.data.resultMsg
          });
        }
      });
    }
  },
  mounted() {
    this.getvideolist();
  }
};
</script>
<style scoped lang="scss">
@import "src/plugins/px2vw";
.videolist img {
  width: px2vw(232px);
  height: px2vw(132px);
  overflow: hidden;
}
.videolist {
  float: left;
  margin-left: px2vw(21px);
  margin-top: px2vw(21px);
  width: px2vw(233px);
  height: px2vw(233px);
  box-shadow: 0px 2px 10px 0px rgba(78, 78, 78, 0.21);
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  .corner {
    width: 45px;
    height: 30px;
    position: absolute;
    left: 243px;
    bottom: 102px;
  }
  p {
    margin: 0;
    padding: px2vw(9px);
    font-size: px2vw(20px);
    line-height: px2vw(19px);
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  a {
    white-space: nowrap;
    font-size: px2vw(16px);
    line-height: px2vw(16px);
    padding: 0 px2vw(9px);
    border-right: #666666 1px solid;
  }
  b {
    white-space: nowrap;
    font-size: px2vw(14px);
    font-weight: 400;
    padding-left: px2vw(13px);
  }
  c {
    font-size: px2vw(14px);
    color: #ff9154;
    border: 1px solid rgba(255, 145, 84, 1);
    border-radius: 4px;
    margin: px2vw(9px) ;
    display: inline-block;
    // margin-left: px2vw(9px);
    padding: px2vw(4px);
  }
  d{
     font-size: px2vw(14px);
    color: #4CA4EF;
    border: 1px solid #4CA4EF;
    border-radius: 4px;
    margin: px2vw(9px) ;
    display: inline-block;
    
    padding: px2vw(4px);
  }
}
.main {
  background-color: #ffffff;
  width: px2vw(1050px);
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