<template>
  <el-container>
    <page-header></page-header>
    <el-container>
      <el-aside class="aside">
        <el-row class="tac">
          <el-col :span="12">
            <h5 class="h5" @click="regetvideolist()">教学视频资源</h5>
            <el-menu
              default-active="2"
              :unique-opened="true"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              @select="handleselect"
              style="min-height:70vh;float:left;width: 100%;"
            >
              <NavMenu :navMenus="menuData"></NavMenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>

      <div class="main">
		  <div class="videomain">
        <div v-if="videolist.length ===0" class="error">该选项下暂无视频</div>
        <div
          class="videolist"
          v-for="video in videolist"
          :key="video.Id"
         
        >
          <!-- <div v-if="video.errorCode == '20303'" class="blue">蓝光</div> -->
          <img :src="'http://'+video.site"  @click="getDescribe(video.id)" />

          <p  @click="getDescribe(video.id)" >{{video.name}}</p>
          <a  @click="getDescribe(video.id)" >{{video.teacherId}}</a>
          <b  @click="getDescribe(video.id)" >{{video.creationTime.split(" ")[0]}}</b>
          <br />
          <div v-if="video.errorCode != '20303'" class="c">
            <img src="./img/ci.png" />
          </div>
          <div class="d">
            <img src="./img/guang.png" />
          </div>
        </div>
		</div>
        <el-pagination
        :hide-on-single-page='true'
          class="page"
         layout="total, prev, pager, next"
          :page-size="12"
          :current-page="currentPage"
          @current-change="handleCurrentChange"
          :total="parseInt(this.count)"
        ></el-pagination>
      </div>
    </el-container>
  </el-container>
</template>
<script>
import axios from "axios";
import pageHeader from "./common/page-header";
import NavMenu from "./common/NavMenu";
export default {
  components: {
    pageHeader,
    NavMenu: NavMenu
  },
  data: function() {
    return {
      vSite: "",
      count: "",
      currentPage: 1, // 默认显示第几页
      tableData: [],
      activeIndex: "aa",
      videolist: [],
      subjects: "",
      grade: "",
      unit: "",
      pageNum: "1",
      menuData: []
    };
  },

  methods: {
    getDescribe(id) {
      let routeUrl = this.$router.resolve({
        path: `/describe/${id}`
      });
      window.open(routeUrl.href, "_blank");
    },
    getItem() {
      axios({
        headers: {
          "User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .loginId,
          Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .sessionId
        },
        method: "post",
        url: "/hlkt/resource/findMenusTree.action",
        data: {
          sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid
        }
      }).then(res => {
        if (res.data.resultCode == "200") {
          this.menuData = res.data.resultData;
        } else {
          this.$message({
            type: "error",
            message: res.data.resultMsg
          });
        }
      });
    },
    serchlist(vap) {
      //改变页数
      this.currentPage = vap;
      this.getvideolist();
    },
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
      // 切换页码时，要获取每页显示的条数
      this.getvideolist(this.PageSize, val * this.pageSize);
    },
    handleOpen(key, keyPath) {
      console.log(this.menuData);
      console.log(key, keyPath);
      this.subjects = keyPath[0];
      this.grade = keyPath[1];
      this.getvideolist();
    },
    handleClose(key, keyPath) {
      this.subjects = "";
      this.grade = "";
      this.unit = "";
    },
    handleselect(key, keyPath) {
      console.log(keyPath[0]);
      this.subjects = keyPath[0];
      this.unit = keyPath[2];
      this.getvideolist();
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
        url: "/hlkt/admin/video/list.action",
        data: {
			video:{
				sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
				curriculumId: this.subjects,
				nj: this.grade,
				dy:this.unit,
			},
			
			pageSize: 12,
			pageNum: this.currentPage
      
        }
      }).then(res => {
        if (res.data.resultCode == "200") {
          this.count = res.data.resultData.total;
          this.videolist = res.data.resultData.list;
        } else {
          this.videolist = [];
        }
      });
    },
    regetvideolist() {
		history.go(0) 
      // axios({
      //   headers: {
      //     "User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
      //       .loginId,
      //     Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
      //       .sessionId
      //   },
      //   method: "post",
      //   url: "/hlkt/resource/findSearchVideo.action",
      //   data: {
      //     sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
      //     pageSize: 12,
      //     pageNum: 1,
      //     subjects: "",
      //     unit: "",
      //     grade: ""
      //   }
      // }).then(res => {
      //   if (res.data.resultCode == "200") {
      //     this.count = res.data.resultLineNum;
      //     this.videolist = res.data.resultData;
      //     console.log(this.videolist);
      //   } else {
      //     this.videolist = [];
      //   }
      // });
    }
  },
  mounted() {
    console.log(this.menuData);
    this.getvideolist();
    this.getItem();
  }
};
</script>
<style scoped lang="scss">
@import "src/plugins/px2vw";
.videomain{
	width: px2vw(1050px);
	height: px2vw(810px);
}
.blue {
  display: inline;
  float: right;
  position: relative;
  top: px2vw(130px);
  background-color: #39aeee;
  font-size: px2vw(14px);
}
.error {
  position: relative;
  text-align: center;
  top: 182px;
}
.main {
  background-color: #ffffff;
  width: px2vw(1050px);
  height: px2vw(850px);
  position: relative;

  top: px2vw(125px);
  margin-bottom: px2vw(90px);
}
.page {
 float: right;
}
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
  height: px2vw(243px);
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
  .c {
    img {
      width: px2vw(20px);
      height: px2vw(20px);
    }
    font-size: px2vw(14px);
    color: #ff9154;

    margin: px2vw(9px);
    display: inline-block;
    // margin-left: px2vw(9px);
    padding: px2vw(4px);
  }
  .d {
    img {
      width: px2vw(20px);
      height: px2vw(20px);
    }
    font-size: px2vw(14px);
    color: #4ca4ef;

    margin: px2vw(9px);
    display: inline-block;

    padding: px2vw(4px);
  }
}
.h5 {
  cursor: pointer;
  background: linear-gradient(
    -30deg,
    rgba(79, 172, 254, 1) 0%,
    rgba(0, 242, 254, 1) 100%
  );
  border-radius: 10px;
  margin: 0;
  height: px2vw(78px);
  line-height: px2vw(78px);
  text-align: center;
  color: white;
}
.aside {
  width: px2vw(614px) !important;
}
.tac {
  width: px2vw(321px);
  position: absolute;
  left: px2vw(273px);
  bottom: 0;
  top: px2vw(134px);
  z-index: 1;
  // overflow-y: scroll;
  // overflow-x: hidden;
  ul {
    overflow-y: auto;
    height: px2vw(300px);
  }
}
.el-col-12 {
  width: 100% !important;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>>