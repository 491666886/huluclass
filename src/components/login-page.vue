<template>
  <el-container>
    <page-header></page-header>
    <el-container>
      <el-aside class="aside">
        <el-row class="tac">
          <el-col :span="12">
            <h5 class="h5">教学视频资源</h5>
            <el-menu
              default-active="2"
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
        <div
          class="videolist"
         
          v-for="video in videolist"
          :key="video.Id"
          @click="getDescribe(video.id)"
        >
          <img src="./img/admin.png" />
          <p>{{video.vName}}</p>
          <a>{{video.teacher}} I</a>
          <b>{{video.endTime}}</b>
          
        </div>
        <el-pagination
          class="page"
          layout="prev, pager, next"
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
      count: "",
      currentPage: 1, // 默认显示第几页
      tableData: [],
      activeIndex: "aa",
      videolist: [],
      subjects: "",
      grade: "",
      pageNum: "1",
      menuData: []
    };
  },

  methods: {
    getDescribe(id) {
      this.$router.push({
        path: `/describe/${id}`
      });
    },
    getItem() {
      axios({
        headers: {},
        method: "get",
        url: "/hlkt/resource/findMenusTree.action",
        data: {}
      }).then(res => {
        if (res.data.resultCode == "200") {
          this.menuData = res.data.resultData;
          console.log(this.menuData);
        } else {
          this.$message({
            type: "error",
            message: res.data.resultMsg
          });
        }
      });
    },
     serchlist(vap) {//改变页数
                this.currentPage = vap;
                this.getvideolist()
            },
     handleCurrentChange(val) {
                // 改变默认的页数
                this.currentPage = val;
                // 切换页码时，要获取每页显示的条数
                this.getvideolist(this.PageSize, (val) * (this.pageSize))
            },
    handleOpen(key, keyPath) {
      console.log(keyPath[0]);
      this.subjects = keyPath[0];
      this.getvideolist();
    },
    handleClose(key, keyPath) {},
    handleselect(key, keyPath) {
      console.log(keyPath[0]);
      this.grade = keyPath[1];
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
        url: "/hlkt/resource/findSearchVideo.action",
        data: {
          pageSize:12,
          pageNum: this.currentPage,
          subjects: this.subjects,

          grade: this.grade
        }
      }).then(res => {
        if (res.data.resultCode == "200") {
          this.count = res.data.resultLineNum;
          this.videolist = res.data.resultData;
          
        } else {
           this.videolist = [];
           console.log(this.videolist);
          this.$message({
            type: "error",
            message: res.data.resultMsg
          });
        }
      });
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
.main {
  background-color: #ffffff;
  width: px2vw(1050px);
  height: px2vw(850px);
  position: relative;
 
  top: px2vw(125px);
  margin-bottom: px2vw(90px);
}
.page {
  
  position: absolute;
  top: px2vw(800px);
  left: 85%;
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
  height: px2vw(233px);
  box-shadow: 0px 2px 10px 0px rgba(78, 78, 78, 0.21);
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  p {
    margin: 0;
    padding: px2vw(19px);
    font-size: px2vw(18px);
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
     overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

  }
  a {
    white-space:nowrap;
    font-size: px2vw(13px);
    padding-left: px2vw(19px);
  }
  b {
    white-space:nowrap;
    font-size: px2vw(10px);
    font-weight: 400;
  }
}
.h5 {
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
  overflow-x: hidden;
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