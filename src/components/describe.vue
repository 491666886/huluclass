<template>
  <div class="video">
    <page-header></page-header>
    <div class="det">
      <p>当前位置：{{video[0].subjects}}>{{video[0].grade}}>{{video[0].unit}}</p>
      <b> {{video[0].vName}}</b>
      <dd>教师：{{video[0].teacher}}</dd>
      <div class="vid">
         <div class="alert" id="alert" >若视频存于蓝光中，预计等待观看时间最长为60分钟，建议收藏该课程</div>
        <video ref="videoPlay" :src="videoURL" controls="controls" @play="myFunction()">
         
        </video>
        <div class="tec">知识点快速索引
          <div class="index" @click="index()">{{video[0].vName}}</div>
        </div>
          
        <el-button class="button" type="primary" plain @click="collect()">收藏该课程</el-button>
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
        videoURL: '',
      //  src: require('http://10.150.27.126:8080/video/shuxue.mp4'),
      video: {
         subjects: '',
         grade: '',
         unit: '',
      }
    };
  },
  methods: {
    myFunction(){
      document.getElementById('alert').style.display = 'none'
    },
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
           this.videoURL  = 'http://'+this.video[0].vUrl;
          console.log(this.video[0]);
        } else {
          this.$message({
            type: "error",
            message: "错误" + res.data.resultMsg
          });
        }
      });
    },
      collect(){
         axios({
        headers: {
          "User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .loginId,
          Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .sessionId
        },
        method: "post",
        url: "/hlkt/user/newCollect.action",
        data: {
           uId:JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .userId,
          vId: this.$route.params.id
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
  created() {

    console.log(this.$route.params.id);
    this.getvideo();
  }
};
</script>
<style scoped lang="scss">
@import "src/plugins/px2vw";
.alert{
  position: relative;
    top: px2vw(140px);
    left: px2vw(100px);
    font-size: px2vw(20px);
    color: white;
}
.vid {
  margin-top: px2vw(35px);
}
.button {
  width: px2vw(304px);
  height: px2vw(59px);
  margin-left: px2vw(22px);
  margin-top: px2vw(19px);
}
.tec {
  line-height: px2vw(50px);
  color: #209cff;
  float: left;
  margin-left: px2vw(22px);
  width: px2vw(304px);
  height: px2vw(457px);
  background-color: #f8f8f8;
  text-align: center;
}
video {
  width: px2vw(968px);
  height: px2vw(545px);
  float: left;
}
.det {
  width: px2vw(1296px);
  padding: px2vw(143px) px2vw(300px);
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
    display: inline;
  }
}
.video {
  background-color: white;
  min-height: 100vh;
}
</style>>