<template>
  <div class="video">
    <page-header></page-header>
    <div class="det">
      <p>当前位置：{{video[0].subjects}}>{{video[0].grade}}>{{video[0].unit}}</p>
      <b>{{video[0].vName}}</b>
      <dd>
        主讲教师：{{video[0].teacher}}
        <c>录制时间：{{video[0].cTime}}</c>
      </dd>

      <div class="vid">
        <div class="alert" id="alert" v-if="this.$route.params.id==10">此视频存于蓝光中，预计等待观看时间较长，建议收藏</div>
        <video ref="videoPlay" :src="videoURL" controls="controls" @play="myFunction()" id="video"></video>

        <div class="tec">
          <l>
            <img class="yuan" src="./img/yuan1.png" />
            知识点快速索引
            <img class="yuan1" src="./img/yuan.png" />
          </l>
          <div class="gun">
            <div v-if="this.analysis.length ==0">该视频暂无知识点索引</div>
            <div
              class="index"
              v-for="point in analysis"
              :key="point.Id"
              @click="gopoint(point.time)"
            >
              <div class="left">{{point.analysisResult}}</div>
              <div class="right" v-text=" formatSeconds(point.time)"></div>
            </div>
          </div>
        </div>
        <div class="banner">
          <LL @click="nocollect()" v-if="this.collectViode==1">
            <i class="el-icon-star-on" id="i"></i>取消收藏
          </LL>
          <LL @click="collect()" v-if="this.collectViode==0">
            <i class="el-icon-star-off" id="i"></i>收藏
          </LL>
        </div>
        <!-- <el-button
          class="button"
          type="primary"
          plain
          @click="nocollect()"
          v-if="this.collectViode==1"
        >取消收藏</el-button>
        <el-button
          class="button"
          type="primary"
          plain
          @click="collect()"
          v-if="this.collectViode==0"
        >收藏该课程</el-button>-->
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
      videoURL: "",
      analysis: [],
      collectViode: "0",
      //  src: require('http://10.150.27.126:8080/video/shuxue.mp4'),
      video: {
        subjects: "",
        grade: "",
        unit: ""
      }
    };
  },
  computed: {
    average: function() {
      return Math.round(this.sum / 3);
    }
  },
  methods: {
    gopoint(time) {
      var $video = document.getElementById("video");

      $video.currentTime = time;
    },
    formatSeconds(value) {
      let result = parseInt(value);
      let h =
        Math.floor(result / 3600) < 10
          ? "0" + Math.floor(result / 3600)
          : Math.floor(result / 3600);
      let m =
        Math.floor((result / 60) % 60) < 10
          ? "0" + Math.floor((result / 60) % 60)
          : Math.floor((result / 60) % 60);
      let s =
        Math.floor(result % 60) < 10
          ? "0" + Math.floor(result % 60)
          : Math.floor(result % 60);
      result = `${h}:${m}:${s}`;
      console.log(result);
      return result;
    },

    myFunction() {
      document.getElementById("alert").style.display = "none";
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
          id: this.$route.params.id,
          uid: JSON.parse(sessionStorage.getItem("SESSION_USER")).userId
        }
      }).then(res => {
        if (res.data.resultCode == "200") {
          this.video = res.data.resultData;
          this.videoURL = "http://" + this.video[0].vUrl;
          this.collectViode = this.video[0].collectViode;
          this.analysis = this.video[0].analysis;
          this.formatSeconds(this.analysis[0].time);
          console.log(this.analysis);
        } else {
          this.$message({
            type: "error",
            message: "错误" + res.data.resultMsg
          });
        }
      });
    },

    collect() {
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
          uId: JSON.parse(sessionStorage.getItem("SESSION_USER")).userId,
          vId: this.$route.params.id
        }
      }).then(res => {
        if (res.data.resultCode == "200") {
          this.collectViode = 1;
          console.log(this.collectViode);
        } else {
          this.$message({
            type: "error",
            message: "错误" + res.data.resultMsg
          });
        }
      });
    },
    nocollect() {
      axios({
        headers: {
          "User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .loginId,
          Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .sessionId
        },
        method: "post",
        url: "/hlkt/user/deleteCollect.action",
        data: {
          uId: JSON.parse(sessionStorage.getItem("SESSION_USER")).userId,
          vId: this.$route.params.id
        }
      }).then(res => {
        if (res.data.resultCode == "200") {
          this.collectViode = 0;
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
#i {
  width: 25px;
  font-size: px2vw(20px);
}
ll {
  float: right;
  font-size: px2vw(18px);
  margin-right: px2vw(33px);
  color: #ffcd07;
  line-height: px2vw(55px);
  cursor: pointer;
}
.banner {
  width: px2vw(962px);
  height: px2vw(55px);
  background-color: black;
  margin-bottom: 102px;
  float: left;
}
.alert {
  width: 380px;
  position: relative;
  top: px2vw(140px);
  left: px2vw(200px);
  font-size: px2vw(20px);
  color: white;
  z-index: 111;
}
.gun {
  overflow-x: hidden;

  overflow-y: auto;
  height: px2vw(547px);
}
.index {
  height: px2vw(50px);
  cursor: pointer;
  padding: 0 px2vw(20px);
  .left {
    float: left;
  }
  .right {
    float: right;
  }
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
  color: #b5b5b5;
  float: right;
  // margin-left: px2vw(22px);
  width: px2vw(358px);
  height: px2vw(659px);
  background-color: #35363b;
  text-align: center;
  l {
    color: #fba131;
    line-height: px2vw(113px);
    display: block;
    .yuan {
      float: left;
      left: px2vw(33px);
      top: px2vw(29px);
      position: relative;
    }
    .yuan1 {
      float: right;
      right: px2vw(38px);
      top: px2vw(70px);
      position: relative;
    }
  }
}
video {
  width: px2vw(962px);
  height: px2vw(604px);
  float: left;
}
.det {
  width: px2vw(1320px);
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
    c {
      margin-left: 50px;
    }
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