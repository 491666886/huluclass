<template>
  <div class="video">
    <page-header></page-header>
    <div class="det">
      <p>当前位置：</p>
      <b>当前位置：</b> <dd>teacheer：</dd>
      <div class="vid" >
      <video src="https://media.w3.org/2010/05/sintel/trailer.mp4" controls="controls"></video>
      <div class="tec">知识点快速索引</div>  <el-button class="button" type="primary" plain>收藏该课程</el-button>
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
      video: {}
    };
  },
  methods: {
    getvideo() {
      axios({
        headers: {
          "User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .loginId,
          Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .sessionId
        },
        method: "post",
        url: "/hlkt/video/details.action",
        data: {
          id: this.$route.params.id
        }
      }).then(res => {
        if (res.data.resultCode == "200") {
          this.video = res.data.resultData;
          console.log(this.video[0]);
        } else {
          this.$message({
            type: "error",
            message: "错误" + res.data.resultMsg
          });
        }
      });
    }
  },
  mounted() {
    console.log(this.$route.params.id);
    this.getvideo();
  }
};
</script>
<style scoped lang="scss">
@import "src/plugins/px2vw";
.vid{
  margin-top: px2vw(35px);
}
.button{
   width: px2vw(304px);
  height: px2vw(59px);
  margin-left: px2vw(22px);
  margin-top: px2vw(19px);
}
.tec{
  color: #209CFF;
  float: left;
  margin-left: px2vw(22px);
  width: px2vw(304px);
  height: px2vw(457px);
  background-color: #f8f8f8;
  text-align: center;
}
video{
  width: px2vw(968px);
  height: px2vw(545px);
  float: left;
}
.det {
  width: px2vw(1296px);
  padding: px2vw(143px) px2vw(312px);
  p {
    color: #999999;
    font-size: px2vw(14px);

    font-weight: 400;
  }
  b {
    color: #666666;
    font-size: px2vw(24px);
    font-weight: bold;
  }
  dd {
    color: #999999;
    font-size: px2vw(14px);
    margin-left: 30px;
    font-weight: 400;
    display:inline;
  }
}
.video {
  background-color: white;
  min-height: 100vh;
}
</style>>